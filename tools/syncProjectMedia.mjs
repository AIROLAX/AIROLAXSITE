/**
 * Escanea public/projects/{slug}/ y genera src/project-media.json
 *
 * Estructura por proyecto:
 *   public/projects/biointerface/
 *     cover.webp          → poster del carrusel
 *     video.mp4           → opcional (si no, usa videoUrl de main.ts)
 *     index/              → fotos del Index (01.jpg, 02.webp…)
 *     gallery/            → extras para ficha de proyecto
 */
import { readdir, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname } from 'path';

const ROOT = process.cwd();
const PROJECTS_DIR = join(ROOT, 'public', 'projects');
const COLLECTIONS_DIR = join(ROOT, 'public', 'collections');
const OUT = join(ROOT, 'src', 'project-media.json');

/** Colección → etiqueta Index + filtros "By Technique" */
const COLLECTION_META = {
  'ai-content': { label: 'AI Content', disciplines: ['AI Content', 'Real-time', 'Generative'] },
  'generative-video': { label: 'Generative Video', disciplines: ['Generative'] },
  'projection-mapping': { label: 'Projection Mapping', disciplines: ['Projection Mapping'] },
  'immersive-installation': { label: 'Immersive', disciplines: ['Real-time', 'TouchDesigner'] },
  experiments: { label: 'Experiments', disciplines: ['Generative', 'Real-time'] },
};

/** Carpeta slug → id de proyecto (mismo mapa que getProjectSlug en main.ts) */
const SLUG_TO_ID = {
  biointerface: '1',
  'biointerface-2': '1b',
  'museo-descubre': '2',
  'ohm-interactive-laser-sculpture': '3',
  'edzna-video-mapping': '4',
  'wavey-runway': '5',
  thermosense: '6',
  'whispers-of-the-lake-digital-immersive-experience': '7',
  'ohm-1': '8',
  'ethereal-motion-digital-poetry': '9',
  'breathing-space': 'breathing-space',
  'ai-mirror-dia-de-muertos': 'ai-mirror-dia-de-muertos',
};

const IMG = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
const VID = new Set(['.mp4', '.webm', '.mov', '.m4v']);
const COVER_NAMES = new Set(['cover', 'poster', 'hero', '00-cover', '01-cover']);
const VIDEO_NAMES = new Set(['video', 'hero', 'main']);

function urlPath(...parts) {
  return '/' + parts.join('/').replace(/\\/g, '/');
}

