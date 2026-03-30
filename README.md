# AIROLAX — Interactive Portfolio

Portfolio minimalista con carrusel de videos inspirado en [duepinlac.ca](https://duepinlac.ca/).

## 🎯 Características

✨ **Diseño Minimal**
- Estética limpia: blanco/negro con acento rojo (#e60023)
- Tipografía: Inter + Space Grotesk
- Mobile-first y completamente responsive

🎬 **Carrusel de Videos**
- Auto-scroll suave hacia la izquierda
- Loop infinito sin saltos visuales
- Play/pause automático según visibilidad (IntersectionObserver)
- Lazy loading de videos
- Scroll-snap para navegación precisa

⚡ **Performance**
- Vite + TypeScript para desarrollo rápido
- Sin frameworks pesados (vanilla JS)
- Optimizado para Lighthouse móvil ≥90

♿ **Accesibilidad**
- Roles ARIA correctos
- Navegación por teclado (flechas)
- Focus visible
- Soporte para prefers-reduced-motion

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura

```
AIROLAX/
├── index.html          # Estructura HTML semántica
├── src/
│   ├── main.ts         # Lógica del carrusel y interacciones
│   └── styles.css      # Diseño minimal
├── videos/             # Carpeta para tus videos
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Personalización

### 1. Agregar tus proyectos

Edita el array `projects` en `src/main.ts`:

```typescript
const projects: Project[] = [
  {
    id: '1',
    title: 'Tu Proyecto',
    tag: 'Categoría',
    videoUrl: 'videos/tu-video.mp4',  // o URL externa
    poster: 'images/poster.jpg'        // thumbnail
  },
  // ... más proyectos
];
```

### 2. Optimizar videos

**Especificaciones recomendadas:**
- Formato: MP4 (H.264)
- Resolución: 1280×720px (16:9)
- Duración: 5-15 segundos
- Peso: < 3MB por video
- Codec: H.264, Bitrate: 2-3 Mbps

**Herramientas para comprimir:**
```bash
# Con FFmpeg
ffmpeg -i input.mov -c:v libx264 -crf 28 -preset slow -vf scale=1280:720 -an output.mp4
```

O usa: Handbrake, CloudConvert, o Adobe Media Encoder

### 3. Cambiar colores

Variables CSS en `src/styles.css`:

```css
:root {
  --bg: #ffffff;        /* Fondo */
  --fg: #111111;        /* Texto */
  --muted: #666666;     /* Texto secundario */
  --grid: #eeeeee;      /* Bordes */
  --accent: #e60023;    /* Acento (rojo) */
}
```

### 4. Modificar metadata del header

En `index.html`, línea 19:
```html
<span class="meta-item">BASED IN — TU CIUDAD</span>
```

## ⚙️ Configuración del Carrusel

En `src/main.ts`:

```typescript
const AUTO_SCROLL_SPEED = 0.15;  // Velocidad (px/ms)
const INACTIVITY_DELAY = 4000;   // Tiempo para reanudar (ms)
```

### Desactivar auto-scroll

Comenta estas líneas en `src/main.ts`:

```typescript
// requestAnimationFrame((timestamp) => {
//   lastFrameTime = timestamp;
//   autoScroll(timestamp);
// });
```

## 📱 Responsive

### Mobile (< 768px)
- Cards: 85vw de ancho
- Header: apilado verticalmente
- Controles: solo gestos táctiles

### Tablet (768px - 899px)
- Cards: 80vw

### Desktop (≥ 900px)
- Cards: 420px fijos
- Controles flotantes visibles
- Navegación por teclado

## 🔧 Solución de Problemas

### Los videos no se reproducen
1. Verifica que sean MP4 con codec H.264
2. Asegúrate de que tengan `muted` y `playsinline`
3. Algunos navegadores bloquean autoplay sin interacción

### El loop se ve entrecortado
- Aumenta el número de duplicados en `src/main.ts`
- Ajusta el threshold del loop infinito

### Performance lenta
- Comprime más los videos (< 2MB cada uno)
- Reduce la resolución a 720p
- Usa `poster` para pre-cargar thumbnails

## 🌐 Deployment

### Netlify (Recomendado)
```bash
npm run build
# Arrastra la carpeta 'dist' a netlify.com
```

### Vercel
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Sube el contenido de 'dist' a rama gh-pages
```

## 📊 Performance Tips

1. **Lazy loading**: Ya implementado con IntersectionObserver
2. **Preload**: Solo los primeros 2 videos
3. **Poster images**: Usa WebP comprimido
4. **CDN**: Sube videos a un CDN (Cloudflare, Bunny)

## ♿ Accesibilidad

- ✅ Navegación por teclado (←→)
- ✅ Roles ARIA en carrusel
- ✅ Focus visible
- ✅ Alt text en videos
- ✅ Reduced motion support
- ✅ High contrast mode

## 🛠️ Tech Stack

- **Vite** - Build tool
- **TypeScript** - Type safety
- **Vanilla JS** - Sin frameworks
- **CSS Variables** - Theming
- **IntersectionObserver** - Performance

## 📄 Licencia

© 2025 AIROLAX. All rights reserved.

---

**Creado con Vite + TypeScript**  
Mobile-first | Performante | Accesible
