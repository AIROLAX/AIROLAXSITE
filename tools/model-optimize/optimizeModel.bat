@echo off
REM 3D Model Optimization Script using glTF-Transform (Windows)
REM Optimizes the logo GLB file with Draco compression and other optimizations

set INPUT_FILE=..\..\public\videos\andatalogo.glb
set OUTPUT_FILE=..\..\public\videos\andatalogo_optimized.glb

echo 🎨 Starting 3D model optimization...
echo Input: %INPUT_FILE%
echo Output: %OUTPUT_FILE%

REM Check if input file exists
if not exist "%INPUT_FILE%" (
    echo ❌ Error: Input file not found at %INPUT_FILE%
    exit /b 1
)

REM Run glTF-Transform optimization
REM Note: --flatten, --prune, --weld, --simplify default to true, so we only specify what we need
call npx gltf-transform optimize "%INPUT_FILE%" "%OUTPUT_FILE%" --compress draco --texture-compress webp

if %ERRORLEVEL% EQU 0 (
    echo ✅ Model optimization completed successfully!
    echo 📊 Checking file sizes...
    
    if exist "%OUTPUT_FILE%" (
        echo Original and optimized files created successfully.
        echo Please check file sizes manually in Windows Explorer.
    )
) else (
    echo ❌ Error: Optimization failed
    exit /b 1
)

