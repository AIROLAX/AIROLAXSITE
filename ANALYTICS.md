# Analytics sencillo — AIROLAX

Tienes **dos formas** de ver visitas: una **nativa** en tu propio sitio y opcionalmente Google Analytics.

---

## Analytics nativo (en tu sitio)

Cada visita se guarda en tu servidor. Para ver las estadísticas:

1. **Abre en el navegador:**  
   `https://tudominio.com/analytics.php?k=airolax2025`

2. Verás el **total de vistas** y **visitas por página** (inicio, cada proyecto, etc.).

3. **Cambiar la clave:** edita el archivo `analytics.php` en el servidor (o en `public/analytics.php` antes de subir) y cambia la línea:  
   `$CLAVE = 'airolax2025';`  
   por tu propia clave. Luego usa esa misma clave en la URL: `?k=TU_CLAVE`.

**Requisito:** el hosting debe soportar **PHP** (cPanel lo tiene por defecto). Los archivos `api/hit.php`, `data/` y `analytics.php` van en la raíz del deploy junto con el resto del sitio.

---

## Google Analytics 4 (opcional)

1. **Entra al informe**
   - Ve a: **https://analytics.google.com**
   - Inicia sesión con la cuenta donde está la propiedad **G-RWP8TWF8QX**.

2. **Métricas más útiles (vistas rápidas)**
   - **Informes → Interacción → Páginas y pantallas**: qué páginas ven (inicio, work/biointerface, etc.).
   - **Informes → Adquisición → Tráfico de usuarios**: de dónde llegan (Google, directo, redes).
   - **Informes → Tiempo real**: quién está ahora en el sitio.

3. **Dónde está el ID**
   - En el código: `G-RWP8TWF8QX` (en `index.html` y en cada `work/*.html`).
   - Para cambiar de cuenta/propiedad, sustituye ese ID en todos los archivos donde aparezca.

## Opcional: Cloudflare Web Analytics (muy simple)

Si usas **Cloudflare** para el dominio:

1. En el panel de Cloudflare: **Web Analytics** → crea un sitio y copia el **Beacon Token**.
2. En `index.html` sustituye el placeholder del script de Cloudflare:
   - Busca: `REEMPLAZA_CON_TU_TOKEN_DE_CLOUDFLARE`
   - Pon ahí tu token. Si no usas Cloudflare, puedes dejar comentado o borrar ese bloque.

Así tendrás un segundo dashboard muy simple (visitas, páginas, países) sin cookies.

## Resumen

| Dónde ver        | Qué ver                         |
|------------------|----------------------------------|
| analytics.google.com | Visitas, páginas, origen, tiempo real (GA4) |
| Cloudflare (opcional) | Visitas y países (si añades tu token)       |

No hace falta instalar extensiones: todo se ve desde el navegador en **analytics.google.com**.
