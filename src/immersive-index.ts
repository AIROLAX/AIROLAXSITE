import './immersive-index.css';
import allExclusions from './index-all-exclusions.json';

type IndexProject = {
  id: string;
  title: string;
  tag: string;
  slug: string;
  poster?: string;
  galleryItems?: Array<{ type: 'video' | 'image'; src: string; alt?: string }>;
  indexImages?: IndexImageRef[];
  technologies: string[];
  credits: { duration: string };
};

/** Collection stills that belong to a project page (open #concept, not #projects). */
const COLLECTION_STILL_TO_PROJECT: Record<string, string> = {
  '/images/optimized/videos/wavey/wavey-1.webp': 'wavey-runway',
  '/collections/ai-content/index/06.webp': 'wavey-runway',
};

type IndexTile = {
  id: string;
  proj: string;
  projName: string;
  caption: string;
  slug: string;
  /** When set, tile opens work/{slug}.html#concept instead of scrolling to #projects. */
  linkSlug?: string;
  disc: string[];
  tag: string;
  year: string;
  img: string | null;
  poster?: string | null;
  videoSrc?: string | null;
  mediaType?: 'image' | 'video';
  treat: string;
  pos: string;
  ar: number;
};

/** Short labels for tiles and filters — minimal, not decorative. */
const SHORT: Record<string, string> = {
  '1': 'Biointerface',
  '7': 'Whispers',
  'breathing-space': 'Breathing',
  'ai-mirror-dia-de-muertos': 'Mirror',
  '1b': 'Bio II',
  '2': 'Descubre',
  '3': 'OHM',
  '4': 'Edzná',
  '5': 'Wavey',
  '6': 'Thermo',
  '8': 'OHM I',
  '9': 'Ethereal',
};

function shortName(id: string, title: string): string {
  return SHORT[id] ?? title.split(/[.·]/)[0]!.trim().slice(0, 18);
}

function normalizeSrc(src: string): string {
  try {
    return decodeURIComponent(src.trim()).toLowerCase().split('?')[0]!;
  } catch {
    return src.trim().toLowerCase();
  }
}

const DISC_BY_PROJ: Record<string, string[]> = {
  '1': ['AI Content', 'Real-time AI'],
  '7': ['Projection Mapping', 'Real-time AI', '3D Generative'],
  'breathing-space': ['Real-time AI', 'Installation Art', '3D Generative'],
  'ai-mirror-dia-de-muertos': ['AI Content', 'Real-time AI', '3D Generative'],
  '1b': ['AI Content', 'Real-time AI'],
  '2': ['Real-time AI', 'Installation Art'],
  '3': ['Sound Sculpture'],
  '4': ['Projection Mapping', '3D Generative'],
  '5': ['AI Content', '3D Generative', 'Real-time AI'],
  '6': ['Real-time AI', '3D Generative'],
  '8': ['Sound Sculpture', '3D Generative'],
  '9': ['3D Generative', 'Real-time AI', 'AI Content'],
};

/** By Technique chips fed only from public/collections/{slug}/index/ */
const TECHNIQUE_FROM_COLLECTION: Record<string, string> = {
  'Real-time AI': 'immersive-installation',
  'AI Content': 'ai-content',
  'Projection Mapping': 'projection-mapping',
  'Sound Sculpture': 'sound',
  '3D Generative': 'generative-video',
};

/** Chip order: All → Real-time AI → Sound Sculpture → … */
const TECHNIQUE_CHIP_ORDER = [
  'Real-time AI',
  'Sound Sculpture',
  'AI Content',
  'Projection Mapping',
  'Installation Art',
  '3D Generative',
];

/** Max tiles per project when using work/{slug}.html gallery images */
const MAX_TILES_PER_PROJ = 12;
const MAX_TILES_MOBILE = 6;
/** Collection tiles in the Index grid (Todos + AI Content) — full set stays on disk */
const MAX_COLLECTION_TILES = 20;
const MAX_COLLECTION_TILES_MOBILE = 12;

/** First row on “All”: flagship projects (edit order anytime). */
const FEATURED_PROJECT_IDS = [
  '1',
  '7',
  '4',
  '2',
  '3',
  'breathing-space',
  'ai-mirror-dia-de-muertos',
  '5',
  '1b',
  '6',
  '8',
  '9',
];

const COLLECTION_SLUG_ORDER = [
  'immersive-installation',
  'projection-mapping',
  'generative-video',
  'ai-content',
  'sound',
  'experiments',
];

