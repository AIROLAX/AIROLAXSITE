import { mkdir, writeFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname, join, relative } from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const ANDATA = join(ROOT, '..', 'ANDATALAB WEB');
const OUT_DIR = join(ROOT, 'public', 'images', 'luminex');
const MANIFEST = join(ROOT, 'src', 'luminex-thumbs.json');
const WIDTHS = [800, 1280, 1920];
const QUALITY = 74;

const SOURCES = [
  {
    id: 'hero',
    file: join(ANDATA, 'Imagenes', 'concept-immersive.jpg'),
  },
  {
    id: 'ohm-1',
    file: join(ROOT, 'public', 'images', 'luminex', 'ohm-1-ring.jpg'),
  },
  {
    id: 'ohm-1c',
    file: join(ROOT, 'public', 'images', 'luminex', 'ohm-1-source.jpg'),
  },
  {
    id: 'ohm-2',
    file: join(ANDATA, 'Imagenes', 'OHM2.png'),
  },
  {
    id: 'thermosense',
    file: join(ANDATA, 'Imagenes', 'AI INSTA.jpg'),
  },
  {
    id: 'wavey',
    file: join(ROOT, 'public', 'images', 'optimized', 'videos', 'wavey', 'wavey-1.webp'),
  },
  {
    id: 'biointerface',
    file: join(ROOT, 'public', 'videos', 'BIOINTERFACE', 'F2.jpg'),
  },
  {
    id: 'resonance',
    file: join(ROOT, 'public', 'projects', 'ohm-1', '51835853-acba-4058-a8cf-4c385bbcea80 (1).jpeg'),
  },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const thumbs = {};

  for (const item of SOURCES) {
    if (!existsSync(item.file)) {
      console.warn('missing', item.id, item.file);
      continue;
    }
    const meta = await sharp(item.file).rotate().metadata();
    const srcW = meta.width || 0;
    const srcH = meta.height || 0;
    const variants = [];
    for (const w of WIDTHS) {
      if (srcW && w > srcW * 1.05 && variants.length) continue;
      const name = `${item.id}-${w}.webp`;
      const dest = join(OUT_DIR, name);
      await mkdir(dirname(dest), { recursive: true });
      await sharp(item.file)
        .rotate()
        .resize({ width: Math.min(w, srcW || w), withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(dest);
      const size = (await stat(dest)).size;
      variants.push({ w, web: `/images/luminex/${name}`, size });
      console.log(item.id, w, `${Math.round(size / 1024)}kb`);
    }
    const fallback = variants.find((v) => v.w === 1280) || variants[variants.length - 1];
    thumbs[item.id] = {
      src: fallback.web,
      srcSet: variants.map((v) => `${v.web} ${v.w}w`).join(', '),
      width: srcW,
      height: srcH,
    };
  }

  await writeFile(MANIFEST, JSON.stringify({ generatedAt: new Date().toISOString(), thumbs }, null, 2));
  console.log('Wrote', relative(ROOT, MANIFEST));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
