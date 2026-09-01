import { mkdir, readdir, writeFile, stat } from 'fs/promises';
import { dirname, extname, join, relative } from 'path';
import { existsSync } from 'fs';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, 'public', 'images', 'home');
const MANIFEST = join(ROOT, 'src', 'home-thumbs.json');
const WIDTHS = [400, 800, 1280];
const QUALITY = 72;
const IMG_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png']);

const SELECTED = [
  '/images/optimized/videos/BIOINTERFACE/1.JPG_compressed.webp',
  '/videos/BIOINTERFACE/F2.jpg',
  '/collections/projection-mapping/index/01.webp',
  '/videos/ASANA_YOGA/IMG_20260131_103426.jpg',
  '/collections/immersive-installation/index/06.webp',
  '/images/optimized/videos/museo/1_compressed.webp',
  '/images/optimized/videos/OHM/3_compressed.webp',
  '/images/optimized/videos/edzna/1_compressed.webp',
  '/images/optimized/videos/wavey/wavey-1.webp',
  '/collections/generative-video/index/08.webp',
  '/videos/OHM/2.png',
  '/projects/particle-system/hero-poster.webp',
  '/projects/resonance-of-contact/render_installation_wide-800.webp',
  '/collections/immersive-installation/index/12.webp',
];

function resolvePublic(webPath) {
  const rel = webPath.replace(/^\//, '');
  const a = join(ROOT, 'public', rel);
  const b = join(ROOT, rel);
  if (existsSync(a)) return a;
  if (existsSync(b)) return b;
  return null;
}

function slugFrom(webPath) {
  return webPath
    .replace(/^\//, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

async function collectCollectionStills() {
  const colRoot = join(ROOT, 'public', 'collections');
  const out = [];
  if (!existsSync(colRoot)) return out;
  const cols = await readdir(colRoot, { withFileTypes: true });
  for (const col of cols) {
    if (!col.isDirectory()) continue;
    const idx = join(colRoot, col.name, 'index');
    if (!existsSync(idx)) continue;
    const files = await readdir(idx);
    for (const f of files) {
      if (!IMG_EXT.has(extname(f).toLowerCase())) continue;
      out.push(`/collections/${col.name}/index/${f}`);
    }
  }
  return out;
}

async function processOne(webPath, thumbs) {
  const abs = resolvePublic(webPath);
  if (!abs) {
    console.warn('missing', webPath);
    return;
  }
  const meta = await sharp(abs).metadata();
  const srcW = meta.width || 0;
  const slug = slugFrom(webPath);
  const variants = [];
  for (const w of WIDTHS) {
    if (srcW && w > srcW * 1.05 && variants.length) continue;
    const name = `${slug}-${w}.webp`;
    const dest = join(OUT_DIR, name);
    await mkdir(dirname(dest), { recursive: true });
    await sharp(abs)
      .rotate()
      .resize({ width: Math.min(w, srcW || w), withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(dest);
    const size = (await stat(dest)).size;
    variants.push({ w, web: `/images/home/${name}`, size });
  }
  if (!variants.length) return;
  const srcSet = variants.map((v) => `${v.web} ${v.w}w`).join(', ');
  const fallback = variants.find((v) => v.w === 800) || variants[variants.length - 1];
  thumbs[webPath] = { src: fallback.web, srcSet };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const thumbs = {};
  const all = [...new Set([...SELECTED, ...(await collectCollectionStills())])];
  console.log(`Building ${all.length} home thumbs…`);
  for (const p of all) {
    try {
      await processOne(p, thumbs);
    } catch (err) {
      console.warn('fail', p, err.message);
    }
  }
  await writeFile(MANIFEST, JSON.stringify({ generatedAt: new Date().toISOString(), thumbs }, null, 2));
  const total = Object.values(thumbs).length;
  console.log(`Wrote ${total} mappings → ${relative(ROOT, MANIFEST)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