/** Tiles per flagship on “All” (spread with sampleEvenly, not consecutive frames). */
const ALL_VIEW_MAX_PER_FEATURED = 2;
/** One still per other project so “All” shows many distinct works. */
const ALL_VIEW_MAX_PER_PROJECT = 1;
/** Collection tiles only show under technique chips, not on “All” (avoids one-off frames). */
const ALL_VIEW_SHOW_COLLECTIONS = false;
const ALL_VIEW_MAX_PER_COLLECTION = 4;

const ALL_VIEW_EXCLUDE_EXACT = new Set(
  (allExclusions.paths as string[]).map((p) => normalizeSrc(p))
);
const ALL_VIEW_EXCLUDE_PARTIAL = (allExclusions.substrings as string[]) ?? [];
const VIDEO_EXT = /\.(mp4|mov|webm|mkv|m4v)(\?|$)/i;
const TREAT = ['none'];
const POS = ['center', 'top', 'bottom', '30% 70%', '70% 30%'];
const AR_MIN = 0.52;
const AR_MAX = 2.15;
const AR_DEFAULT_VIDEO = 16 / 9;
const AR_DEFAULT_IMAGE = 4 / 3;

const pad3 = (n: number): string => String(n).padStart(3, '0');

function defaultTileAspect(mediaType?: 'image' | 'video'): number {
  return mediaType === 'video' ? AR_DEFAULT_VIDEO : AR_DEFAULT_IMAGE;
}

function clampTileAspect(w: number, h: number): number {
  if (!w || !h) return AR_DEFAULT_IMAGE;
  return Math.min(AR_MAX, Math.max(AR_MIN, w / h));
}

function setTileAspect(frame: HTMLElement, w: number, h: number): void {
  const ar = clampTileAspect(w, h);
  frame.style.setProperty('--tile-ar', String(Number(ar.toFixed(4))));
  frame.classList.add('gal-frame--natural');
}

/** Read poster / image dimensions so each tile keeps its real proportions. */
function initTileNaturalAspects(grid: HTMLElement, onDone: () => void): void {
  const frames = Array.from(grid.querySelectorAll<HTMLElement>('.gal-frame'));
  if (!frames.length) {
    onDone();
    return;
  }

  let pending = 0;
  const finish = (): void => {
    pending -= 1;
    if (pending <= 0) onDone();
  };

  frames.forEach((frame) => {
    const video = frame.querySelector<HTMLVideoElement>('video.gal-media--video');
    const img = frame.querySelector<HTMLImageElement>('img.gal-media');

    if (video) {
      frame.classList.add('gal-frame--video');
      const poster = video.getAttribute('poster') || '';
      if (poster) {
        pending += 1;
        const probe = new Image();
        probe.onload = () => {
          setTileAspect(frame, probe.naturalWidth, probe.naturalHeight);
          finish();
        };
        probe.onerror = finish;
        probe.src = poster;
      } else {
        setTileAspect(frame, 16, 9);
      }
      return;
    }

    if (img?.src) {
      pending += 1;
      const apply = (): void => {
        if (img.naturalWidth > 0) setTileAspect(frame, img.naturalWidth, img.naturalHeight);
        finish();
      };
      if (img.complete) apply();
      else {
        img.addEventListener('load', apply, { once: true });
        img.addEventListener('error', finish, { once: true });
      }
    }
  });

  if (pending === 0) onDone();
}

type CollectionIndexItem =
  | string
  | { type: 'image' | 'video'; src: string; poster?: string };

type CollectionMedia = {
  slug: string;
  label: string;
  disciplines: string[];
  index: CollectionIndexItem[];
};

function normalizeCollectionItem(item: CollectionIndexItem): {
  src: string;
  poster?: string;
  videoSrc?: string;
  mediaType: 'image' | 'video';
} {
  if (typeof item === 'string') {
    return { src: item, mediaType: 'image' };
  }
  if (item.type === 'video') {
    return {
      src: item.poster || item.src,
      poster: item.poster,
      videoSrc: item.src,
      mediaType: 'video',
    };
  }
  return { src: item.src, mediaType: 'image' };
}

function sortDisciplines(list: string[]): string[] {
  const rank = new Map(TECHNIQUE_CHIP_ORDER.map((d, i) => [d, i]));
  return [...list].sort((a, b) => {
    const ra = rank.get(a) ?? 999;
    const rb = rank.get(b) ?? 999;
    if (ra !== rb) return ra - rb;
    return a.localeCompare(b);
  });
}

