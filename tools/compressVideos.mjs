import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, statSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const VIDEOS_DIR = join(__dirname, '..', 'videos');
const COMPRESSED_SUFFIX = '_compressed';

// Video compression settings - Moderate compression, good quality
const VIDEO_SETTINGS = {
  // CRF (Constant Rate Factor): 23 = good quality, smaller file
  // Lower = better quality but larger file (18-28 range)
  crf: 23,
  
  // Preset: balance between compression speed and file size
  // Options: ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow
  preset: 'medium',
  
  // Codec
  codec: 'libx264',
  
  // Audio codec
  audioCodec: 'aac',
  audioBitrate: '128k',
  
  // Additional optimizations
  pixelFormat: 'yuv420p', // Compatibility
  movFlags: '+faststart', // Web optimization - allows progressive download
  tune: 'film' // Good for cinematic content
};

/**
 * Compress a single video file
 */
async function compressVideo(inputPath, outputPath) {
  const inputStats = statSync(inputPath);
  const inputSizeMB = (inputStats.size / (1024 * 1024)).toFixed(2);
  
  console.log(`\n📹 Compressing: ${basename(inputPath)}`);
  console.log(`   Original size: ${inputSizeMB} MB`);
  
  const ffmpegCommand = `ffmpeg -i "${inputPath}" ` +
    `-c:v ${VIDEO_SETTINGS.codec} ` +
    `-crf ${VIDEO_SETTINGS.crf} ` +
    `-preset ${VIDEO_SETTINGS.preset} ` +
    `-pix_fmt ${VIDEO_SETTINGS.pixelFormat} ` +
    `-movflags ${VIDEO_SETTINGS.movFlags} ` +
    `-tune ${VIDEO_SETTINGS.tune} ` +
    `-c:a ${VIDEO_SETTINGS.audioCodec} ` +
    `-b:a ${VIDEO_SETTINGS.audioBitrate} ` +
    `-y ` + // Overwrite output file
    `"${outputPath}"`;
  
  try {
    const { stdout, stderr } = await execAsync(ffmpegCommand);
    
    if (existsSync(outputPath)) {
      const outputStats = statSync(outputPath);
      const outputSizeMB = (outputStats.size / (1024 * 1024)).toFixed(2);
      const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
      
      console.log(`   ✅ Compressed size: ${outputSizeMB} MB`);
      console.log(`   📉 Size reduction: ${reduction}%`);
      
      return {
        success: true,
        originalSize: inputSizeMB,
        compressedSize: outputSizeMB,
        reduction: reduction
      };
    } else {
      console.error(`   ❌ Output file not created`);
      return { success: false };
    }
  } catch (error) {
    console.error(`   ❌ Error compressing video:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🎬 Video Compression Tool');
  console.log('========================\n');
  
  // Check if videos directory exists
  if (!existsSync(VIDEOS_DIR)) {
    console.error(`❌ Videos directory not found: ${VIDEOS_DIR}`);
    process.exit(1);
  }
  
  // Target: home.mp4
  const inputFile = join(VIDEOS_DIR, 'home.mp4');
  
  if (!existsSync(inputFile)) {
    console.error(`❌ Video file not found: ${inputFile}`);
    process.exit(1);
  }
  
  // Create output filename
  const ext = extname(inputFile);
  const baseName = basename(inputFile, ext);
  const outputFile = join(VIDEOS_DIR, `${baseName}${COMPRESSED_SUFFIX}${ext}`);
  
  // Compress the video
  const result = await compressVideo(inputFile, outputFile);
  
  if (result.success) {
    console.log('\n✅ Compression completed successfully!');
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Review the compressed video: ${outputFile}`);
    console.log(`   2. If quality is good, replace original:`);
    console.log(`      - Backup: mv videos/home.mp4 videos/home.mp4.backup`);
    console.log(`      - Replace: mv videos/home_compressed.mp4 videos/home.mp4`);
  } else {
    console.error('\n❌ Compression failed');
    process.exit(1);
  }
}

// Run
main().catch(console.error);



