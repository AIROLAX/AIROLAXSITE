import './immersive-index.css';

type IndexProject = {
  id: string;
  title: string;
  tag: string;
  slug: string;
  poster?: string;
  galleryItems?: Array<{ type: 'video' | 'image'; src: string; alt?: string }>;
  technologies: string[];
  credits: { duration: string };
};

type IndexTile = {
  id: string;
  proj: string;
  projName: string;
  caption: string;
  slug: string;
  disc: string[];
  tag: string;
  year: string;
  img: string | null;
  poster?: string | null;
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
  '1': ['AI Content', 'Real-time'],
  '7': ['Projection Mapping', 'Real-time'],
  'breathing-space': ['TouchDesigner', 'Generative'],
  'ai-mirror-dia-de-muertos': ['AI Content', 'Real-time'],
  '1b': ['AI Content', 'Real-time'],
  '2': ['Real-time', 'TouchDesigner'],
  '3': ['Sound', 'Real-time'],
  '4': ['Projection Mapping'],
  '5': ['Generative', 'AI Content'],
  '6': ['Real-time'],
  '8': ['Generative'],
  '9': ['Generative', 'Real-time'],
};

const MAX_TILES_PER_PROJ = 5;
const MAX_TILES_MOBILE = 3;
const VIDEO_EXT = /\.(mp4|mov|webm|mkv|m4v)(\?|$)/i;
const TREAT = ['none'];
const POS = ['center', 'top', 'bottom', '30% 70%', '70% 30%'];
const AR = [1, 0.8, 1.28, 1, 0.74, 1.34];

const pad3 = (n: number): string => String(n).padStart(3, '0');

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function deriveDisciplines(projects: IndexProject[]): string[] {
  const set = new Set<string>();
  projects.forEach((p) => {
    (DISC_BY_PROJ[p.id] || []).forEach((d) => set.add(d));
  });
  return [...set];
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
  '8': '/images/optimized/videos/OHM/3_compressed.webp',
};

function stillForProject(w: IndexProject): string | null {
  const img = firstImageFromProject(w);
  if (img) return img;
  if (OPTIMIZED_STILL[w.id]) return OPTIMIZED_STILL[w.id]!;
  return '/images/IMMERSIVE.jpg';
}

function fallbackTileMedia(w: IndexProject): { src: string | null; type: 'image' | 'video' } {
  const still = stillForProject(w);
  return { src: still, type: 'image' };
}

function buildTiles(projects: IndexProject[]): IndexTile[] {
  const globalSeen = new Set<string>();
  const tiles: IndexTile[] = [];
  let globalIdx = 0;
  const maxPerProj =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
      ? MAX_TILES_MOBILE
      : MAX_TILES_PER_PROJ;

  for (const w of projects) {
    const localSeen = new Set<string>();
    const sources: Array<{ src: string; type: 'image' | 'video' }> = [];
    const label = shortName(w.id, w.title);

    const add = (src: string, type?: 'video' | 'image'): boolean => {
      const s = src.trim();
      const resolvedType = mediaTypeFromSrc(s, type);
      if (resolvedType === 'video' && !isIndexableVideo(s)) return false;
      const key = normalizeSrc(s);
      if (!key || localSeen.has(key) || globalSeen.has(key)) return false;
      localSeen.add(key);
      globalSeen.add(key);
      sources.push({ src: s, type: resolvedType });
      return true;
    };

    const gallery = w.galleryItems || [];
    const gallerySorted = [
      ...gallery.filter((g) => g.type === 'image' || !VIDEO_EXT.test(g.src)),
      ...gallery.filter((g) => g.type === 'video' && VIDEO_EXT.test(g.src)),
    ];
    for (const g of gallerySorted) {
      add(g.src, g.type);
    }

    if (w.poster && !VIDEO_EXT.test(w.poster)) {
      add(w.poster);
    }

    const imageSources = sources.filter((s) => s.type === 'image');
    let picked =
      imageSources.length > 0
        ? imageSources.slice(0, maxPerProj)
        : sources.slice(0, maxPerProj);

    if (picked.length === 0) {
      const still = stillForProject(w);
      if (still) picked = [{ src: still, type: 'image' }];
    }

    // Grid tiles: always stills so frames fill instantly (no black video boxes)
    picked = picked.map((item) => ({
      src: item.type === 'image' ? item.src : stillForProject(w) || item.src,
      type: 'image' as const,
    }));
    const tilePoster = firstImageFromProject(w);

    if (picked.length === 0) {
      const fb = fallbackTileMedia(w);
      tiles.push({
        id: `${w.id}-0`,
        proj: w.id,
        projName: label,
        caption: label,
        slug: w.slug,
        disc: DISC_BY_PROJ[w.id] || [],
        tag: w.tag,
        year: w.credits.duration,
        img: fb.src,
        poster: tilePoster,
        mediaType: fb.type,
        treat: TREAT[globalIdx % TREAT.length]!,
        pos: POS[globalIdx % POS.length]!,
        ar: AR[globalIdx % AR.length]!,
      });
      globalIdx += 1;
      continue;
    }

    picked.forEach((item, k) => {
      tiles.push({
        id: `${w.id}-${k}`,
        proj: w.id,
        projName: label,
        caption: label,
        slug: w.slug,
        disc: DISC_BY_PROJ[w.id] || [],
        tag: w.tag,
        year: w.credits.duration,
        img: item.src,
        poster: item.type === 'video' ? tilePoster : null,
        mediaType: item.type,
        treat: TREAT[globalIdx % TREAT.length]!,
        pos: POS[globalIdx % POS.length]!,
        ar: AR[globalIdx % AR.length]!,
      });
      globalIdx += 1;
    });
  }

  return tiles.sort((a, b) => (hashStr(a.id) % 9973) - (hashStr(b.id) % 9973));
}

