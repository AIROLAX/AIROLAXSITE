/**
 * Ingest + optimize Galeria_Organizada → public/gallery/
 * - Images → WebP max 1200px
 * - Videos → 2s clip, 720p max, no audio, H.264 web
 * - Writes public/gallery/manifest.json for Immersive Index
 */
import { readdir, mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, extname, basename, relative } from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);

const SOURCE =
  process.env.GALERIA_SOURCE ||
  'C:\\Users\\erevan\\Desktop\\Galeria_Organizada';
const OUT_DIR = join(process.cwd(), 'public', 'gallery');
const MANIFEST_PATH = join(OUT_DIR, 'manifest.json');
const VIDEO_CLIP_SEC = 2;
const SKIP_DIRS = new Set(['_Referencias', '_SinClasificar']);
const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif']);
const VID_EXT = new Set(['.mp4', '.mov', '.mkv', '.webm', '.m4v']);

const FOLDER_PROJECT = {
  chapala: '7',
  mapping: '4',
  musica: '3',
  reels: '5',
  instagram: '1',
};

const KEYWORD_PROJECT = [
  ['biointerface', '1'],
  ['bio interface', '1'],
  ['bio interfac', '1'],
  ['whispers', '7'],
  ['chapala', '7'],
  ['mirror', 'ai-mirror-dia-de-muertos'],
  ['muertos', 'ai-mirror-dia-de-muertos'],
  ['museo', '2'],
  ['descubre', '2'],
  ['ohm', '3'],
  ['edzna', '4'],
  ['mapping', '4'],
  ['wavey', '5'],
  ['yoga', 'breathing-space'],
  ['asana', 'breathing-space'],
  ['breathing', 'breathing-space'],
  ['thermo', '6'],
  ['ethereal', '9'],
  ['demo2', '9'],
];

const TREAT = [
  'none',
  'grayscale(1) contrast(1.06)',
  'saturate(1.35) contrast(1.08)',
  'brightness(0.92) contrast(1.18)',
];
const POS = ['center', 'top', 'bottom', '30% 70%', '70% 30%'];
const AR = [1, 0.8, 1.28, 1, 0.74, 1.34];

function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'asset';
}

function guessProject(relPath, fileName) {
  const parts = relPath.toLowerCase().split(/[/\\]/);
  const folder = parts.length > 1 ? parts[0] : '';
  if (FOLDER_PROJECT[folder]) return FOLDER_PROJECT[folder];
  const hay = `${relPath} ${fileName}`.toLowerCase();
  for (const [kw, id] of KEYWORD_PROJECT) {
    if (hay.includes(kw)) return id;
  }
  return '1';
}

async function walk(dir, base = dir, list = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      await walk(full, base, list);
    } else if (e.isFile()) {
      list.push({ full, rel: relative(base, full) });
    }
  }
  return list;
}

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

async function optimizeImage(inputPath, outputPath) {
  await mkdir(dirname(outputPath), { recursive: true });
  const meta = await sharp(inputPath).metadata();
  const ar = meta.width && meta.height ? meta.width / meta.height : 1;
  await sharp(inputPath)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputPath);
  return ar;
}

async function optimizeVideo(inputPath, outputPath) {
  await mkdir(dirname(outputPath), { recursive: true });
  const args = [
    '-hide_banner',
    '-loglevel',
    'error',
    '-ss',
    '0',
    '-t',
    String(VIDEO_CLIP_SEC),
    '-i',
    inputPath,
    '-an',
    '-vf',
    "scale='min(1280,iw)':-2",
    '-c:v',
    'libx264',
    '-crf',
    '28',
    '-preset',
    'fast',
    '-movflags',
    '+faststart',
    '-y',
    outputPath,
  ];
  await execFileAsync('ffmpeg', args, { maxBuffer: 10 * 1024 * 1024 });
}

async function main() {
  if (!existsSync(SOURCE)) {
    console.error('Source not found:', SOURCE);
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const files = await walk(SOURCE);
  const media = files.filter(({ full }) => {
    const ext = extname(full).toLowerCase();
    return IMG_EXT.has(ext) || VID_EXT.has(ext);
  });

  console.log(`Found ${media.length} media files in ${SOURCE}`);

  const tiles = [];
  let done = 0;
  let skipped = 0;

  for (const { full, rel } of media) {
    const ext = extname(full).toLowerCase();
    const base = basename(full, ext);
    const id = `${slugify(base)}-${hashStr(rel).slice(0, 6)}`;
    const isVideo = VID_EXT.has(ext);
    const outName = `${id}${isVideo ? '.mp4' : '.webp'}`;
    const outPath = join(OUT_DIR, outName);
    const publicSrc = `/gallery/${outName}`;

    const idx = tiles.length;
    const tile = {
      id,
      proj: guessProject(rel, base),
      src: publicSrc,
      type: isVideo ? 'video' : 'image',
      treat: TREAT[idx % TREAT.length],
      pos: POS[idx % POS.length],
      ar: AR[idx % AR.length] || 1,
      source: rel,
    };

    if (existsSync(outPath)) {
      skipped++;
      tiles.push(tile);
      done++;
      continue;
    }

    try {
      if (isVideo) {
        await optimizeVideo(full, outPath);
      } else {
        const ar = await optimizeImage(full, outPath);
        tile.ar = AR[idx % AR.length] || ar;
      }

      tiles.push(tile);
      done++;
      if (done % 25 === 0) console.log(`Processed ${done}/${media.length}…`);
    } catch (err) {
      console.warn(`Skip ${rel}:`, err.message || err);
    }
  }

  tiles.sort(
    (a, b) => (hashStr(a.id) % 9973) - (hashStr(b.id) % 9973)
  );

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: SOURCE,
    count: tiles.length,
    tiles,
  };

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\nDone. ${tiles.length} tiles (${skipped} skipped existing).`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