async function listFiles(dir) {
  if (!existsSync(dir)) return [];
  const names = await readdir(dir, { withFileTypes: true });
  return names
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function pickCover(files, slug) {
  for (const name of files) {
    const base = name.replace(/\.[^.]+$/, '').toLowerCase();
    const ext = extname(name).toLowerCase();
    if (IMG.has(ext) && COVER_NAMES.has(base)) {
      return urlPath('projects', slug, name);
    }
  }
  for (const name of files) {
    if (IMG.has(extname(name).toLowerCase())) return urlPath('projects', slug, name);
  }
  return undefined;
}

function pickVideo(files, slug) {
  for (const name of files) {
    const base = name.replace(/\.[^.]+$/, '').toLowerCase();
    const ext = extname(name).toLowerCase();
    if (VID.has(ext) && VIDEO_NAMES.has(base)) {
      return urlPath('projects', slug, name);
    }
  }
  return undefined;
}

async function scanSubdir(slug, sub) {
  const dir = join(PROJECTS_DIR, slug, sub);
  const names = await listFiles(dir);
  return names
    .filter((n) => IMG.has(extname(n).toLowerCase()) || VID.has(extname(n).toLowerCase()))
    .map((n) => urlPath('projects', slug, sub, n));
}

async function scanCollectionIndex(slug) {
  const indexDir = join(COLLECTIONS_DIR, slug, 'index');
  const previewDir = join(COLLECTIONS_DIR, slug, 'previews');
  const names = await listFiles(indexDir);
  const items = [];

  for (const n of names) {
    if (!IMG.has(extname(n).toLowerCase())) continue;
    const posterPath = join(indexDir, n);
    if (!existsSync(posterPath)) continue;

    const stem = n.replace(/\.[^.]+$/, '');
    const previewFile = `${stem}.mp4`;
    const previewPath = join(previewDir, previewFile);
    const poster = urlPath('collections', slug, 'index', n);

    if (existsSync(previewPath)) {
      items.push({
        type: 'video',
        src: urlPath('collections', slug, 'previews', previewFile),
        poster,
      });
    } else {
      items.push({ type: 'image', src: poster });
    }
  }

  return items;
}

/** Quita entradas huérfanas tras borrar archivos a mano */
async function pruneCollection(slug) {
  const indexDir = join(COLLECTIONS_DIR, slug, 'index');
  const previewDir = join(COLLECTIONS_DIR, slug, 'previews');
  const mapPath = join(COLLECTIONS_DIR, slug, 'video-map.json');

  const webpStems = new Set(
    (await listFiles(indexDir))
      .filter((n) => IMG.has(extname(n).toLowerCase()))
      .map((n) => n.replace(/\.[^.]+$/, ''))
  );

  if (existsSync(previewDir)) {
    for (const name of await listFiles(previewDir)) {
      if (!name.endsWith('.mp4')) continue;
      const stem = name.replace(/\.mp4$/i, '');
      if (!webpStems.has(stem)) {
        const orphan = join(previewDir, name);
        const { unlink } = await import('fs/promises');
        await unlink(orphan);
        console.warn(`  ⚠ preview huérfano eliminado: ${slug}/previews/${name}`);
      }
    }
  }

  if (existsSync(mapPath)) {
    const { readFile, writeFile, unlink } = await import('fs/promises');
    let map = {};
    try {
      map = JSON.parse(await readFile(mapPath, 'utf8'));
    } catch {
      map = {};
    }
    let changed = false;
    for (const stem of Object.keys(map)) {
      if (!webpStems.has(stem)) {
        delete map[stem];
        changed = true;
        console.warn(`  ⚠ video-map: quitado ${stem} (webp borrado)`);
      }
    }
    if (changed) {
      if (Object.keys(map).length) {
        await writeFile(mapPath, JSON.stringify(map, null, 2) + '\n', 'utf8');
      } else {
        await unlink(mapPath).catch(() => {});
      }
    }
  }
}

async function scanProjects() {
  const slugs = existsSync(PROJECTS_DIR)
    ? (await readdir(PROJECTS_DIR, { withFileTypes: true }))
        .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
        .map((d) => d.name)
    : [];

  const projects = {};
  let totalIndex = 0;

  for (const slug of slugs.sort()) {
    const id = SLUG_TO_ID[slug];
    if (!id) {
      console.warn(`⚠ Carpeta sin id mapeado (añade a SLUG_TO_ID): ${slug}`);
      continue;
    }

    const rootDir = join(PROJECTS_DIR, slug);
    const rootFiles = await listFiles(rootDir);
    const index = await scanSubdir(slug, 'index');
    const gallery = await scanSubdir(slug, 'gallery');
    const poster = pickCover(rootFiles, slug);
    const video = pickVideo(rootFiles, slug);

    const entry = { slug };
    if (poster) entry.poster = poster;
    if (video) entry.video = video;
    if (index.length) entry.index = index;
    if (gallery.length) {
      entry.gallery = gallery.map((src) => ({
        type: VID.has(extname(src).toLowerCase()) ? 'video' : 'image',
        src,
      }));
    }

    if (Object.keys(entry).length > 1) {
      projects[id] = entry;
      totalIndex += index.length;
      console.log(`✓ ${slug} → index:${index.length} gallery:${gallery.length}${poster ? ' cover' : ''}`);
    }
  }

  return { projects, totalIndex };
}

async function scanCollections() {
  if (!existsSync(COLLECTIONS_DIR)) {
    await mkdir(COLLECTIONS_DIR, { recursive: true });
  }

  const collections = {};
  let total = 0;

  for (const slug of Object.keys(COLLECTION_META).sort()) {
    await pruneCollection(slug);
    const index = await scanCollectionIndex(slug);
    if (!index.length) continue;
    const meta = COLLECTION_META[slug];
    collections[slug] = {
      slug,
      label: meta.label,
      disciplines: meta.disciplines,
      index,
    };
    total += index.length;
    console.log(`✓ collection/${slug} → ${index.length} fotos`);
  }

  return { collections, total };
}

async function main() {
  if (!existsSync(PROJECTS_DIR)) {
    await mkdir(PROJECTS_DIR, { recursive: true });
  }

  const { projects, totalIndex } = await scanProjects();
  const { collections, total: totalCol } = await scanCollections();

  const out = {
    version: 1,
    generatedAt: new Date().toISOString(),
    projects,
    collections,
  };

  await writeFile(OUT, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(
    `\n→ ${OUT} (${Object.keys(projects).length} proyectos, ${totalIndex} fotos | ${Object.keys(collections).length} colecciones, ${totalCol} fotos)`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
