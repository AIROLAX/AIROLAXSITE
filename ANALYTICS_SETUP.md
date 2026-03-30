# 📊 Sistema de Analytics y Captura de Emails - AIROLAX

## 🎯 Soluciones Implementadas

### 1. **Google Analytics 4 (GA4)** ✅
- **Qué hace**: Rastrea visitantes, ubicación geográfica, páginas visitadas, tiempo en sitio, dispositivos, etc.
- **Dashboard**: Acceso gratuito en analytics.google.com
- **Datos que verás**:
  - Visitantes por día/semana/mes
  - Ubicación geográfica (país, ciudad)
  - Dispositivos (móvil, desktop)
  - Páginas más visitadas
  - Tiempo promedio en el sitio
  - Fuente de tráfico

### 2. **Formulario de Contacto con Captura de Email** ✅
- Formulario integrado en el footer
- Captura: nombre, email, mensaje
- Validación de campos
- Envío automático a tu email

### 3. **EmailJS - Envío Automático de Emails** ✅
- **Qué hace**: Envía automáticamente los formularios a tu email
- **Gratis hasta**: 200 emails/mes
- **No requiere backend**: Todo desde el frontend

---

## 🚀 Configuración Rápida

### Paso 1: Google Analytics

1. **Crear cuenta en Google Analytics**:
   - Ve a https://analytics.google.com
   - Crea una cuenta
   - Crea una propiedad (nombre: "AIROLAX Website")
   - Copia tu **Measurement ID** (formato: `G-XXXXXXXXXX`)

2. **Agregar el ID al sitio**:
   - Ya está configurado en `index.html`
   - Solo reemplaza `G-XXXXXXXXXX` con tu ID real

3. **Ver estadísticas**:
   - Ve a analytics.google.com
   - Dashboard con todas las estadísticas en tiempo real

### Paso 2: EmailJS (Envío de Emails)

1. **Crear cuenta**:
   - Ve a https://www.emailjs.com
   - Registro gratuito
   - 200 emails/mes gratis

2. **Configurar servicio de email**:
   - Conecta Gmail o cualquier email
   - Crea un template de email

3. **Obtener credenciales**:
   - Public Key
   - Service ID
   - Template ID

4. **Configurar en el sitio**:
   - Ya está listo en el código
   - Solo agrega tus credenciales en `src/main.ts`

---

## 📧 Otras Opciones de Dashboard

### Opción A: Google Analytics Dashboard (Recomendado - GRATIS)
- ✅ Visitas diarias
- ✅ Ubicación geográfica
- ✅ Dispositivos
- ✅ Páginas más visitadas
- ✅ Tiempo en sitio
- **Dashboard**: analytics.google.com

### Opción B: Cloudflare Analytics (Ya lo tienes configurado)
- ✅ Ya está en tu código
- ✅ Solo necesitas agregar tu token
- **Dashboard**: dashboard.cloudflare.com

### Opción C: Dashboard Personalizado (Requiere desarrollo)
- Crear página `/admin` con contraseña
- Conectar con Google Analytics API
- Ver estadísticas personalizadas

---

## 📝 Captura de Emails - Opciones

### Opción 1: EmailJS (Ya implementado) ✅
- **Gratis**: 200 emails/mes
- **Fácil de configurar**
- Envía emails automáticamente

### Opción 2: Formspree
- **Gratis**: 50 submissions/mes
- **Muy simple**: Solo agrega endpoint

### Opción 3: Mailchimp (Newsletter)
- **Gratis**: hasta 500 contactos
- Para listas de email marketing

### Opción 4: Netlify Forms
- Si hosteas en Netlify
- Gratis e ilimitado

---

## 🔐 Dashboard Privado (Opcional)

Si quieres una página `/admin` privada para ver estadísticas:

1. Página con contraseña simple
2. Google Analytics embebido
3. Lista de emails capturados
4. Estadísticas básicas

**¿Quieres que lo implemente?** Puedo crear una página admin simple con contraseña.

---

## 📊 Qué Verás en Google Analytics

1. **Audiencia**:
   - Usuarios por día/semana/mes
   - Nuevos vs. recurrentes
   - Ubicación (mapa mundial)
   - Edad y género
   - Intereses

2. **Adquisición**:
   - De dónde vienen (Google, directo, redes sociales)
   - Campañas

3. **Comportamiento**:
   - Páginas más visitadas
   - Flujo de navegación
   - Tiempo en página

4. **Tiempo Real**:
   - Quién está en el sitio ahora
   - Páginas activas

---

## 🎯 Próximos Pasos

1. ✅ Configurar Google Analytics (5 minutos)
2. ✅ Configurar EmailJS (10 minutos)
3. ⏳ Opcional: Crear dashboard admin personalizado

---

## 💡 Recomendaciones

- **Para analytics**: Google Analytics 4 (gratis, completo)
- **Para emails**: EmailJS (fácil, gratuito hasta 200/mes)
- **Para newsletter**: Mailchimp (si quieres marketing por email)

¿Quieres que implemente alguna de estas opciones ahora?