function deriveDisciplines(projects: IndexProject[], collections: CollectionMedia[]): string[] {
  const set = new Set<string>();
  projects.forEach((p) => {
    (DISC_BY_PROJ[p.id] || []).forEach((d) => set.add(d));
  });
  collections.forEach((c) => {
    c.disciplines.forEach((d) => set.add(d));
  });
  Object.keys(TECHNIQUE_FROM_COLLECTION).forEach((d) => set.add(d));
  return sortDisciplines([...set]);
}

function mediaTypeFromSrc(src: string, hint?: 'video' | 'image'): 'image' | 'video' {
  if (hint === 'video' || hint === 'image') return hint;
  return VIDEO_EXT.test(src) ? 'video' : 'image';
}

/** Skip formats that often stay black in grid tiles (no web preview). */
function isIndexableVideo(src: string): boolean {
  if (!VIDEO_EXT.test(src)) return false;
  if (/_WEB\.(mp4|webm)/i.test(src)) return true;
  if (/\.(mp4|webm|m4v)(\?|$)/i.test(src)) return true;
  return false;
}

function firstImageFromProject(w: IndexProject): string | null {
  for (const g of w.galleryItems || []) {
    if (g.type === 'image' || !VIDEO_EXT.test(g.src)) return g.src;
  }
  if (w.poster && !VIDEO_EXT.test(w.poster)) return w.poster;
  return null;
}

const OPTIMIZED_STILL: Record<string, string> = {
  '1': '/images/optimized/videos/BIOINTERFACE/1.JPG_compressed.webp',
  '1b': '/images/optimized/videos/BIOINTERFACE/1.JPG_compressed.webp',
  '2': '/images/optimized/videos/museo/1_compressed.webp',
  '3': '/images/optimized/videos/OHM/3_compressed.webp',
  '4': '/images/optimized/videos/edzna/1_compressed.webp',
  '5': '/images/optimized/videos/wavey/wavey-1.webp',
  '7': '/collections/projection-mapping/index/01.webp',
  '8': '/images/optimized/videos/OHM/3_compressed.webp',
  'breathing-space': '/videos/ASANA_YOGA/IMG_20260131_103426.jpg',
  'ai-mirror-dia-de-muertos': '/collections/immersive-installation/index/06.webp',
};

function stillForProject(w: IndexProject): string | null {
  const img = firstImageFromProject(w);
  if (img) return img;
  if (OPTIMIZED_STILL[w.id]) return OPTIMIZED_STILL[w.id]!;
  return '/images/IMMERSIVE.jpg';
}

type IndexImageRef = string | { type: 'video'; src: string; poster?: string };

function resolveIndexImage(ref: IndexImageRef, w: IndexProject): {
  img: string | null;
  videoSrc?: string | null;
  mediaType: 'image' | 'video';
} {
  if (typeof ref === 'string') {
    if (VIDEO_EXT.test(ref)) {
      const still = stillForProject(w);
      return { img: still, videoSrc: ref, mediaType: 'video' };
    }
    return { img: ref, mediaType: 'image' };
  }
  const still = ref.poster && !VIDEO_EXT.test(ref.poster) ? ref.poster : stillForProject(w);
  return { img: still, videoSrc: ref.src, mediaType: 'video' };
}

function pushProjectTile(
  tiles: IndexTile[],
  w: IndexProject,
  label: string,
  media: ReturnType<typeof resolveIndexImage>,
  globalIdx: number,
  tileKey: string
): number {
  tiles.push({
    id: tileKey,
    proj: w.id,
    projName: label,
    caption: label,
    slug: w.slug,
    disc: DISC_BY_PROJ[w.id] || [],
    tag: w.tag,
    year: w.credits.duration,
    img: media.img,
    videoSrc: media.videoSrc ?? null,
    mediaType: media.mediaType,
    treat: TREAT[globalIdx % TREAT.length]!,
    pos: POS[globalIdx % POS.length]!,
    ar: defaultTileAspect(media.mediaType),
  });
  return globalIdx + 1;
}

