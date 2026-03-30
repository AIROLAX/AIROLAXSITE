# Optimización del Video Hero (home.mp4)

## Estado Actual
- **Tamaño del archivo:** ~19 MB (19,047,837 bytes)
- **Ubicación:** `./videos/home.mp4`

## ¿Está pesado?
Sí, 19MB es un archivo relativamente grande para un video hero, especialmente en móviles. Sin embargo, es manejable si:
- Tienes buen hosting/CDN
- Los usuarios tienen conexión decente
- El video está optimizado (compresión)

## ¿Por qué se traba en local?
El servidor local de desarrollo (localhost:3000) no siempre carga videos grandes de forma eficiente. En producción con un buen servidor/CDN debería funcionar mejor.

## Recomendaciones para Optimización

### 1. **Comprimir el video** (RECOMENDADO)
Usa herramientas como:
- **FFmpeg** (gratis, línea de comandos):
  ```bash
  # Comprimir manteniendo calidad aceptable
  ffmpeg -i videos/home.mp4 -vcodec libx264 -crf 28 -preset slow -vf scale=1920:-2 videos/home-optimized.mp4
  
  # Versión más comprimida (menor calidad, menor tamaño)
  ffmpeg -i videos/home.mp4 -vcodec libx264 -crf 32 -preset slow -vf scale=1280:-2 videos/home-compressed.mp4
  ```
  
- **HandBrake** (interfaz gráfica, fácil de usar)
- **CloudConvert** (online, gratuito)

**Objetivo:** Reducir de 19MB a 5-8MB sin perder mucha calidad visual

### 2. **Usar múltiples calidades (responsive video)**
```html
<video>
  <source src="./videos/home-720p.mp4" media="(max-width: 768px)" type="video/mp4">
  <source src="./videos/home-1080p.mp4" media="(min-width: 769px)" type="video/mp4">
  <source src="./videos/home.mp4" type="video/mp4">
</video>
```

### 3. **Agregar formato WebM (más ligero)**
```html
<video>
  <source src="./videos/home.webm" type="video/webm">
  <source src="./videos/home.mp4" type="video/mp4">
</video>
```
WebM suele ser 30-50% más pequeño que MP4 con la misma calidad.

### 4. **Lazy loading progresivo** (ya implementado)
El video ya tiene `preload="auto"` y `loading="lazy"` que ayuda a cargar de forma progresiva.

### 5. **Usar un CDN**
Cuando subas a producción, usa un CDN como:
- Cloudflare
- AWS CloudFront
- Vercel/Netlify (incluyen CDN automático)

## Configuración Actual Aplicada
✅ `preload="auto"` - Carga progresiva
✅ `loading="lazy"` - Lazy loading
✅ `autoplay muted loop playsinline` - Autoplay optimizado
✅ Título cambiado a "AIROLAX"

## Acción Inmediata
1. **Comprime el video** con FFmpeg o HandBrake para reducir a 5-8MB
2. **Prueba en producción** - debería funcionar mejor que en local
3. **Considera crear una versión 720p para móviles**

## Nota
19MB puede tardar 2-5 segundos en cargar en conexiones promedio. Esto es aceptable para un hero, pero optimizarlo mejorará la experiencia.




