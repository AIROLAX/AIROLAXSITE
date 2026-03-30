#!/usr/bin/env node

/**
 * 3D Model Optimization Script using glTF-Transform
 * Optimizes the logo GLB file with Draco compression and other optimizations
 * Cross-platform Node.js script
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_FILE = join(__dirname, '../../public/videos/andatalogo.glb');
const OUTPUT_FILE = join(__dirname, '../../public/videos/andatalogo_optimized.glb');

console.log('🎨 Starting 3D model optimization...');
console.log(`Input: ${INPUT_FILE}`);
console.log(`Output: ${OUTPUT_FILE}`);

// Check if input file exists
if (!existsSync(INPUT_FILE)) {
  console.error(`❌ Error: Input file not found at ${INPUT_FILE}`);
  process.exit(1);
}

try {
  // Get original file size
  const originalStats = statSync(INPUT_FILE);
  const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);
  console.log(`📦 Original file size: ${originalSizeMB} MB`);

  // Run glTF-Transform optimization
  console.log('⚙️  Running optimization...');
  execSync(
    `npx gltf-transform optimize "${INPUT_FILE}" "${OUTPUT_FILE}" --compress draco --texture-compress webp`,
    { stdio: 'inherit' }
  );

  // Check if output file was created
  if (existsSync(OUTPUT_FILE)) {
    const optimizedStats = statSync(OUTPUT_FILE);
    const optimizedSizeMB = (optimizedStats.size / (1024 * 1024)).toFixed(2);
    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
    
    console.log('\n✅ Model optimization completed successfully!');
    console.log('📊 File size comparison:');
    console.log(`   Original:  ${originalSizeMB} MB`);
    console.log(`   Optimized: ${optimizedSizeMB} MB`);
    console.log(`   Reduction:  ${reduction}%`);
  } else {
    console.error('❌ Error: Output file was not created');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error during optimization:', error.message);
  process.exit(1);
}

