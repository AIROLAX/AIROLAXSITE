/**
 * Dedupe + recompress + renumber public/collections/{slug}/index/
 * Uso: node tools/curateCollection.mjs ai-content
 */
import sharp from 'sharp';
import { readdir, mkdir, rename, unlink, stat, copyFile, rm, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname } from 'path';

const slug = process.argv[2] || 'ai-content';
const COLLECTION_ROOT = join(process.cwd(), 'public', 'collections', slug);
const INDEX_DIR = join(COLLECTION_ROOT, 'index');
const REMOVED_DIR = join(COLLECTION_ROOT, '_removed');
const RENUMBER_DIR = join(COLLECTION_ROOT, '__renumber');
const MIN_PX = 320;
const MAX_PX = 1200;
const WEBP_Q = 80;
const HAMMING_MAX = 6;

/** Near-duplicates the auto-hash can miss */
const MANUAL_DROP = new Set(['15.webp', '33.webp', '35.webp']);

async function dhash(path) {
  const { data } = await sharp(path)
    .rotate()
    .resize(9, 8, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let bits = '';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      bits += (data[y * 9 + x] ?? 0) < (data[y * 9 + x + 1] ?? 0) ? '1' : '0';
    }
  }
  return bits;
}

function hamming(a, b) {
  let n = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) n++;
  return n;
}

async function listWebps() {
  const names = await readdir(INDEX_DIR);
  return names.filter((n) => /^\d+\.webp$/i.test(n)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function archive(name) {
  await mkdir(REMOVED_DIR, { recursive: true });
  const src = join(INDEX_DIR, name);
  let dest = join(REMOVED_DIR, name);
  if (existsSync(dest)) dest = join(REMOVED_DIR, name.replace('.webp', `-${Date.now()}.webp`));
  try {
    await rename(src, dest);
  } catch {
    try {
      await copyFile(src, dest);
      await unlink(src);
    } catch {
      console.warn(`  ⚠ locked, skipped: ${name}`);
      return false;
    }
  }
  return true;
}

async function safeUnlink(path, label) {
  try {
    await unlink(path);
    return true;
  } catch {
    console.warn(`  ⚠ locked, skipped unlink: ${label}`);
    return false;
  }
}

async function main() {
  const staleTmp = join(INDEX_DIR, '__tmp');
  if (existsSync(staleTmp)) {
    const stale = await readdir(staleTmp).catch(() => []);
    for (const f of stale.filter((n) => /^\d+\.webp$/i.test(n))) {
      const dest = join(INDEX_DIR, f);
      if (!existsSync(dest)) await rename(join(staleTmp, f), dest);
    }
    await rm(staleTmp, { recursive: true, force: true });
    console.log('  ✓ recovered stale index/__tmp');
  }
  const files = await listWebps();
  const meta = [];

  for (const f of files) {
    const path = join(INDEX_DIR, f);
    const m = await sharp(path).metadata();
    const w = m.width || 0;
    const h = m.height || 0;
    const maxSide = Math.max(w, h);
    meta.push({
      f,
      path,
      w,
      h,
      maxSide,
      kb: Math.round((await stat(path)).size / 1024),
      hash: await dhash(path),
    });
  }

  const drop = new Set();

  for (const f of MANUAL_DROP) {
    if (meta.some((m) => m.f === f)) drop.add(f);
  }

  for (const m of meta) {
    if (m.maxSide < MIN_PX) drop.add(m.f);
  }

  for (let i = 0; i < meta.length; i++) {
    if (drop.has(meta[i].f)) continue;
    for (let j = i + 1; j < meta.length; j++) {
      if (drop.has(meta[j].f)) continue;
      if (hamming(meta[i].hash, meta[j].hash) <= HAMMING_MAX) {
        const keep = meta[i].kb >= meta[j].kb ? meta[i].f : meta[j].f;
        const rem = keep === meta[i].f ? meta[j].f : meta[i].f;
        drop.add(rem);
        console.log(`  ~ dupe: keep ${keep}, drop ${rem}`);
      }
    }
  }

  for (const f of drop) {
    console.log(`  ✗ remove ${f}`);
    const ok = await archive(f);
    if (!ok) drop.delete(f);
  }

  const kept = (await listWebps())
    .filter((f) => !drop.has(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (existsSync(RENUMBER_DIR)) await rm(RENUMBER_DIR, { recursive: true, force: true });
  await mkdir(RENUMBER_DIR, { recursive: true });

  const planned = [];
  let n = 1;
  for (const f of kept) {
    const src = join(INDEX_DIR, f);
    const out = join(RENUMBER_DIR, `${String(n).padStart(2, '0')}.webp`);
    await sharp(src)
      .rotate()
      .resize({ width: MAX_PX, height: MAX_PX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_Q })
      .toFile(out);
    planned.push({ src, oldName: f, newName: `${String(n).padStart(2, '0')}.webp` });
    n++;
  }

  for (const { src, oldName } of planned) {
    await safeUnlink(src, oldName);
  }

  const tmpFiles = await readdir(RENUMBER_DIR);
  for (const f of tmpFiles.sort()) {
    const dest = join(INDEX_DIR, f);
    if (existsSync(dest)) await safeUnlink(dest, f);
    await rename(join(RENUMBER_DIR, f), dest);
  }
  await rm(RENUMBER_DIR, { recursive: true, force: true }).catch(() => {});

  const stemMap = new Map(
    planned.map(({ oldName, newName }) => [
      oldName.replace(/\.webp$/i, ''),
      newName.replace(/\.webp$/i, ''),
    ]),
  );

  const mapPath = join(COLLECTION_ROOT, 'video-map.json');
  if (existsSync(mapPath) && stemMap.size) {
    const map = JSON.parse(await readFile(mapPath, 'utf8'));
    const next = {};
    for (const [key, value] of Object.entries(map)) {
      const nk = stemMap.get(key);
      if (nk) next[nk] = value;
    }
    await writeFile(mapPath, JSON.stringify(next, null, 2) + '\n', 'utf8');
  }

  const previewDir = join(COLLECTION_ROOT, 'previews');
  if (existsSync(previewDir) && stemMap.size) {
    for (const p of await readdir(previewDir)) {
      const stem = p.replace(/\.[^.]+$/, '');
      const ext = extname(p);
      const nk = stemMap.get(stem);
      if (nk && nk !== stem) {
        const dest = join(previewDir, `${nk}${ext}`);
        if (existsSync(dest)) await safeUnlink(dest, `${nk}${ext}`);
        await rename(join(previewDir, p), dest);
      }
    }
  }

  let totalKb = 0;
  const final = await listWebps();
  for (const f of final) {
    totalKb += (await stat(join(INDEX_DIR, f))).size / 1024;
  }

  console.log(`\n→ ${final.length} images (${Math.round(totalKb)} KB), removed ${drop.size}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
