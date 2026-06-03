# Carpetas de proyecto — imágenes curadas

Una carpeta por proyecto. Nombre = **slug** (igual que la URL `work/biointerface.html`).

## Estructura

```
public/projects/
  biointerface/
    cover.webp       ← poster del carrusel (nombre: cover, poster o hero)
    index/           ← fotos que quieres en la galería Index
      01-instalacion.webp
      02-detalle.webp
    gallery/         ← extras (opcional)
  breathing-space/
    index/
      ...
```

## También: colecciones por técnica

Para fotos de **AI content**, **video generativo**, **mapping**, etc. (sin un solo proyecto):

→ `public/collections/` — ver `public/collections/README.md`

## Slugs válidos

| Carpeta | Proyecto |
|---------|----------|
| `biointerface` | Biointerface |
| `biointerface-2` | Biointerface 2 |
| `breathing-space` | Breathing Space |
| `ai-mirror-dia-de-muertos` | AI Mirror |
| `museo-descubre` | Museo Descubre |
| `ohm-interactive-laser-sculpture` | OHM |
| `ohm-1` | OHM 1 |
| `edzna-video-mapping` | Edzná |
| `wavey-runway` | Wavey |
| `thermosense` | ThermoSense |
| `whispers-of-the-lake-digital-immersive-experience` | Whispers |
| `ethereal-motion-digital-poetry` | Ethereal Motion |

## Videos grandes

Los `.mp4` pesados siguen en `/videos/` (Git LFS / cPanel).  
Aquí solo pon **fotos** y opcionalmente un `video.mp4` pequeño de preview.

## Después de añadir fotos

```bash
npm run projects:sync
npm run dev
```

Eso actualiza `src/project-media.json` y el sitio usa tus imágenes automáticamente.

## Deploy

1. `npm run projects:sync`
2. `git add public/projects src/project-media.json`
3. `git push`
