/** Base URL for large media (videos). Empty = same origin (cPanel local / preview). */
const MEDIA_BASE = String(import.meta.env.VITE_MEDIA_BASE_URL || '').replace(/\/$/, '');

function normalizeMediaPath(path: string): string {
  let p = path.trim().replace(/\\/g, '/');
  while (p.includes('/./')) p = p.replace('/./', '/');
  if (/^https?:\/\//i.test(p)) return p;
  return p.startsWith('/') ? p : `/${p}`;
}

const VIDEO_PATH = /\.(mp4|mov|webm|m4v|mkv)(\?|#|$)/i;

function isHeavyMediaPath(path: string): boolean {
  if (path.startsWith('/videos/') || path.startsWith('/videos-compressed/')) return true;
  if (path.startsWith('/collections/') && VIDEO_PATH.test(path)) return true;
  return false;
}

/** Prefix heavy media when VITE_MEDIA_BASE_URL is set (Vercel → airolax.com / CDN). */
export function mediaUrl(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = normalizeMediaPath(path);
  if (!MEDIA_BASE) return normalized;
  if (isHeavyMediaPath(normalized)) {
    return `${MEDIA_BASE}${normalized}`;
  }
  return normalized;
}
