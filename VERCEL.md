# Vercel deployment — audit notes

## Stack

- **Vite 5** + TypeScript (`src/main.ts` → `dist/assets/*.js`)
- **Entry:** root `index.html` (Vite default). `npm run build` outputs **`dist/`**.
- **Multi-page:** `postbuild` copies **`work/`** → **`dist/work/`** (project case study HTML). `contact.html` and other root HTML are **not** auto-copied; add to `postbuild` if you need them in production.

## Environment variables (Vercel dashboard)

| Name | Required | Notes |
|------|----------|--------|
| `VITE_GA_MEASUREMENT_ID` | No | GA4 ID, e.g. `G-XXXXXXXXXX`. Omit to disable GA on the main app bundle. |
| `VITE_MEDIA_BASE_URL` | **Yes (production)** | Base URL for `/videos/*` (Git LFS, too large for Vercel bundle). Example: `https://airolax.com` while cPanel still serves videos, then `https://media.airolax.com` after DNS points to Vercel. |

Copy `.env.example` → `.env` locally. In Vercel: **Project → Settings → Environment Variables** for Production/Preview.

**Note:** `work/*.html` still embed GA inline if present; they are static copies, not bundled. Update those files if you change the measurement ID and want consistency.

## Security audit (sanitization)

- **No server API keys** were found in app source. **Google Analytics Measurement ID** is public by design; it is now loaded via **`VITE_GA_MEASUREMENT_ID`** for environment-specific builds.
- **Removed** `api/hit.php` pixel from `index.html` (PHP not available on Vercel static).
- **WhatsApp / mailto** links are public — not secrets.

## Responsive

- **Viewport** updated: removed `maximum-scale=1` / `user-scalable=no` for better mobile accessibility and zoom.
- Layout uses **clamp**, **vw/vh**, and **media queries**; remaining fixed widths (e.g. 3D logo 280/180px) are **scoped inside `@media`** for desktop vs mobile.

## Git

- **`.gitignore`** excludes `node_modules/`, `dist/`, `.env*`, zips, `DEPLOY_CPANEL/`, `.vercel/`, logs, etc.

## Build check

```bash
npm install
npm run build
npx vite preview
```

Vercel runs `npm run build` and serves **`dist`**.
