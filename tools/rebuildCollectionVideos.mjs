/**
 * Regenera posters HD + previews MP4 para tiles de colección.
 * Uso: node tools/rebuildCollectionVideos.mjs ai-content
 */
import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, basename, extname } from 'path';
import { posterFromVideo, previewFromVideo, hasFfmpeg, videoDurationSec } from './collectionVideoUtils.mjs';
import sharp from 'sharp';
import { mkdir } from 'fs/promises';

const slug = process.argv[2] || 'ai-content';
const ROOT = join(process.cwd(), 'public', 'collections', slug);
const INDEX_DIR = join(ROOT, 'index');
const PREVIEW_DIR = join(ROOT, 'previews');
const SOURCE_DIR = join(ROOT, '_source');
const MAP_PATH = join(ROOT, 'video-map.json');

async function loadMap() {
  if (!existsSync(MAP_PATH)) return {};
  try {
    return JSON.parse(await readFile(MAP_PATH, 'utf8'));
  } catch {
    return {};
  }
}

async function dhashImage(path) {
  const { data } = await sharp(path)
    .rotate()
    .resize(9, 8, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let bits = '';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      bits += data[y * 9 + x] < data[y * 9 + x + 1] ? '1' : '0';
    }
  }
  return bits;
}

function hamming(a, b) {
  let n = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) n++;
  return n;
}

async function autoMap(sources, webps) {
  const tmpDir = join(ROOT, '__match');
  await mkdir(tmpDir, { recursive: true });
  const map = {};
  const used = new Set();

  const webpHashes = [];
  for (const w of webps) {
    const path = join(INDEX_DIR, w);
    const meta = await sharp(path).metadata();
    const maxSide = Math.max(meta.width || 0, meta.height || 0);
    if (maxSide < 600) continue;
    webpHashes.push({ stem: w.replace(/\.webp$/i, ''), hash: await dhashImage(path) });
  }

  for (const sourceName of sources) {
    const videoPath = join(SOURCE_DIR, sourceName);
    const dur = await videoDurationSec(videoPath);
    const seek = Math.min(Math.max(dur * 0.2, 0.5), Math.max(dur - 0.5, 0.5));
    const tmpFrame = join(tmpDir, `frame-${sourceName.replace(/[^\w.-]+/g, '_')}.png`);
    const { execFile } = await import('child_process');
    const { promisify } = await import('util');
    const execFileAsync = promisify(execFile);
    await execFileAsync('ffmpeg', [
      '-hide_banner',
      '-loglevel',
      'error',
      '-ss',
      String(seek),
      '-i',
      videoPath,
      '-frames:v',
      '1',
      '-y',
      tmpFrame,
    ]);
    const vHash = await dhashImage(tmpFrame);

    let best = { stem: '', score: 999 };
    for (const w of webpHashes) {
      if (used.has(w.stem)) continue;
      const score = hamming(vHash, w.hash);
      if (score < best.score) best = { stem: w.stem, score };
    }
    if (best.stem && best.score <= 20) {
      map[best.stem] = sourceName;
      used.add(best.stem);
      console.log(`  ~ map ${best.stem}.webp ← ${sourceName} (${best.score})`);
    }
  }
  return map;
}

async function main() {
  if (!(await hasFfmpeg())) {
    console.error('ffmpeg required');
    process.exit(1);
  }

  let map = await loadMap();
  const sources = existsSync(SOURCE_DIR)
    ? (await readdir(SOURCE_DIR)).filter((n) => /\.(mp4|mov|webm|m4v)$/i.test(n))
    : [];

  if (!sources.length) {
    console.log('No videos in _source/');
    return;
  }

  const indexWebps = existsSync(INDEX_DIR)
    ? (await readdir(INDEX_DIR)).filter((n) => /^\d+\.webp$/i.test(n)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    : [];

  if (!Object.keys(map).length) {
    console.log('Auto-matching videos to tiles…');
    map = await autoMap(sources, indexWebps);
  }

  await writeFile(MAP_PATH, JSON.stringify(map, null, 2) + '\n', 'utf8');

  console.log(`\n→ Rebuilding ${Object.keys(map).length} video tiles for ${slug}\n`);

  for (const [stem, sourceName] of Object.entries(map).sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))) {
    const videoPath = join(SOURCE_DIR, sourceName);
    if (!existsSync(videoPath)) {
      console.warn(`  ⚠ missing source: ${sourceName}`);
      continue;
    }

    const posterPath = join(INDEX_DIR, `${stem}.webp`);
    const previewPath = join(PREVIEW_DIR, `${stem}.mp4`);

    await posterFromVideo(videoPath, posterPath);
    await previewFromVideo(videoPath, previewPath);

    const posterKb = Math.round((await stat(posterPath)).size / 1024);
    const previewKb = Math.round((await stat(previewPath)).size / 1024);
    console.log(`  ✓ ${stem} ← ${basename(sourceName)} (poster ${posterKb}KB, preview ${previewKb}KB)`);
  }

  console.log('\n→ Run: npm run projects:sync\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
