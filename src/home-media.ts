import thumbsFile from './home-thumbs.json';

type ThumbEntry = {
  src: string;
  srcSet?: string;
};

const thumbs = (thumbsFile as { thumbs?: Record<string, ThumbEntry> }).thumbs ?? {};

export function normalizeMediaKey(src: string): string {
  try {
    return decodeURIComponent(src.trim()).toLowerCase().split('?')[0]!;
  } catch {
    return src.trim().toLowerCase();
  }
}

/** Unique still per selected-work card — never share a fallback across projects. */
export const SELECTED_WORK_STILL: Record<string, string> = {
  '1': '/images/optimized/videos/BIOINTERFACE/1.JPG_compressed.webp',
  '1b': '/videos/BIOINTERFACE/F2.jpg',
  '7': '/collections/projection-mapping/index/01.webp',
  'breathing-space': '/videos/ASANA_YOGA/IMG_20260131_103426.jpg',
  'ai-mirror-dia-de-muertos': '/collections/immersive-installation/index/06.webp',
  '2': '/images/optimized/videos/museo/1_compressed.webp',
  '3': '/images/luminex/ohm-1-source.jpg',
  '4': '/images/optimized/videos/edzna/1_compressed.webp',
  '5': '/images/optimized/videos/wavey/wavey-1.webp',
  '6': '/collections/generative-video/index/08.webp',
  '8': '/projects/ohm-1/ohm-sound-sculpture.jpg',
  '9': '/projects/particle-system/hero-poster.webp',
  'resonance-of-contact': '/projects/resonance-of-contact/render_installation_wide-800.webp',
};

export const HERO_STILL = '/collections/immersive-installation/index/12.webp';

export function reservedStillKeys(): Set<string> {
  return new Set(Object.values(SELECTED_WORK_STILL).map(normalizeMediaKey));
}

export function thumbFor(src: string): ThumbEntry {
  const key = src.split('?')[0] || src;
  const hit = thumbs[key] || thumbs[normalizeMediaKey(key)];
  if (hit?.src) return hit;
  return { src };
}

export function responsiveImageAttrs(
  src: string,
  opts: { loading: 'lazy' | 'eager'; sizes: string; alt: string; className?: string }
): string {
  const t = thumbFor(src);
  const cls = opts.className ? ` class="${opts.className}"` : '';
  const srcSet = t.srcSet ? ` srcset="${t.srcSet}"` : '';
  const fetchPri = opts.loading === 'eager' ? ' fetchpriority="high"' : '';
  return `<img${cls} src="${t.src}"${srcSet} sizes="${opts.sizes}" alt="${opts.alt}" loading="${opts.loading}" decoding="async"${fetchPri} draggable="false">`;
}
