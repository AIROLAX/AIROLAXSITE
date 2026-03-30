# 🚀 QUICK START

## Ver el Portfolio

El servidor de desarrollo debería estar corriendo en:
**http://localhost:3000**

Si no está abierto, ejecuta:
```bash
npm run dev
```

## 📝 Pasos Siguientes

### 1. Reemplaza los Videos de Ejemplo

Los videos actuales son de ejemplo. Agrega los tuyos:

```
AIROLAX/
└── videos/
    ├── project-1.mp4
    ├── project-2.mp4
    └── project-3.mp4
```

Luego actualiza en `src/main.ts`:
```typescript
{
  id: '1',
  title: 'Tu Proyecto',
  tag: 'Categoría',
  videoUrl: 'videos/project-1.mp4',
  poster: 'images/thumb-1.jpg'
}
```

### 2. Optimiza Videos

**Especificaciones:**
- Formato: MP4 (H.264)
- Resolución: 1280×720px
- Duración: 5-15 seg
- Peso: < 3MB

**Comando FFmpeg:**
```bash
ffmpeg -i input.mov -c:v libx264 -crf 28 -preset slow -vf scale=1280:720 -an output.mp4
```

### 3. Personaliza Metadata

**Header:**
- Línea 19 en `index.html`: Cambia "MEXICO" por tu ubicación

**Footer:**
- Línea 69-71 en `index.html`: Agrega tus links

### 4. Ajusta Colores (Opcional)

En `src/styles.css`:
```css
:root {
  --accent: #e60023;  /* Cambia el rojo */
}
```

## ✨ Características del Carrusel

### Navegación
- **Touch/Drag**: Desliza horizontalmente
- **Teclado**: ← → (flechas)
- **Botones**: Aparecen al hacer hover (desktop)
- **Dots**: Click para saltar a proyecto

### Auto-Scroll
- Se mueve solo hacia la izquierda
- Pausa al interactuar
- Reanuda después de 4 segundos

### Videos
- Play automático cuando están visibles (≥60%)
- Pause cuando salen de vista
- Lazy loading (solo cargan al acercarse)

## 🛠️ Comandos

```bash
# Desarrollo
npm run dev        # Puerto 3000

# Build producción
npm run build      # Output: dist/

# Preview build
npm run preview    # Puerto 4173
```

## 📱 Prueba en Mobile

1. En tu terminal, busca la IP local:
   ```
   Network: http://192.168.x.x:3000
   ```

2. Abre esa URL en tu teléfono (misma red WiFi)

3. O usa DevTools:
   - F12 → Toggle device toolbar
   - Selecciona iPhone/Android

## 🎯 Checklist Pre-Launch

- [ ] Videos optimizados (< 3MB cada uno)
- [ ] Metadata actualizada (BASED IN, email, links)
- [ ] Títulos y tags de proyectos actualizados
- [ ] Testeado en mobile real
- [ ] Build de producción funciona (`npm run build`)

## 🐛 Troubleshooting

### Videos no reproducen
✅ Asegúrate que sean MP4 con H.264  
✅ Verifica que tengan `muted` y `playsinline`

### Carrusel se traba
✅ Reduce peso de videos  
✅ Verifica que no haya errores en consola (F12)

### Port 3000 ocupado
```bash
npm run dev -- --port 3001
```

## 📤 Deploy

### Netlify (Más fácil)
1. `npm run build`
2. Arrastra carpeta `dist/` a netlify.com
3. Listo!

### Vercel
```bash
npm run build
npx vercel --prod
```

---

¿Dudas? Revisa el `README.md` completo 📖
