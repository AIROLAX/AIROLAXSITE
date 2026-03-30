FINAL2402 - ZIP para cPanel
===========================

Para generar el ZIP listo para subir a cPanel (con todo para que no se rompa):

  1. Abre PowerShell en esta carpeta (AIROLAX).
  2. Ejecuta:

     .\crear-ZIP-CPANEL.ps1

  3. Se creará el archivo:
     "FINAL2402 LISTO PARA SUBIRLO A CPANEL CON TODO PARA QUE NO SE ROMPA Y PONERLO EN EL PUBLIC.zip"

  4. Sube ese ZIP a cPanel → File Manager → public_html → Extract.

El script hace:
- npm run build (genera index.html y assets actualizados)
- Copia dist + videos + images + work al ZIP
- Incluye LEEME-CPANEL.txt con instrucciones dentro del ZIP

Si PowerShell da error de ejecución, ejecuta primero:
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
