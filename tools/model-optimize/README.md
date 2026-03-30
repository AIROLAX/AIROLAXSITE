# 3D Model Optimization

This folder contains scripts to optimize the 3D logo model (`andatalogo.glb`) using glTF-Transform.

## Usage

### Using npm script (Recommended - Cross-platform)
```bash
npm run optimize:model
```

### Using scripts directly

**Windows:**
```bash
tools\model-optimize\optimizeModel.bat
```

**Linux/Mac:**
```bash
chmod +x tools/model-optimize/optimizeModel.sh
./tools/model-optimize/optimizeModel.sh
```

**Node.js (Cross-platform):**
```bash
node tools/model-optimize/optimizeModel.mjs
```

## What it does

The optimization script applies the following transformations (all enabled by default):

- **Draco compression**: Compresses geometry data (typically 50-80% reduction)
- **Texture compression**: Converts textures to WebP format
- **Prune**: Removes unused nodes, materials, and textures (enabled by default)
- **Weld**: Merges duplicate vertices (enabled by default)
- **Flatten**: Simplifies scene hierarchy (enabled by default)
- **Simplify**: Reduces polygon count where possible (enabled by default)

## Expected Results

Typical file size reductions:
- **Geometry compression (Draco)**: 50-80% reduction
- **Texture compression (WebP)**: 30-70% reduction (depending on original format)
- **Overall**: Expect 40-70% total file size reduction

**Example:**
- Original: 2.5 MB
- Optimized: ~0.75-1.5 MB (depending on model complexity)

## Output

The optimized model is saved as:
- `public/videos/andatalogo_optimized.glb`

The Three.js loader in `src/main.ts` has been updated to use the optimized version automatically.

## Notes

- The original file is preserved
- Visual appearance should remain identical
- Loading time will be significantly improved
- Mobile performance will be better due to smaller file size