function buildTiles(projects: IndexProject[]): IndexTile[] {
  const tiles: IndexTile[] = [];
  let globalIdx = 0;
  const maxPerProj =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
      ? MAX_TILES_MOBILE
      : MAX_TILES_PER_PROJ;

  for (const w of projects) {
    const label = shortName(w.id, w.title);

    // work/{slug}.html Gallery + Process, or public/projects/{slug}/index/
    if (w.indexImages?.length) {
      w.indexImages.slice(0, maxPerProj).forEach((ref, k) => {
        globalIdx = pushProjectTile(
          tiles,
          w,
          label,
          resolveIndexImage(ref, w),
          globalIdx,
          `${w.id}-${k}`
        );
      });
      continue;
    }

    const still = stillForProject(w);
    globalIdx = pushProjectTile(
      tiles,
      w,
      label,
      { img: still, mediaType: 'image' },
      globalIdx,
      `${w.id}-0`
    );
  }

  return tiles;
}

function tileIndexInProject(id: string): number {
  const part = id.split('-').pop() ?? '0';
  const n = parseInt(part, 10);
  return Number.isFinite(n) ? n : 0;
}

function sortProjectTiles(tiles: IndexTile[]): IndexTile[] {
  const rank = new Map(FEATURED_PROJECT_IDS.map((id, i) => [id, i]));
  return [...tiles].sort((a, b) => {
    const ra = rank.get(a.proj) ?? 999;
    const rb = rank.get(b.proj) ?? 999;
    if (ra !== rb) return ra - rb;
    return tileIndexInProject(a.id) - tileIndexInProject(b.id);
  });
}

function groupByCollection(tiles: IndexTile[]): Map<string, IndexTile[]> {
  const map = new Map<string, IndexTile[]>();
  for (const t of tiles) {
    if (!t.proj.startsWith('col-')) continue;
    const slug = t.proj.slice(4);
    const list = map.get(slug) ?? [];
    list.push(t);
    map.set(slug, list);
  }
  return map;
}

function orderCollectionTiles(tiles: IndexTile[]): IndexTile[] {
  const byCol = groupByCollection(tiles);
  const out: IndexTile[] = [];
  for (const slug of COLLECTION_SLUG_ORDER) {
    const list = byCol.get(slug);
    if (list?.length) out.push(...list);
    byCol.delete(slug);
  }
  for (const list of byCol.values()) out.push(...list);
  return out;
}

function isExcludedFromAll(tile: IndexTile): boolean {
  const key = normalizeSrc(tile.img || tile.poster || tile.videoSrc || '');
  if (!key) return false;
  if (ALL_VIEW_EXCLUDE_EXACT.has(key)) return true;
  return ALL_VIEW_EXCLUDE_PARTIAL.some((part) => key.includes(part.toLowerCase()));
}

/** Prefer stills on “All” — avoids black video tiles and similar consecutive frames. */
function preferStillTiles(list: IndexTile[]): IndexTile[] {
  const stills = list.filter((t) => t.mediaType !== 'video');
  return stills.length > 0 ? stills : list;
}

/** Pick up to `limit` tiles (evenly spaced), skipping index-all-exclusions.json. */
function addTilesForAllView(list: IndexTile[], limit: number, ids: Set<string>): void {
  const candidates = preferStillTiles(list.filter((t) => !isExcludedFromAll(t)));
  for (const t of sampleEvenly(candidates, limit)) ids.add(t.id);
}

/** Round-robin by project so similar shots are not adjacent. */
function interleaveByProject(tiles: IndexTile[]): IndexTile[] {
  const projectTiles = tiles.filter((t) => !t.proj.startsWith('col-'));
  const collectionTiles = tiles.filter((t) => t.proj.startsWith('col-'));
  const order: string[] = [];
  const seen = new Set<string>();
  for (const pid of FEATURED_PROJECT_IDS) {
    if (projectTiles.some((t) => t.proj === pid)) {
      order.push(pid);
      seen.add(pid);
    }
  }
  for (const t of projectTiles) {
    if (!seen.has(t.proj)) {
      order.push(t.proj);
      seen.add(t.proj);
    }
  }
  const buckets = new Map<string, IndexTile[]>();
  for (const t of projectTiles) {
    const list = buckets.get(t.proj) ?? [];
    list.push(t);
    buckets.set(t.proj, list);
  }
  const out: IndexTile[] = [];
  let round = 0;
  let more = true;
  while (more) {
    more = false;
    for (const pid of order) {
      const list = buckets.get(pid);
      if (list && round < list.length) {
        out.push(list[round]!);
        more = true;
      }
    }
    round += 1;
  }
  return [...out, ...orderCollectionTiles(collectionTiles)];
}

