@echo off
cd /d "%~dp0"

echo.
echo  Iniciando servidor en esta carpeta...
echo  Se abrira otra ventana. NO LA CIERRES.
echo.

start "Servidor - no cerrar" cmd /k "cd /d %~dp0. && npm run dev"

echo  Esperando 10 segundos a que arranque...
timeout /t 10 /nobreak >nul

echo  Abriendo http://localhost:3000 en el navegador...
start http://localhost:3000

echo.
echo  Si sale "Connection Failed", espera 5 segundos mas y recarga con F5.
echo  La ventana "Servidor" debe seguir abierta.
echo.
pause
