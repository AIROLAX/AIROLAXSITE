/** Base URL for large media (videos). Empty = same origin (cPanel local / preview). */
const MEDIA_BASE = String(import.meta.env.VITE_MEDIA_BASE_URL || '').replace(/\/$/, '');

function normalizeMediaPath(path: string): string {
  let p = path.trim().replace(/\\/g, '/');
  while (p.includes('/./')) p = p.replace('/./', '/');
  if (/^https?:\/\//i.test(p)) return p;
  return p.startsWith('/') ? p : `/${p}`;
}

function isVideoPath(path: string): boolean {
  return path.startsWith('/videos/') || path.startsWith('/videos-compressed/');
}

/** Prefix /videos/ paths when VITE_MEDIA_BASE_URL is set (required on Vercel). */
export function mediaUrl(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = normalizeMediaPath(path);
  if (!MEDIA_BASE) return normalized;
  if (isVideoPath(normalized)) {
    return `${MEDIA_BASE}${normalized}`;
  }
  return normalized;
}
