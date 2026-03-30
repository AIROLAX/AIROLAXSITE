/**
 * Video Compression Script for AIROLAX Portfolio
 * 
 * This script compresses all videos in the project to reduce file size
 * while maintaining good visual quality.
 * 
 * REQUIREMENTS:
 * 1. Install ffmpeg first:
 *    - Windows: Download from https://www.gyan.dev/ffmpeg/builds/
 *      Or use Chocolatey: choco install ffmpeg
 *    - Mac: brew install ffmpeg
 *    - Linux: sudo apt install ffmpeg
 * 
 * 2. Run this script: node compress-videos.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const VIDEO_DIRS = [
  'videos',
  'videos/BIOINTERFACE',
  'videos/edzna',
  'videos/museo',
  'videos/OHM',
  'videos/wavey'
];

const OUTPUT_DIR = 'videos-compressed';
const VIDEO_EXTENSIONS = ['.mp4', '.MP4', '.MOV', '.mov', '.mkv'];

// Compression settings
const COMPRESSION_SETTINGS = {
  // CRF (Constant Rate Factor): 23 is default, 28 is good balance
  crf: 28,
  // Preset: slower = better compression but takes longer
  preset: 'medium',
  // Audio bitrate
  audioBitrate: '128k',
  // Max width (maintains aspect ratio)
  maxWidth: 1920
};

console.log('🎬 AIROLAX Video Compression Tool\n');
console.log('================================================\n');

// Check if ffmpeg is installed
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    console.log('✅ ffmpeg is installed\n');
    return true;
  } catch (error) {
    console.log('❌ ffmpeg is NOT installed\n');
    console.log('📥 Please install ffmpeg first:');
    console.log('   Windows: https://www.gyan.dev/ffmpeg/builds/');
    console.log('   Or use Chocolatey: choco install ffmpeg');
    console.log('   Mac: brew install ffmpeg');
    console.log('   Linux: sudo apt install ffmpeg\n');
    return false;
  }
}

// Get all video files
function getVideoFiles() {
  const videos = [];
  
  VIDEO_DIRS.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Directory not found: ${dir}`);
      return;
    }
    
    const files = fs.readdirSync(fullPath);
    
    files.forEach(file => {
      const ext = path.extname(file);
      if (VIDEO_EXTENSIONS.includes(ext)) {
        videos.push({
          input: path.join(fullPath, file),
          output: path.join(process.cwd(), OUTPUT_DIR, dir, file.replace(/\.(MOV|mkv)$/i, '.mp4')),
          name: file,
          dir: dir
        });
      }
    });
  });
  
  return videos;
}

// Get file size in MB
function getFileSizeMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

// Compress a single video
function compressVideo(video, index, total) {
  console.log(`\n[${index + 1}/${total}] Compressing: ${video.name}`);
  console.log(`    Directory: ${video.dir}`);
  
  const inputSize = getFileSizeMB(video.input);
  console.log(`    Original size: ${inputSize} MB`);
  
  // Create output directory if it doesn't exist
  const outputDir = path.dirname(video.output);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Build ffmpeg command
  const command = `ffmpeg -i "${video.input}" -c:v libx264 -crf ${COMPRESSION_SETTINGS.crf} -preset ${COMPRESSION_SETTINGS.preset} -vf "scale='min(${COMPRESSION_SETTINGS.maxWidth},iw)':'-2'" -c:a aac -b:a ${COMPRESSION_SETTINGS.audioBitrate} -movflags +faststart "${video.output}" -y`;
  
  try {
    console.log('    Compressing... (this may take a while)');
    execSync(command, { stdio: 'ignore' });
    
    const outputSize = getFileSizeMB(video.output);
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);
    
    console.log(`    ✅ Compressed: ${outputSize} MB`);
    console.log(`    💾 Reduction: ${reduction}%`);
    
    return {
      success: true,
      inputSize: parseFloat(inputSize),
      outputSize: parseFloat(outputSize)
    };
  } catch (error) {
    console.log(`    ❌ Error compressing video`);
    console.error(error.message);
    return {
      success: false,
      inputSize: parseFloat(inputSize),
      outputSize: 0
    };
  }
}

// Main function
function main() {
  // Check ffmpeg
  if (!checkFFmpeg()) {
    process.exit(1);
  }
  
  // Get all videos
  const videos = getVideoFiles();
  
  if (videos.length === 0) {
    console.log('❌ No videos found in the specified directories');
    process.exit(1);
  }
  
  console.log(`📹 Found ${videos.length} videos to compress\n`);
  console.log('Settings:');
  console.log(`  - CRF: ${COMPRESSION_SETTINGS.crf} (lower = better quality, larger file)`);
  console.log(`  - Preset: ${COMPRESSION_SETTINGS.preset}`);
  console.log(`  - Max width: ${COMPRESSION_SETTINGS.maxWidth}px`);
  console.log(`  - Audio bitrate: ${COMPRESSION_SETTINGS.audioBitrate}`);
  console.log('\n================================================\n');
  
  const startTime = Date.now();
  const results = [];
  
  // Compress each video
  videos.forEach((video, index) => {
    const result = compressVideo(video, index, videos.length);
    results.push(result);
  });
  
  // Summary
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000 / 60).toFixed(1);
  
  const successful = results.filter(r => r.success).length;
  const totalInputSize = results.reduce((sum, r) => sum + r.inputSize, 0);
  const totalOutputSize = results.reduce((sum, r) => sum + r.outputSize, 0);
  const totalReduction = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(1);
  
  console.log('\n================================================\n');
  console.log('📊 COMPRESSION SUMMARY\n');
  console.log(`✅ Successfully compressed: ${successful}/${videos.length} videos`);
  console.log(`📦 Total input size: ${totalInputSize.toFixed(2)} MB`);
  console.log(`📦 Total output size: ${totalOutputSize.toFixed(2)} MB`);
  console.log(`💾 Total size reduction: ${totalReduction}%`);
  console.log(`⏱️  Total time: ${duration} minutes\n`);
  
  console.log('📁 Compressed videos are in: ./' + OUTPUT_DIR);
  console.log('\n🎯 Next steps:');
  console.log('   1. Check the compressed videos in: ' + OUTPUT_DIR);
  console.log('   2. If quality is good, replace the original videos');
  console.log('   3. Delete the original large videos');
  console.log('   4. Rename ' + OUTPUT_DIR + ' to "videos"\n');
}

// Run the script
main();

