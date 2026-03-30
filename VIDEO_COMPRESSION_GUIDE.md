# 🎬 Guía de Compresión de Videos - AIROLAX

## 📋 Paso 1: Instalar ffmpeg

### Windows (Tu caso):

**Opción A - Descarga Manual (Recomendado):**
1. Ve a: https://www.gyan.dev/ffmpeg/builds/
2. Descarga: `ffmpeg-release-essentials.zip`
3. Extrae el archivo ZIP
4. Copia la carpeta extraída a `C:\ffmpeg`
5. Añade a PATH:
   - Busca "Variables de entorno" en Windows
   - Edita "Path" en Variables del sistema
   - Añade: `C:\ffmpeg\bin`
   - Reinicia PowerShell/Terminal

**Opción B - Usando Chocolatey:**
```powershell
choco install ffmpeg
```

**Opción C - Usando winget:**
```powershell
winget install ffmpeg
```

### Verificar instalación:
```bash
ffmpeg -version
```

---

## 📋 Paso 2: Comprimir los Videos

Una vez que ffmpeg esté instalado:

```bash
node compress-videos.js
```

---

## ⚙️ Configuración de Compresión

El script usa estos ajustes para balance óptimo entre calidad y tamaño:

- **CRF: 28** - Factor de calidad (23 es default, 28 es buena compresión)
- **Preset: medium** - Balance entre velocidad y compresión
- **Max Width: 1920px** - Mantiene videos en Full HD o menos
- **Audio: 128kbps** - Calidad de audio suficiente

### Si quieres ajustar la compresión:

Edita `compress-videos.js` línea 38-45:

```javascript
const COMPRESSION_SETTINGS = {
  crf: 28,        // Menor = mejor calidad pero más pesado (18-28 recomendado)
  preset: 'medium', // 'fast', 'medium', 'slow' (slow = mejor compresión)
  audioBitrate: '128k',
  maxWidth: 1920  // Ancho máximo del video
};
```

---

## 📊 Reducción Esperada

- **Videos MOV/MP4 sin comprimir:** ~656 MB
- **Después de comprimir:** ~100-150 MB (60-80% reducción)
- **Calidad:** Casi imperceptible la diferencia

---

## 🎯 Después de Comprimir

1. **Revisa la calidad** en la carpeta `videos-compressed/`
2. **Si estás satisfecho:**
   - Haz backup de tus videos originales (opcional)
   - Borra la carpeta `videos/`
   - Renombra `videos-compressed/` a `videos/`
3. **Rebuild tu proyecto:**
   ```bash
   npm run build
   ```

---

## 🔧 Solución de Problemas

### "ffmpeg no se reconoce"
- Asegúrate de haberlo añadido al PATH
- Reinicia tu terminal/PowerShell
- Reinicia VS Code si lo usas

### "No videos found"
- Verifica que la carpeta `videos/` existe
- Verifica que hay archivos `.mp4`, `.MOV`, `.mkv`

### Compresión muy lenta
- Es normal, la compresión de video toma tiempo
- Para 656 MB puede tardar 30-60 minutos
- Puedes cambiar `preset: 'medium'` a `preset: 'fast'` para más velocidad

### Calidad muy baja
- Reduce el CRF (ejemplo: de 28 a 23)
- Valores más bajos = mejor calidad pero archivos más grandes

---

## 💡 Tips

1. **Prueba con un solo video primero** para ver la calidad
2. **Haz backup** de tus videos originales antes de borrarlos
3. **Compara tamaños** - la reducción debería ser 60-80%
4. **Verifica en móvil** - los videos comprimidos deberían verse bien

---

## 📞 Ayuda

Si tienes problemas, revisa:
- Que ffmpeg esté instalado: `ffmpeg -version`
- Que Node.js esté instalado: `node --version`
- Que estés en la carpeta correcta del proyecto




























