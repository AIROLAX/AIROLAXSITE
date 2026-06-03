/** Base URL for large media (videos). Empty = same origin (cPanel local / preview). */
const MEDIA_BASE = String(import.meta.env.VITE_MEDIA_BASE_URL || '').replace(/\/$/, '');

/** Prefix /videos/ paths when VITE_MEDIA_BASE_URL is set (required on Vercel). */
export function mediaUrl(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!MEDIA_BASE) return normalized;
  if (normalized.startsWith('/videos/') || normalized.startsWith('/videos-compressed/')) {
    return `${MEDIA_BASE}${normalized}`;
  }
  return normalized;
}
