# AIROLAX Video Compression Script (PowerShell)
# Requires: ffmpeg installed and in PATH

Write-Host "🎬 AIROLAX Video Compression Tool" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

# Check if ffmpeg is installed
try {
    $ffmpegVersion = ffmpeg -version 2>&1 | Select-Object -First 1
    Write-Host "✅ ffmpeg is installed" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ ffmpeg is NOT installed`n" -ForegroundColor Red
    Write-Host "📥 Please install ffmpeg first:" -ForegroundColor Yellow
    Write-Host "   1. Download from: https://www.gyan.dev/ffmpeg/builds/"
    Write-Host "   2. Or use: winget install ffmpeg"
    Write-Host "   3. Or use: choco install ffmpeg`n"
    exit 1
}

# Configuration
$VIDEO_DIRS = @(
    "videos",
    "videos\BIOINTERFACE",
    "videos\edzna",
    "videos\museo",
    "videos\OHM",
    "videos\wavey"
)

$OUTPUT_DIR = "videos-compressed"
$VIDEO_EXTENSIONS = @(".mp4", ".MP4", ".MOV", ".mov", ".mkv")

# Compression settings
$CRF = 28
$PRESET = "medium"
$AUDIO_BITRATE = "128k"
$MAX_WIDTH = 1920

# Create output directory
if (-not (Test-Path $OUTPUT_DIR)) {
    New-Item -ItemType Directory -Path $OUTPUT_DIR | Out-Null
}

# Get all videos
$videos = @()
foreach ($dir in $VIDEO_DIRS) {
    if (Test-Path $dir) {
        Get-ChildItem -Path $dir -File | Where-Object {
            $VIDEO_EXTENSIONS -contains $_.Extension
        } | ForEach-Object {
            $videos += @{
                Input = $_.FullName
                Output = Join-Path $OUTPUT_DIR $dir ($_.BaseName + ".mp4")
                Name = $_.Name
                Dir = $dir
            }
        }
    }
}

if ($videos.Count -eq 0) {
    Write-Host "❌ No videos found" -ForegroundColor Red
    exit 1
}

Write-Host "📹 Found $($videos.Count) videos to compress`n" -ForegroundColor Green
Write-Host "Settings:"
Write-Host "  - CRF: $CRF"
Write-Host "  - Preset: $PRESET"
Write-Host "  - Max width: ${MAX_WIDTH}px"
Write-Host "  - Audio bitrate: $AUDIO_BITRATE"
Write-Host "`n================================================`n"

$startTime = Get-Date
$totalInputSize = 0
$totalOutputSize = 0
$successCount = 0

# Compress each video
for ($i = 0; $i -lt $videos.Count; $i++) {
    $video = $videos[$i]
    Write-Host "[$(($i+1))/$($videos.Count)] Compressing: $($video.Name)" -ForegroundColor Cyan
    Write-Host "    Directory: $($video.Dir)"
    
    $inputSize = (Get-Item $video.Input).Length / 1MB
    $totalInputSize += $inputSize
    Write-Host "    Original size: $([math]::Round($inputSize, 2)) MB"
    
    # Create output directory
    $outputDir = Split-Path $video.Output
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
    
    # Compress video
    Write-Host "    Compressing... (this may take a while)" -ForegroundColor Yellow
    
    $ffmpegCmd = "ffmpeg -i `"$($video.Input)`" -c:v libx264 -crf $CRF -preset $PRESET -vf `"scale='min($MAX_WIDTH,iw)':'-2'`" -c:a aac -b:a $AUDIO_BITRATE -movflags +faststart `"$($video.Output)`" -y"
    
    try {
        Invoke-Expression $ffmpegCmd 2>&1 | Out-Null
        
        if (Test-Path $video.Output) {
            $outputSize = (Get-Item $video.Output).Length / 1MB
            $totalOutputSize += $outputSize
            $reduction = [math]::Round((1 - $outputSize / $inputSize) * 100, 1)
            
            Write-Host "    ✅ Compressed: $([math]::Round($outputSize, 2)) MB" -ForegroundColor Green
            Write-Host "    💾 Reduction: $reduction%"
            $successCount++
        } else {
            Write-Host "    ❌ Error: Output file not created" -ForegroundColor Red
        }
    } catch {
        Write-Host "    ❌ Error compressing video" -ForegroundColor Red
        Write-Host "    $_" -ForegroundColor Red
    }
    
    Write-Host ""
}

$endTime = Get-Date
$duration = [math]::Round(($endTime - $startTime).TotalMinutes, 1)
$totalReduction = [math]::Round((1 - $totalOutputSize / $totalInputSize) * 100, 1)

Write-Host "================================================`n" -ForegroundColor Cyan
Write-Host "📊 COMPRESSION SUMMARY`n" -ForegroundColor Cyan
Write-Host "✅ Successfully compressed: $successCount/$($videos.Count) videos" -ForegroundColor Green
Write-Host "📦 Total input size: $([math]::Round($totalInputSize, 2)) MB"
Write-Host "📦 Total output size: $([math]::Round($totalOutputSize, 2)) MB"
Write-Host "💾 Total size reduction: $totalReduction%"
Write-Host "⏱️  Total time: $duration minutes`n"

Write-Host "📁 Compressed videos are in: .\$OUTPUT_DIR" -ForegroundColor Yellow
Write-Host "`n🎯 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Check the compressed videos in: $OUTPUT_DIR"
Write-Host "   2. If quality is good, replace the original videos"
Write-Host "   3. Delete the original large videos"
Write-Host "   4. Rename $OUTPUT_DIR to videos"
Write-Host ""