function renderTileMedia(t: IndexTile): string {
  const style = `object-position:${t.pos}`;
  if (!t.img) {
    return `<div class="gal-placeholder">Image soon</div>`;
  }
  return `<img src="${t.img}" alt="${t.caption}" loading="lazy" decoding="async" draggable="false" style="${style}">`;
}

export async function initImmersiveIndex(projects: IndexProject[]): Promise<void> {
  const root = document.getElementById('immersive-index');
  if (!root || projects.length === 0) return;

  const tiles = buildTiles(projects);
  const discs = deriveDisciplines(projects);

  let facet: 'proj' | 'disc' = 'proj';
  let active = 'all';
  let fichaTimer: ReturnType<typeof setTimeout> | null = null;

  const tx = { x: 0, y: 0 };

  root.innerHTML = `
    <div class="immersive-index__head">
      <div>
        <p class="immersive-index__label">Index - Selected Work</p>
        <h2 class="immersive-index__title">Each frame, a line of light.</h2>
      </div>
      <div class="immersive-index__counter" aria-live="polite">
        <span class="immersive-index__counter-vis" data-counter-vis>${pad3(tiles.length)}</span>
        <span class="immersive-index__counter-sep">/</span>
        <span class="immersive-index__counter-total" data-counter-total>${pad3(tiles.length)}</span>
      </div>
    </div>
    <div class="immersive-index__facet-wrap">
      <div class="immersive-index__seg" role="tablist" aria-label="Filter by">
        <button type="button" class="immersive-index__seg-btn is-active" data-facet="proj">By Project</button>
        <button type="button" class="immersive-index__seg-btn" data-facet="disc">By Technique</button>
      </div>
    </div>
    <div class="immersive-index__chips-scroll">
      <div class="immersive-index__chips" data-chips></div>
    </div>
    <div class="immersive-index__stage" data-stage>
      <div class="immersive-index__grid" data-grid></div>
      <div class="immersive-index__hint" data-hint>✣ drag to explore</div>
    </div>
    <div class="immersive-index__ficha" data-ficha hidden></div>
  `;

  const counterVis = root.querySelector<HTMLElement>('[data-counter-vis]')!;
  const counterTotal = root.querySelector<HTMLElement>('[data-counter-total]')!;
  const chipsEl = root.querySelector<HTMLElement>('[data-chips]')!;
  const stage = root.querySelector<HTMLElement>('[data-stage]')!;
  const grid = root.querySelector<HTMLElement>('[data-grid]')!;
  const hint = root.querySelector<HTMLElement>('[data-hint]')!;
  const fichaEl = root.querySelector<HTMLElement>('[data-ficha]')!;

  counterTotal.textContent = pad3(tiles.length);

  grid.innerHTML = tiles
    .map(
      (t) => `
    <figure class="immersive-index__tile" data-tile-id="${t.id}" data-proj="${t.proj}" data-disc="${t.disc.join('|')}" data-href="work/${t.slug}.html" tabindex="0" role="link" aria-label="${t.projName} - ${t.caption}">
      <div class="gal-frame" style="aspect-ratio:${t.ar}">
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
    const href = el.dataset.href;
    if (!href) return;
    el.style.cursor = 'pointer';
    const go = (): void => {
      window.location.href = href;
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
    if (key === 'all') return true;
    return facet === 'proj' ? tile.proj === key : tile.disc.includes(key);
  };

  const countFor = (key: string): number =>
    tiles.filter((t) => matches(t, key)).length;

  const getChips = (): Array<{ key: string; label: string }> => {
    if (facet === 'proj') {
      return [
        { key: 'all', label: 'Todos' },
        ...projects.map((w) => ({
          key: w.id,
          label: shortName(w.id, w.title),
        })),
      ];
    }
    return [{ key: 'all', label: 'Todos' }, ...discs.map((d) => ({ key: d, label: d }))];
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

  const applyFilter = (): void => {
    let visible = 0;
    tileEls.forEach((el, i) => {
      const tile = tiles[i]!;
      const show = matches(tile, active);
      el.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    counterVis.textContent = pad3(visible);
    relayout();
    centerView();
  };

  const showFicha = (card: { kind: string; title: string; sub: string; meta: string }): void => {
    fichaEl.hidden = false;
    fichaEl.classList.add('is-visible');
    fichaEl.innerHTML = `
      <span class="immersive-index__ficha-kind">${card.kind}</span>
      <span class="immersive-index__ficha-title">${card.title}</span>
      <span class="immersive-index__ficha-meta">
        <span>${card.sub}</span>
        <span>|</span>
        <span>${card.meta}</span>
      </span>
      <span class="immersive-index__ficha-bar"></span>`;
    if (fichaTimer) clearTimeout(fichaTimer);
    fichaTimer = setTimeout(() => {
      fichaEl.classList.remove('is-visible');
      fichaEl.hidden = true;
    }, 2600);
  };

  const pickChip = (key: string): void => {
    active = key;
    renderChips();
    applyFilter();
    if (key === 'all') return;
    if (facet === 'proj') {
      const w = projects.find((x) => x.id === key);
      if (w) {
        showFicha({
          kind: 'PROJECT',
          title: shortName(w.id, w.title),
          sub: w.tag,
          meta: w.credits.duration,
        });
      }
    } else {
      showFicha({ kind: 'TECHNIQUE', title: key, sub: 'Discipline', meta: `${pad3(countFor(key))} works` });
    }
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

  const relayout = (): void => {
    const visible = tiles.filter((t) => matches(t, active)).length || 1;
    const colW = 264;
    const gap = 16;
    const cols = Math.max(3, Math.min(11, Math.ceil(visible / 6)));
    grid.style.columnCount = String(cols);
    grid.style.width = `${cols * colW + (cols - 1) * gap + 20}px`;
  };

  const clampXY = (x: number, y: number): [number, number] => {
    const minX = Math.min(0, stage.clientWidth - grid.scrollWidth);
    const minY = Math.min(0, stage.clientHeight - grid.scrollHeight);
    return [Math.max(minX, Math.min(0, x)), Math.max(minY, Math.min(0, y))];
  };

  const applyTransform = (): void => {
    grid.style.transform = `translate3d(${tx.x}px, ${tx.y}px, 0)`;
  };

  const centerView = (): void => {
    const [cx, cy] = clampXY(
      (stage.clientWidth - grid.scrollWidth) / 2,
      (stage.clientHeight - grid.scrollHeight) / 2
    );
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
    centerView();
  });

  renderChips();
  applyFilter();
}
