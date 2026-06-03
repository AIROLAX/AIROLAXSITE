/**
 * Limpia public/collections/{slug}/ — quita basura, dedupe, alinea previews.
 * Uso: node tools/cleanCollection.mjs ai-content
 */
import { readdir, rm, readFile, writeFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';

const slug = process.argv[2] || 'ai-content';
const ROOT = join(process.cwd(), 'public', 'collections', slug);
const INDEX_DIR = join(ROOT, 'index');
const PREVIEW_DIR = join(ROOT, 'previews');

async function rimraf(dir) {
  if (!existsSync(dir)) return;
  await rm(dir, { recursive: true, force: true });
  console.log(`  ✓ removed ${dir.replace(process.cwd(), '.')}`);
}

function runNode(script, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...args], {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: false,
    });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${script} exit ${code}`))));
  });
}

async function listNumWebps() {
  if (!existsSync(INDEX_DIR)) return [];
  const names = await readdir(INDEX_DIR);
  return names.filter((n) => /^\d+\.webp$/i.test(n)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function syncPreviews() {
  if (!existsSync(PREVIEW_DIR)) return;
  const mapPath = join(ROOT, 'video-map.json');
  const stems = new Set(await listNumWebps().then((f) => f.map((n) => n.replace(/\.webp$/i, ''))));
  const previews = await readdir(PREVIEW_DIR);

  for (const p of previews) {
    const stem = p.replace(/\.[^.]+$/, '');
    if (!stems.has(stem)) {
      await rm(join(PREVIEW_DIR, p), { force: true });
      console.log(`  ✓ orphan preview ${p}`);
    }
  }

  if (existsSync(mapPath)) {
    const map = JSON.parse(await readFile(mapPath, 'utf8'));
    const next = {};
    for (const key of Object.keys(map)) {
      if (stems.has(key)) next[key] = map[key];
    }
    await writeFile(mapPath, JSON.stringify(next, null, 2) + '\n', 'utf8');
  }
}

async function report() {
  const webps = await listNumWebps();
  let indexKb = 0;
  for (const f of webps) indexKb += (await stat(join(INDEX_DIR, f))).size / 1024;
  const previews = existsSync(PREVIEW_DIR) ? (await readdir(PREVIEW_DIR)).filter((n) => n.endsWith('.mp4')) : [];
  console.log(`\n→ ${slug}: ${webps.length} tiles (${Math.round(indexKb)} KB), ${previews.length} previews`);
}

async function main() {
  console.log(`\n→ Cleaning collections/${slug}/\n`);

  await rimraf(join(ROOT, '__match'));
  await rimraf(join(ROOT, '_removed'));

  console.log('\n→ Dedupe + renumber index…\n');
  await runNode(join('tools', 'curateCollection.mjs'), [slug]);

  const hasSource =
    existsSync(join(ROOT, '_source')) &&
    (await readdir(join(ROOT, '_source'))).some((n) => /\.(mp4|mov|webm|m4v)$/i.test(n));

  if (hasSource) {
    console.log('\n→ Rebuild video posters from _source…\n');
    await runNode(join('tools', 'rebuildCollectionVideos.mjs'), [slug]);
  }

  console.log('\n→ Drop orphan previews…\n');
  await syncPreviews();

  await rimraf(join(ROOT, '__match'));
  await rimraf(join(ROOT, '_source'));

  console.log('\n→ projects:sync…\n');
  await runNode(join('tools', 'syncProjectMedia.mjs'), []);

  await report();
  console.log('\n→ Done. New media → index/ then: npm run collections:optimize ' + slug + '\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
