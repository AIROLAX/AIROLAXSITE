import { defineConfig } from 'vite'

export default defineConfig({
  // Use relative base so assets work correctly on static hosts like cPanel
  base: './',
  server: {
    port: 3000,
    open: true
  },
  publicDir: 'public', // Public assets directory
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    minify: 'terser',
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['gsap'], // Split GSAP into separate chunk
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    },
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    chunkSizeWarningLimit: 600
  },
  optimizeDeps: {
    include: ['gsap']
  }
})
