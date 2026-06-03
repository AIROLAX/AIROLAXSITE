# Deploy en Vercel (push → live)

Igual que Andata Lab: conectas el repo a Vercel y cada **`git push`** a `main` despliega solo.

## Una sola vez (dashboard Vercel)

1. [vercel.com](https://vercel.com) → **Add Project** → importa **`AIROLAX/AIROLAXSITE`** (GitHub).
2. Framework: **Other** (ya está en `vercel.json`).
3. **Environment Variables** → Production:

| Variable | Valor |
|----------|--------|
| `VITE_MEDIA_BASE_URL` | *(leave empty)* — videos load from `/videos` via proxy to cPanel |
| `VITE_GA_MEASUREMENT_ID` | `G-RWP8TWF8QX` (opcional) |

Los vídeos pesados (`/videos/*`) y los previews (`/collections/*/previews/*.mp4`) se sirven desde **cPanel** vía rewrites a `https://mail.airolax.com/...` (mismo `public_html`). Vercel sube el sitio + fotos `.webp`. **No** pongas `VITE_MEDIA_BASE_URL=https://airolax.com` en Vercel.

4. Dominio: en Vercel → **Domains** → `airolax.com` (o deja el `*.vercel.app` para probar).

## Cada actualización

```bash
git add .
git commit -m "tu mensaje"
git push origin main
```

Vercel construye automáticamente (`npm install` → `npm run build` → `dist/`). Los vídeos LFS no se descargan en Vercel; se cargan desde `VITE_MEDIA_BASE_URL`.

## Local

Copia `.env.example` → `.env`. Para probar como producción:

```
VITE_MEDIA_BASE_URL=https://airolax.com
```

## Qué no va en el push

- `*.zip`, `dist/`, `.env`
- `public/collections/**/previews/` (mp4 — viven en el servidor)
- `public/collections/**/__match/`, `_source/`

## cPanel vs Vercel

| | cPanel ZIP | Vercel + push |
|--|------------|----------------|
| Actualizar | Subir ZIP manual | `git push` |
| Vídeos grandes | En el mismo servidor | `VITE_MEDIA_BASE_URL` → cPanel |
