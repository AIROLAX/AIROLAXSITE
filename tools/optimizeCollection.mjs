/**
 * Optimiza public/collections/{slug}/index/
 * - Imágenes → 01.webp, 02.webp … (max 1400px, WebP q82)
 * - Videos → frame poster como .webp en el Index
 * - Originales → _source/ (no se suben al sitio)
 *
 * Uso: node tools/optimizeCollection.mjs ai-content
 */
import { execFile } from 'child_process';
import { promisify } from 'util';
import { readdir, writeFile, mkdir, rename, unlink, stat, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname, basename } from 'path';
import sharp from 'sharp';
import { posterFromVideo, previewFromVideo, hasFfmpeg } from './collectionVideoUtils.mjs';

const execFileAsync = promisify(execFile);

const slug = process.argv[2] || 'ai-content';
const ROOT = join(process.cwd(), 'public', 'collections', slug);
const INDEX_DIR = join(ROOT, 'index');
const PREVIEW_DIR = join(ROOT, 'previews');
const SOURCE_DIR = join(ROOT, '_source');
const MAP_PATH = join(ROOT, 'video-map.json');

const MAX_PX = 1400;
const WEBP_Q = 82;
const IMG = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.tif', '.tiff']);
const HEIC = new Set(['.heic', '.heif']);
const VID = new Set(['.mp4', '.webm', '.mov', '.m4v', '.mkv']);
const SKIP = new Set(['.gitkeep']);
const OUTPUT_RE = /^\d{2,3}\.webp$/i;

async function hasFfmpegLocal() {
  return hasFfmpeg();
}

async function saveVideoMap(stem, sourceName) {
  let map = {};
  if (existsSync(MAP_PATH)) {
    try {
      map = JSON.parse(await readFile(MAP_PATH, 'utf8'));
    } catch {
      map = {};
    }
  }
  map[stem] = sourceName;
  await writeFile(MAP_PATH, JSON.stringify(map, null, 2) + '\n', 'utf8');
}

async function optimizeImage(inputPath, outputPath) {
  await sharp(inputPath)
    .rotate()
    .resize({ width: MAX_PX, height: MAX_PX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: WEBP_Q, effort: 4 })
    .toFile(outputPath);
}

/** iPhone HEIC — sharp/libheif often missing on Windows; ffmpeg decodes first. */
async function optimizeHeic(inputPath, outputPath) {
  const tmp = outputPath.replace(/\.webp$/i, '-heic-tmp.jpg');
  try {
    await execFileAsync('ffmpeg', [
      '-y',
      '-i',
      inputPath,
      '-frames:v',
      '1',
      '-update',
      '1',
      tmp,
    ]);
    await optimizeImage(tmp, outputPath);
  } finally {
    if (existsSync(tmp)) await unlink(tmp);
  }
}

async function listIncoming() {
  if (!existsSync(INDEX_DIR)) {
    await mkdir(INDEX_DIR, { recursive: true });
    return [];
  }
  const names = await readdir(INDEX_DIR);
  const files = [];
  for (const name of names) {
    const ext = extname(name).toLowerCase();
    if (SKIP.has(ext) || OUTPUT_RE.test(name)) continue;
    const full = join(INDEX_DIR, name);
    const st = await stat(full);
    if (!st.isFile()) continue;
    if (!IMG.has(ext) && !HEIC.has(ext) && !VID.has(ext)) continue;
    files.push({ name, full, ext, size: st.size });
  }
  return files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}

async function nextIndexStart() {
  if (!existsSync(INDEX_DIR)) return 1;
  const names = await readdir(INDEX_DIR);
  let max = 0;
  for (const name of names) {
    const m = name.match(/^(\d{2,3})\.webp$/i);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return max + 1;
}

async function archiveOriginal(src, name) {
  await mkdir(SOURCE_DIR, { recursive: true });
  const dest = join(SOURCE_DIR, name);
  let finalDest = dest;
  if (existsSync(finalDest)) {
    const stem = basename(name, extname(name));
    finalDest = join(SOURCE_DIR, `${stem}-${Date.now()}${extname(name)}`);
  }
  await rename(src, finalDest);
  return finalDest;
}

async function main() {
  const incoming = await listIncoming();
  if (!incoming.length) {
    console.log(`✓ ${slug}/index — nothing to optimize`);
    return;
  }

  const ffmpegOk = await hasFfmpegLocal();
  let n = await nextIndexStart();
  let images = 0;
  let videos = 0;
  let skipped = 0;

  console.log(`\n→ Optimizing ${incoming.length} files in collections/${slug}/index/\n`);

  for (const file of incoming) {
    const outName = `${String(n).padStart(2, '0')}.webp`;
    const outPath = join(INDEX_DIR, outName);

    try {
      if (IMG.has(file.ext)) {
        await optimizeImage(file.full, outPath);
        images += 1;
        console.log(`  ✓ ${file.name} → ${outName} (${(file.size / 1024 / 1024).toFixed(1)} MB)`);
      } else if (HEIC.has(file.ext)) {
        if (!ffmpegOk) {
          console.warn(`  ⚠ skip HEIC (no ffmpeg): ${file.name}`);
          skipped += 1;
          continue;
        }
        await optimizeHeic(file.full, outPath);
        images += 1;
        console.log(`  ✓ ${file.name} → ${outName} (HEIC)`);
      } else if (VID.has(file.ext)) {
        if (!ffmpegOk) {
          console.warn(`  ⚠ skip video (no ffmpeg): ${file.name}`);
          skipped += 1;
          continue;
        }
        const stem = outName.replace(/\.webp$/i, '');
        await posterFromVideo(file.full, outPath);
        await mkdir(PREVIEW_DIR, { recursive: true });
        await previewFromVideo(file.full, join(PREVIEW_DIR, `${stem}.mp4`));
        await saveVideoMap(stem, file.name);
        videos += 1;
        console.log(`  ✓ ${file.name} → ${outName} + previews/${stem}.mp4`);
      }

      await archiveOriginal(file.full, file.name);
      n += 1;
    } catch (err) {
      console.error(`  ✗ ${file.name}: ${err.message || err}`);
      skipped += 1;
    }
  }

  const optimized = await readdir(INDEX_DIR);
  const webps = optimized.filter((f) => f.endsWith('.webp'));
  let totalKb = 0;
  for (const f of webps) {
    totalKb += (await stat(join(INDEX_DIR, f))).size / 1024;
  }

  console.log(
    `\n→ Done: ${images} images, ${videos} video posters, ${skipped} skipped`
  );
  console.log(`→ ${webps.length} tiles in index/ (${Math.round(totalKb)} KB total)`);
  console.log(`→ originals in collections/${slug}/_source/\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