function pickIdsForAllView(tiles: IndexTile[]): Set<string> {
  const ids = new Set<string>();
  const projects = sortProjectTiles(tiles.filter((t) => !t.proj.startsWith('col-')));
  const byProj = new Map<string, IndexTile[]>();
  for (const t of projects) {
    const list = byProj.get(t.proj) ?? [];
    list.push(t);
    byProj.set(t.proj, list);
  }
  for (const pid of FEATURED_PROJECT_IDS) {
    const list = byProj.get(pid);
    if (!list) continue;
    addTilesForAllView(list, ALL_VIEW_MAX_PER_FEATURED, ids);
    byProj.delete(pid);
  }
  for (const list of byProj.values()) {
    addTilesForAllView(list, ALL_VIEW_MAX_PER_PROJECT, ids);
  }

  if (ALL_VIEW_SHOW_COLLECTIONS) {
    const byCol = groupByCollection(tiles);
    for (const slug of COLLECTION_SLUG_ORDER) {
      const list = byCol.get(slug);
      if (!list) continue;
      addTilesForAllView(
        sampleEvenly(list, list.length),
        ALL_VIEW_MAX_PER_COLLECTION,
        ids
      );
    }
  }

  return ids;
}

function composeIndexTiles(projectTiles: IndexTile[], collectionTiles: IndexTile[]): IndexTile[] {
  return interleaveByProject([...sortProjectTiles(projectTiles), ...collectionTiles]);
}

function sampleEvenly<T>(items: T[], limit: number): T[] {
  if (items.length <= limit) return items;
  const out: T[] = [];
  for (let i = 0; i < limit; i++) {
    out.push(items[Math.floor((i * items.length) / limit)]!);
  }
  return out;
}

function buildCollectionTiles(collections: CollectionMedia[], startIdx: number): IndexTile[] {
  const tiles: IndexTile[] = [];
  let globalIdx = startIdx;
  const maxCol =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
      ? MAX_COLLECTION_TILES_MOBILE
      : MAX_COLLECTION_TILES;

  for (const col of collections) {
    const picked = sampleEvenly(col.index, maxCol);
    picked.forEach((raw, k) => {
      const item = normalizeCollectionItem(raw);
      const stillKey = normalizeSrc(item.poster || item.src);
      const linkSlug = COLLECTION_STILL_TO_PROJECT[stillKey];
      tiles.push({
        id: `col-${col.slug}-${k}`,
        proj: `col-${col.slug}`,
        projName: linkSlug ? shortName('5', 'Wavey') : col.label,
        caption: linkSlug ? shortName('5', 'Wavey') : col.label,
        slug: linkSlug || '',
        linkSlug,
        disc: col.disciplines,
        tag: col.label,
        year: '',
        img: item.src,
        poster: item.poster ?? null,
        videoSrc: item.videoSrc ?? null,
        mediaType: item.mediaType,
        treat: TREAT[globalIdx % TREAT.length]!,
        pos: POS[globalIdx % POS.length]!,
        ar: defaultTileAspect(item.mediaType),
      });
      globalIdx += 1;
    });
  }

  return tiles;
}

function tileHref(t: IndexTile): string {
  if (t.linkSlug) return `work/${t.linkSlug}.html#concept`;
  if (t.proj.startsWith('col-')) return '#projects';
  return `work/${t.slug}.html`;
}

function renderTileMedia(t: IndexTile): string {
  if (!t.img && !t.videoSrc) {
    return `<div class="gal-placeholder">Image soon</div>`;
  }
  if (t.mediaType === 'video' && t.videoSrc) {
    const poster = t.img || t.poster || '';
    return `<video class="gal-media gal-media--video" data-video-src="${t.videoSrc}" poster="${poster}" muted loop playsinline preload="none" style="object-position:${t.pos}"></video>`;
  }
  return `<img class="gal-media" src="${t.img}" alt="${t.caption}" loading="lazy" decoding="async" draggable="false" style="object-position:${t.pos}">`;
}

