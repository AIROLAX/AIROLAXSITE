#!/bin/bash

# 3D Model Optimization Script using glTF-Transform
# Optimizes the logo GLB file with Draco compression and other optimizations

INPUT_FILE="../../public/videos/andatalogo.glb"
OUTPUT_FILE="../../public/videos/andatalogo_optimized.glb"

echo "🎨 Starting 3D model optimization..."
echo "Input: $INPUT_FILE"
echo "Output: $OUTPUT_FILE"

# Check if input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ Error: Input file not found at $INPUT_FILE"
    exit 1
fi

# Run glTF-Transform optimization
# Note: --flatten, --prune, --weld, --simplify default to true, so we only specify what we need
npx gltf-transform optimize "$INPUT_FILE" "$OUTPUT_FILE" \
    --compress draco \
    --texture-compress webp

if [ $? -eq 0 ]; then
    echo "✅ Model optimization completed successfully!"
    echo "📊 Checking file sizes..."
    
    if [ -f "$OUTPUT_FILE" ]; then
        INPUT_SIZE=$(du -h "$INPUT_FILE" | cut -f1)
        OUTPUT_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
        echo "Original size: $INPUT_SIZE"
        echo "Optimized size: $OUTPUT_SIZE"
    fi
else
    echo "❌ Error: Optimization failed"
    exit 1
fi

