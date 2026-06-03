# AIROLAX - Crear ZIP listo para cPanel / public_html (Todo Pro)
# Ejecutar en PowerShell desde la raíz del proyecto: .\crear-ZIP-CPANEL.ps1

$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot
$zipName = "AIROLAX-Sitio-Completo-Web.zip"
$stageFolder = Join-Path $projectRoot "AIROLAX_CPANEL_STAGE"

Write-Host "1. Building project (npm run build)..." -ForegroundColor Cyan
Set-Location $projectRoot
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed." }

Write-Host "2. Creating stage folder..." -ForegroundColor Cyan
if (Test-Path $stageFolder) { Remove-Item $stageFolder -Recurse -Force }
New-Item -ItemType Directory -Path $stageFolder | Out-Null

Write-Host "3. Copying dist (index.html, assets, api, data, analytics)..." -ForegroundColor Cyan
Copy-Item -Path (Join-Path $projectRoot "dist\*") -Destination $stageFolder -Recurse -Force

# El servidor (LiteSpeed) busca index.html (minúscula). Si hay Index.html viejo, el zip debe traer index.html para que se sirva.
# En la etapa dejamos index.html (minúscula); al extraer en cPanel debe quedar index.html en public_html.
Write-Host "4. Copying videos, videos-compressed, images, work (todo el media)..." -ForegroundColor Cyan
foreach ($dir in @("videos", "videos-compressed", "images", "work")) {
    $src = Join-Path $projectRoot $dir
    if (Test-Path $src) {
        $dest = Join-Path $stageFolder $dir
        if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }
        Copy-Item -Path "$src\*" -Destination $dest -Recurse -Force
    }
}

Write-Host "5. Adding .htaccess (UTF-8 + DirectoryIndex for LiteSpeed)..." -ForegroundColor Cyan
@(
  "AddDefaultCharset UTF-8"
  "DirectoryIndex index.html"
) | Set-Content (Join-Path $stageFolder ".htaccess") -Encoding ASCII

Write-Host "6. Adding LEEME..." -ForegroundColor Cyan
"Sube este ZIP a cPanel, extrae en public_html. Generado: $(Get-Date -Format "yyyy-MM-dd HH:mm")" | Set-Content (Join-Path $stageFolder "LEEME-CPANEL.txt") -Encoding UTF8

Write-Host "7. Creating ZIP..." -ForegroundColor Cyan

$zipPath = Join-Path $projectRoot $zipName
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path "$stageFolder\*" -DestinationPath $zipPath -CompressionLevel Optimal

Write-Host "8. Cleaning stage folder..." -ForegroundColor Cyan
Remove-Item $stageFolder -Recurse -Force

Write-Host ""
Write-Host "Listo. ZIP creado:" -ForegroundColor Green
Write-Host "  $zipPath" -ForegroundColor White
Write-Host ""
Write-Host "Sube este ZIP a cPanel y descomprímelo en public_html." -ForegroundColor Yellow
