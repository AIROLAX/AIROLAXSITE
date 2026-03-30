# AIROLAX Video Compression Script
# Requires: ffmpeg installed

Write-Host "AIROLAX Video Compression Tool" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$OUTPUT_DIR = "videos-compressed"
$CRF = 28
$PRESET = "medium"
$AUDIO_BITRATE = "128k"
$MAX_WIDTH = 1920

# Create output directory
if (-not (Test-Path $OUTPUT_DIR)) {
    New-Item -ItemType Directory -Path $OUTPUT_DIR -Force | Out-Null
}

# Get all videos
$videos = @()
$videoDirs = @("videos", "videos\BIOINTERFACE", "videos\edzna", "videos\museo", "videos\OHM", "videos\wavey")
$extensions = @(".mp4", ".MP4", ".MOV", ".mov", ".mkv")

foreach ($dir in $videoDirs) {
    if (Test-Path $dir) {
        Get-ChildItem -Path $dir -File | Where-Object {
            $extensions -contains $_.Extension
        } | ForEach-Object {
            $outputPath = Join-Path -Path $OUTPUT_DIR -ChildPath $dir
            $outputFile = Join-Path -Path $outputPath -ChildPath ($_.BaseName + ".mp4")
            $videos += @{
                Input = $_.FullName
                Output = $outputFile
                Name = $_.Name
                Dir = $dir
            }
        }
    }
}

if ($videos.Count -eq 0) {
    Write-Host "No videos found" -ForegroundColor Red
    exit 1
}

Write-Host "Found $($videos.Count) videos to compress" -ForegroundColor Green
Write-Host ""
Write-Host "Settings: CRF=$CRF, Preset=$PRESET, MaxWidth=${MAX_WIDTH}px"
Write-Host ""
Write-Host "================================"
Write-Host ""

$startTime = Get-Date
$totalInputSize = 0
$totalOutputSize = 0
$successCount = 0

# Compress each video
for ($i = 0; $i -lt $videos.Count; $i++) {
    $video = $videos[$i]
    Write-Host "[$($i+1)/$($videos.Count)] $($video.Name)" -ForegroundColor Cyan
    Write-Host "    Directory: $($video.Dir)"
    
    $inputSize = (Get-Item $video.Input).Length / 1MB
    $totalInputSize += $inputSize
    Write-Host "    Original: $([math]::Round($inputSize, 2)) MB"
    
    # Create output directory
    $outputDir = Split-Path $video.Output
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
    
    Write-Host "    Compressing..." -ForegroundColor Yellow
    
    $ffmpegCmd = "ffmpeg -i `"$($video.Input)`" -c:v libx264 -crf $CRF -preset $PRESET -vf `"scale='min($MAX_WIDTH,iw)':'-2'`" -c:a aac -b:a $AUDIO_BITRATE -movflags +faststart `"$($video.Output)`" -y"
    
    try {
        Invoke-Expression $ffmpegCmd 2>&1 | Out-Null
        
        if (Test-Path $video.Output) {
            $outputSize = (Get-Item $video.Output).Length / 1MB
            $totalOutputSize += $outputSize
            $reduction = [math]::Round((1 - $outputSize / $inputSize) * 100, 1)
            
            Write-Host "    Compressed: $([math]::Round($outputSize, 2)) MB" -ForegroundColor Green
            Write-Host "    Reduction: $reduction%"
            $successCount++
        } else {
            Write-Host "    ERROR: Output file not created" -ForegroundColor Red
        }
    } catch {
        Write-Host "    ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

$endTime = Get-Date
$duration = [math]::Round(($endTime - $startTime).TotalMinutes, 1)
$totalReduction = [math]::Round((1 - $totalOutputSize / $totalInputSize) * 100, 1)

Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host ""
Write-Host "Successfully compressed: $successCount / $($videos.Count)" -ForegroundColor Green
Write-Host "Total input size: $([math]::Round($totalInputSize, 2)) MB"
Write-Host "Total output size: $([math]::Round($totalOutputSize, 2)) MB"
Write-Host "Total reduction: $totalReduction%"
Write-Host "Time: $duration minutes"
Write-Host ""
Write-Host "Compressed videos in: .\$OUTPUT_DIR" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Check quality in: $OUTPUT_DIR"
Write-Host "  2. If good, replace original videos"
Write-Host "  3. Rename $OUTPUT_DIR to videos"
Write-Host ""

