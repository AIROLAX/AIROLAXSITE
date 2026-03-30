import { readdir, mkdir } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import sharp from 'sharp';

// Configuration
const VIDEOS_DIR = './videos';
const OUTPUT_DIR = './images/optimized';
const COMPRESSED_SUFFIX = '_compressed';

// Image optimization settings
const WEBP_QUALITY = 85;
const JPEG_QUALITY = 85;
const PNG_QUALITY = 90;

/**
 * Recursively find all image files in a directory
 */
async function findImageFiles(dir, fileList = []) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip the optimized folder to avoid recompressing
        if (entry.name !== 'optimized') {
          await findImageFiles(fullPath, fileList);
        }
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        // Check if it's an image file (case-insensitive)
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          // Skip files that already have _compressed in the name
          if (!entry.name.includes(COMPRESSED_SUFFIX)) {
            fileList.push(fullPath);
          }
        }
      }
    }

    return fileList;
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
    return fileList;
  }
}

/**
 * Compress an image to WebP format
 */
async function compressToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`   ❌ WebP compression failed:`, error.message);
    return false;
  }
}

/**
 * Compress an image to optimized JPEG format
 */
async function compressToJPEG(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`   ❌ JPEG compression failed:`, error.message);
    return false;
  }
}

/**
 * Compress an image to optimized PNG format
 */
async function compressToPNG(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .png({ quality: PNG_QUALITY, compressionLevel: 9 })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`   ❌ PNG compression failed:`, error.message);
    return false;
  }
}

/**
 * Process a single image file
 */
async function processImage(inputPath) {
  const relativePath = inputPath.replace(/^\.\/videos\//, '');
  const ext = extname(inputPath).toLowerCase();
  const fileName = basename(inputPath, ext);
  const dir = dirname(relativePath);
  
  // Create output directory structure
  const outputDir = dir === '.' ? OUTPUT_DIR : join(OUTPUT_DIR, dir);
  await mkdir(outputDir, { recursive: true });
  
  const outputBase = join(outputDir, `${fileName}${COMPRESSED_SUFFIX}`);
  const webpPath = `${outputBase}.webp`;
  
  console.log(`\n🖼️  Processing: ${relativePath}`);
  console.log(`   📁 Output directory: ${outputDir}`);
  
  const results = {
    webp: false,
    original: false
  };
  
  // Always compress to WebP
  results.webp = await compressToWebP(inputPath, webpPath);
  if (results.webp) {
    console.log(`   ✅ WebP saved: ${webpPath}`);
  }
  
  // Also compress to optimized original format
  if (ext === '.jpg' || ext === '.jpeg') {
    const jpegPath = `${outputBase}.jpg`;
    results.original = await compressToJPEG(inputPath, jpegPath);
    if (results.original) {
      console.log(`   ✅ JPEG saved: ${jpegPath}`);
    }
  } else if (ext === '.png') {
    const pngPath = `${outputBase}.png`;
    results.original = await compressToPNG(inputPath, pngPath);
    if (results.original) {
      console.log(`   ✅ PNG saved: ${pngPath}`);
    }
  }
  
  return results;
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting image compression...\n');
  
  // Find all image files
  console.log(`📂 Scanning ${VIDEOS_DIR} for image files...\n`);
  const imageFiles = await findImageFiles(VIDEOS_DIR);
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  No image files found to compress.');
    return;
  }
  
  console.log(`📊 Found ${imageFiles.length} image file(s) to process.\n`);
  
  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true });
  
  // Process each image
  const stats = {
    total: imageFiles.length,
    webpSuccess: 0,
    webpFailed: 0,
    originalSuccess: 0,
    originalFailed: 0
  };
  
  for (const imagePath of imageFiles) {
    const results = await processImage(imagePath);
    
    if (results.webp) stats.webpSuccess++;
    else stats.webpFailed++;
    
    if (results.original) stats.originalSuccess++;
    else stats.originalFailed++;
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Compression Summary');
  console.log('='.repeat(50));
  console.log(`Total images processed: ${stats.total}`);
  console.log(`\nWebP:`);
  console.log(`  ✅ Successful: ${stats.webpSuccess}`);
  console.log(`  ❌ Failed: ${stats.webpFailed}`);
  console.log(`\nOriginal Format (JPEG/PNG):`);
  console.log(`  ✅ Successful: ${stats.originalSuccess}`);
  console.log(`  ❌ Failed: ${stats.originalFailed}`);
  console.log(`\n📁 Compressed images saved to: ${OUTPUT_DIR}`);
  console.log('='.repeat(50));
}

// Run the script
main().catch((error) => {
  if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('sharp')) {
    console.error('❌ Sharp library not found! Please install it:');
    console.error('   npm install sharp --save-dev');
  } else {
    console.error('❌ Fatal error:', error.message);
  }
  process.exit(1);
});