export async function initImmersiveIndex(
  projects: IndexProject[],
  collections: CollectionMedia[] = []
): Promise<void> {
  const root = document.getElementById('immersive-index');
  if (!root || projects.length === 0) return;

  const projectTiles = buildTiles(projects);
  const collectionTiles = buildCollectionTiles(collections, projectTiles.length);
  const tiles = composeIndexTiles(projectTiles, collectionTiles);
  const allViewTileIds = pickIdsForAllView(tiles);
  const discs = deriveDisciplines(projects, collections);

  let facet: 'proj' | 'disc' = 'disc';
  let active = 'all';
  const tx = { x: 0, y: 0 };

  root.innerHTML = `
    <div class="immersive-index__controls">
      <div class="immersive-index__intro">
        <div class="immersive-index__intro-text">
          <h2 class="immersive-index__title">AI audiovisual real time installations and interactive design</h2>
        </div>
        <div class="immersive-index__counter" aria-live="polite">
          <span class="immersive-index__counter-vis" data-counter-vis>${pad3(tiles.length)}</span>
          <span class="immersive-index__counter-sep">/</span>
          <span class="immersive-index__counter-total" data-counter-total>${pad3(tiles.length)}</span>
        </div>
      </div>
      <div class="immersive-index__controls-top">
        <div class="immersive-index__seg" role="tablist" aria-label="Filter by">
          <button type="button" class="immersive-index__seg-btn is-active" data-facet="disc">By Technique</button>
          <button type="button" class="immersive-index__seg-btn" data-facet="proj">By Project</button>
        </div>
      </div>
      <div class="immersive-index__chips-scroll">
        <div class="immersive-index__chips" data-chips></div>
      </div>
    </div>
    <div class="immersive-index__stage" data-stage>
      <div class="immersive-index__grid" data-grid></div>
      <div class="immersive-index__hint" data-hint>✣ drag to explore</div>
    </div>
  `;

  const counterVis = root.querySelector<HTMLElement>('[data-counter-vis]')!;
  const counterTotal = root.querySelector<HTMLElement>('[data-counter-total]')!;
  const chipsEl = root.querySelector<HTMLElement>('[data-chips]')!;
  const stage = root.querySelector<HTMLElement>('[data-stage]')!;
  const grid = root.querySelector<HTMLElement>('[data-grid]')!;
  const hint = root.querySelector<HTMLElement>('[data-hint]')!;

  counterTotal.textContent = pad3(tiles.length);

  grid.innerHTML = tiles
    .map(
      (t) => `
    <figure class="immersive-index__tile" data-tile-id="${t.id}" data-proj="${t.proj}" data-disc="${t.disc.join('|')}" data-href="${tileHref(t)}" tabindex="0" role="link" aria-label="${t.projName} - ${t.caption}">
      <div class="gal-frame" style="--tile-ar:${t.ar}">
        ${renderTileMedia(t)}
        <span class="gal-caption">
          <span class="gal-caption__proj">${t.caption}</span>
          <span class="gal-caption__disc">${t.year || ''}</span>
        </span>
        <span class="gal-spec"></span>
      </div>
    </figure>`
    )
    .join('');

  const tileEls = Array.from(grid.querySelectorAll<HTMLElement>('[data-tile-id]'));

  tileEls.forEach((el) => {
    el.querySelectorAll<HTMLImageElement>('img.gal-media').forEach((img) => {
      img.addEventListener('error', () => {
        el.style.display = 'none';
      });
    });
    el.querySelectorAll<HTMLVideoElement>('video.gal-media--video').forEach((vid) => {
      vid.addEventListener('error', () => {
        if (vid.poster) return;
        el.style.display = 'none';
      });
    });
  });

  tileEls.forEach((el) => {
    const href = el.dataset.href;
    if (!href) return;
    el.style.cursor = 'pointer';
    const go = (): void => {
      const target = el.dataset.href || href;
      if (target.startsWith('#')) {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      window.location.href = target;
    };
    el.addEventListener('click', (e) => {
      if (stage.classList.contains('is-dragging')) return;
      go();
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });
  });

  const matches = (tile: IndexTile, key: string): boolean => {
    if (key === 'all') return allViewTileIds.has(tile.id);
    if (facet === 'proj') return tile.proj === key;
    const colSlug = TECHNIQUE_FROM_COLLECTION[key];
    if (colSlug) return tile.proj === `col-${colSlug}`;
    return tile.disc.includes(key);
  };

  const countFor = (key: string): number =>
    tiles.filter((t) => matches(t, key)).length;

  const getChips = (): Array<{ key: string; label: string }> => {
    if (facet === 'proj') {
      return [
        { key: 'all', label: 'All' },
        ...projects.map((w) => ({
          key: w.id,
          label: shortName(w.id, w.title),
        })),
      ];
    }
    return [{ key: 'all', label: 'All' }, ...discs.map((d) => ({ key: d, label: d }))];
  };

  let chipIndicator: HTMLElement | null = null;

  const updateIndicator = (): void => {
    if (!chipIndicator) return;
    const btn = chipsEl.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!btn) return;
    chipIndicator.style.width = `${btn.offsetWidth}px`;
    chipIndicator.style.transform = `translateX(${btn.offsetLeft}px)`;
  };

  const renderChips = (): void => {
    const chips = getChips();
    chipsEl.innerHTML = `<span class="immersive-index__chip-indicator" data-indicator></span>`;
    chipIndicator = chipsEl.querySelector('[data-indicator]');
    chips.forEach((c) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `immersive-index__chip${active === c.key ? ' is-active' : ''}`;
      btn.dataset.chip = c.key;
      const count = countFor(c.key);
      btn.innerHTML = `<span>${c.label}</span><span class="immersive-index__chip-count">${pad3(count).slice(1)}</span>`;
      btn.addEventListener('click', () => pickChip(c.key));
      chipsEl.appendChild(btn);
    });
    requestAnimationFrame(updateIndicator);
  };

  const pauseAllIndexVideos = (): void => {
    grid.querySelectorAll<HTMLVideoElement>('video.gal-media--video').forEach((v) => {
      v.pause();
      v.removeAttribute('src');
      v.load();
      v.dataset.playing = '0';
    });
  };

  const applyFilter = (): void => {
    pauseAllIndexVideos();
    let visible = 0;
    tileEls.forEach((el, i) => {
      const tile = tiles[i]!;
      const show = matches(tile, active);
      el.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    counterVis.textContent = pad3(visible);
    relayout();
    alignGridView();
  };

  const pickChip = (key: string): void => {
    active = key;
    renderChips();
    applyFilter();
  };

  const pickFacet = (f: 'proj' | 'disc'): void => {
    if (f === facet) return;
    facet = f;
    active = 'all';
    root.querySelectorAll<HTMLElement>('[data-facet]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.facet === f);
    });
    renderChips();
    applyFilter();
  };

  root.querySelectorAll<HTMLElement>('[data-facet]').forEach((btn) => {
    btn.addEventListener('click', () => pickFacet(btn.dataset.facet as 'proj' | 'disc'));
  });

  root.dataset.indexReady = 'true';

  const relayout = (): void => {
    const visible = tiles.filter((t) => matches(t, active)).length || 1;
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const colW = mobile ? 228 : 312;
    const gap = mobile ? 14 : 22;
    const cols = mobile
      ? Math.max(2, Math.min(4, Math.ceil(visible / 4)))
      : Math.max(4, Math.min(9, Math.ceil(visible / 3)));
    const gridW = cols * colW + (cols - 1) * gap + 24;
    grid.style.setProperty('--gal-col-w', `${colW}px`);
    grid.style.setProperty('--gal-gap', `${gap}px`);
    grid.style.columnCount = String(cols);
    grid.style.width = `${gridW}px`;
  };

  const clampXY = (x: number, y: number): [number, number] => {
    const minX = Math.min(0, stage.clientWidth - grid.scrollWidth);
    const minY = Math.min(0, stage.clientHeight - grid.scrollHeight);
    return [Math.max(minX, Math.min(0, x)), Math.max(minY, Math.min(0, y))];
  };

  const applyTransform = (): void => {
    grid.style.transform = `translate3d(${tx.x}px, ${tx.y}px, 0)`;
  };

  /** Muro ancho: arranca a la izquierda para explorar hacia la derecha. */
  const alignGridView = (): void => {
    const padX = window.matchMedia('(max-width: 768px)').matches ? 16 : 36;
    let x = padX;
    if (grid.scrollWidth < stage.clientWidth - padX * 2) {
      x = (stage.clientWidth - grid.scrollWidth) / 2;
    }
    const y = (stage.clientHeight - grid.scrollHeight) / 2;
    const [cx, cy] = clampXY(x, y);
    tx.x = cx;
    tx.y = cy;
    applyTransform();
  };

  let dragging = false;
  let sx = 0;
  let sy = 0;
  let ox = 0;
  let oy = 0;
  let vx = 0;
  let vy = 0;
  let lastT = 0;
  let raf = 0;
  let moved = false;

  const onDown = (e: PointerEvent): void => {
    if (e.button !== 0) return;
    dragging = true;
    moved = false;
    stage.classList.add('is-dragging');
    cancelAnimationFrame(raf);
    sx = e.clientX;
    sy = e.clientY;
    ox = tx.x;
    oy = tx.y;
    vx = 0;
    vy = 0;
    lastT = performance.now();
    hint.classList.add('is-gone');
    stage.setPointerCapture(e.pointerId);
  };

  const onMove = (e: PointerEvent): void => {
    if (!dragging) return;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    const [cx, cy] = clampXY(ox + dx, oy + dy);
    const now = performance.now();
    const dt = Math.max(8, now - lastT);
    vx = ((cx - tx.x) / dt) * 16;
    vy = ((cy - tx.y) / dt) * 16;
    lastT = now;
    tx.x = cx;
    tx.y = cy;
    applyTransform();
  };

  const onUp = (e: PointerEvent): void => {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('is-dragging');
    try {
      stage.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const step = (): void => {
      vx *= 0.93;
      vy *= 0.93;
      if (Math.abs(vx) < 0.15 && Math.abs(vy) < 0.15) return;
      const [cx, cy] = clampXY(tx.x + vx, tx.y + vy);
      if (cx === tx.x) vx = 0;
      if (cy === tx.y) vy = 0;
      tx.x = cx;
      tx.y = cy;
      applyTransform();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };

  stage.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  stage.addEventListener(
    'click',
    (e) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    true
  );

  window.addEventListener('resize', () => {
    updateIndicator();
    relayout();
    alignGridView();
  });

  const MAX_INDEX_VIDEOS_PLAYING = 2;

  const initVideoTiles = (): void => {
    const videos = Array.from(grid.querySelectorAll<HTMLVideoElement>('video.gal-media--video'));
    if (!videos.length) return;

    const setTileLoading = (v: HTMLVideoElement, loading: boolean): void => {
      v.closest('.gal-frame')?.classList.toggle('is-media-loading', loading);
    };

    const tileVisible = (v: HTMLVideoElement): boolean => {
      const tile = v.closest<HTMLElement>('.immersive-index__tile');
      if (!tile || tile.style.display === 'none') return false;
      return true;
    };

    const unload = (v: HTMLVideoElement): void => {
      v.pause();
      v.removeAttribute('src');
      v.load();
      v.dataset.playing = '0';
    };

    const play = (v: HTMLVideoElement): void => {
      const src = v.dataset.videoSrc || '';
      if (!src || !tileVisible(v)) return;

      const playing = videos.filter((x) => x.dataset.playing === '1');
      if (playing.length >= MAX_INDEX_VIDEOS_PLAYING && v.dataset.playing !== '1') {
        const farthest = playing.reduce((a, b) =>
          (a.getBoundingClientRect().top > b.getBoundingClientRect().top ? a : b)
        );
        unload(farthest);
      }

      if (v.dataset.playing === '1' && v.src) return;
      v.src = src;
      v.preload = 'auto';
      v.load();
      const p = v.play();
      if (p) {
        p.then(() => {
          v.dataset.playing = '1';
        }).catch(() => {});
      }
    };

    videos.forEach((v) => {
      v.preload = 'none';
      v.addEventListener('loadstart', () => setTileLoading(v, true));
      v.addEventListener('waiting', () => setTileLoading(v, true));
      v.addEventListener('canplay', () => setTileLoading(v, false));
      v.addEventListener('playing', () => setTileLoading(v, false));
      v.addEventListener('error', () => setTileLoading(v, false));
    });

    const syncFromEntries = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        const wantPlay = e.isIntersecting && e.intersectionRatio >= 0.4 && tileVisible(v);
        if (wantPlay) play(v);
        else unload(v);
      });
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(syncFromEntries, {
        root: null,
        rootMargin: '80px 0px',
        threshold: [0, 0.25, 0.4, 0.55],
      });
      videos.forEach((v) => io.observe(v));

      const section = root;
      const sectionIo = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) return;
          videos.forEach(unload);
        },
        { root: null, threshold: 0.05 }
      );
      sectionIo.observe(section);
    }
  };

  const reflowAfterAspects = (): void => {
    relayout();
    alignGridView();
  };

  renderChips();
  applyFilter();
  initTileNaturalAspects(grid, reflowAfterAspects);
  initVideoTiles();
}
