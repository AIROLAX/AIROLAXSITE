@echo off
cd /d "%~dp0"
echo.
echo  Ejecutando: npm run dev
echo  Cuando veas "Local: http://localhost:3000" abre ese link en el navegador.
echo  Para parar el servidor cierra esta ventana.
echo.
npm run dev
pause
