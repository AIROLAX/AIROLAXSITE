# Colecciones — por tipo de trabajo

Usa estas carpetas para fotos **por técnica**, no ligadas a un solo proyecto.

Útil para: AI content, video generativo, mapping, instalaciones, pruebas / R&D.

## Carpetas

| Carpeta | Para qué | Filtro en Index |
|---------|----------|-----------------|
| `ai-content/` | IA, mirrors, contenido generativo | **Solo** aparece en Index → By Technique → **AI Content** |
| `generative-video/` | 3D motion, renders, video generativo | **3D Generative** |
| `projection-mapping/` | Fachadas, mapping, patrimonio | Projection Mapping |
| `immersive-installation/` | Instalaciones, live systems, arte en espacio | **Real-time AI** / **Installation Art** |
| `sound/` | Escultura láser, síntesis, instalación sonora | **Sound Sculpture** |
| `experiments/` | Pruebas, R&D, lo que no encaja | 3D Generative |

## Estructura (igual que proyectos)

```
public/collections/
  ai-content/
    index/
      01.jpg
      02.webp
  generative-video/
    index/
      ...
```

## Después de añadir fotos

```bash
npm run collections:optimize
npm run projects:sync
```

`collections:optimize` convierte todo a `01.webp`, `02.webp`… (max 1400px) y mueve los originales pesados a `_source/` (no se suben a la web).

## ¿Proyecto o colección?

| Situación | Carpeta |
|-----------|---------|
| Foto de **Biointerface** específica | `projects/biointerface/index/` |
| Foto tuya de **AI / generativo** sin un solo proyecto | `collections/ai-content/index/` |
| **Mapping** en varios sitios | `collections/projection-mapping/index/` |
| **Sonido / láser / Max·MSP** sin un solo proyecto | `collections/sound/index/` |

Puedes usar **las dos** a la vez.
