# 🎯 Guía Rápida: Configurar Google Analytics 4

## 📍 Paso 1: Configurar el Data Stream (Flujo de Datos)

Estás en la pantalla de Google Analytics. Sigue estos pasos:

### 1. Haz clic en el botón azul "Web"
   - O haz clic en el botón rojo "Go to stream setup" arriba

### 2. Llena el formulario:
   - **Website URL**: `https://airolax.com` (o tu dominio)
   - **Stream name**: `AIROLAX Website` (o cualquier nombre que prefieras)
   - **Enhanced measurement**: ✅ Déjalo marcado (ayuda a rastrear eventos automáticamente)

### 3. Haz clic en "Create stream"

---

## 📍 Paso 2: Copiar tu Measurement ID

Después de crear el stream, verás:

1. Una pantalla con los detalles del stream
2. **Arriba verás tu "Measurement ID"** que se ve así: `G-XXXXXXXXXX`
   - Ejemplo: `G-ABC123DEF4`
   - Este es el código que necesitas

### ⚠️ IMPORTANTE: Copia este ID completo

---

## 📍 Paso 3: Actualizar tu código

Una vez que tengas tu Measurement ID:

1. Abre el archivo `index.html`
2. Busca estas líneas (alrededor de la línea 38-46):
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

3. Reemplaza `G-XXXXXXXXXX` (las dos veces) con tu Measurement ID real
   - Ejemplo: Si tu ID es `G-ABC123DEF4`, quedaría así:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-ABC123DEF4');
   </script>
   ```

4. Guarda el archivo

---

## 📍 Paso 4: Verificar que funciona

1. Sube los cambios a tu servidor
2. Visita tu sitio web
3. En Google Analytics, ve a "Reports" > "Realtime"
4. Deberías ver tu visita en tiempo real 🎉

---

## ✅ Listo!

Ahora Google Analytics estará:
- ✅ Rastreando todos los visitantes
- ✅ Mostrando ubicación geográfica
- ✅ Registrando páginas visitadas
- ✅ Mostrando dispositivos usados
- ✅ Y mucho más...

---

## 📊 Dónde ver tus estadísticas:

- **Visitantes diarios**: Reports > Acquisition > User acquisition
- **Ubicación geográfica**: Reports > Demographics > Demographics details > Geographic
- **Páginas más visitadas**: Reports > Engagement > Pages and screens
- **Tiempo real**: Reports > Realtime

---

## 🆘 ¿Problemas?

- **No veo datos**: Espera 24-48 horas para datos históricos (pero Realtime funciona de inmediato)
- **No encuentro el Measurement ID**: Está en la parte superior de la página de detalles del stream
- **El código no funciona**: Verifica que copiaste bien el ID (incluye el "G-" al inicio)

¿Necesitas ayuda con algún paso específico? 😊




