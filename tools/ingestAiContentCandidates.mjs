/**
 * Ingest new AI Content videos from a candidate folder into collections/ai-content/
 * Skips files already mapped in video-map.json and collapses prompt variants to one take.
 *
 * Usage: node tools/ingestAiContentCandidates.mjs [sourceDir]
 */
import { readdir, readFile, copyFile, mkdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname, basename } from 'path';

const slug = 'ai-content';
const ROOT = join(process.cwd(), 'public', 'collections', slug);
const INDEX_DIR = join(ROOT, 'index');
const MAP_PATH = join(ROOT, 'video-map.json');
const SOURCE_DIR = join(
  process.argv[2] || join(process.env.USERPROFILE || '', 'Desktop', 'AI_Content_Portfolio_CANDIDATOS')
);

const VID = /\.(mp4|mov|webm|m4v|mkv)$/i;
const MAX_MB = 85;

function normalizeKey(name) {
  return decodeURIComponent(name)
    .toLowerCase()
    .replace(/\.(mp4|mov|webm|m4v|mkv)$/i, '')
    .replace(/\(\d+\)/g, '')
    .replace(/_\d+$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function loadExistingKeys() {
  const keys = new Set();
  if (existsSync(MAP_PATH)) {
    try {
      const map = JSON.parse(await readFile(MAP_PATH, 'utf8'));
      for (const v of Object.values(map)) keys.add(normalizeKey(String(v)));
    } catch {
      /* ignore */
    }
  }
  if (existsSync(SOURCE_DIR)) {
    for (const name of await readdir(SOURCE_DIR)) {
      if (VID.test(name)) keys.add(normalizeKey(name));
    }
  }
  return keys;
}

async function walkVideos(dir) {
  const out = [];
  async function walk(d) {
    for (const ent of await readdir(d, { withFileTypes: true })) {
      const p = join(d, ent.name);
      if (ent.isDirectory()) await walk(p);
      else if (VID.test(ent.name)) {
        const st = await stat(p);
        out.push({ path: p, name: ent.name, size: st.size, mb: st.size / (1024 * 1024) });
      }
    }
  }
  if (!existsSync(dir)) throw new Error(`Source not found: ${dir}`);
  await walk(dir);
  return out;
}

function safeDestName(name) {
  const ext = extname(name);
  const base = basename(name, ext).replace(/[<>:"/\\|?*]/g, '-').trim();
  return `${base}${ext}`;
}

async function main() {
  const existing = await loadExistingKeys();
  const all = await walkVideos(SOURCE_DIR);
  const groups = new Map();

  for (const file of all) {
    if (file.mb > MAX_MB) {
      console.log(`  skip heavy (${file.mb.toFixed(0)}MB): ${file.name}`);
      continue;
    }
    const key = normalizeKey(file.name);
    if (existing.has(key)) {
      console.log(`  skip already in collection: ${file.name}`);
      continue;
    }
    const list = groups.get(key) ?? [];
    list.push(file);
    groups.set(key, list);
  }

  const picked = [];
  for (const [key, list] of groups) {
    list.sort((a, b) => b.size - a.size);
    picked.push(list[0]);
    if (list.length > 1) {
      console.log(`  ~ variant ×${list.length} → ${list[0].name}`);
    }
  }

  picked.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  if (!picked.length) {
    console.log('\n→ No new unique videos to ingest.\n');
    return;
  }

  await mkdir(INDEX_DIR, { recursive: true });
  console.log(`\n→ Copying ${picked.length} new videos to collections/${slug}/index/\n`);

  for (const file of picked) {
    const dest = join(INDEX_DIR, safeDestName(file.name));
    if (existsSync(dest)) {
      console.log(`  skip exists: ${basename(dest)}`);
      continue;
    }
    await copyFile(file.path, dest);
    console.log(`  + ${file.name} (${file.mb.toFixed(1)} MB)`);
  }

  console.log('\n→ Next: npm run collections:optimize -- ai-content');
  console.log('→ Then:  node tools/curateCollection.mjs ai-content');
  console.log('→ Then:  npm run projects:sync\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
