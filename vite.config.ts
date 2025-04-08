import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 10240, // Only compress files larger than 10kb
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 10240,
    }),
  ],
  build: {
    // Reduce chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          utils: [
            './src/utils/areaCalculator.ts',
            './src/utils/dateCalculator.ts',
            './src/utils/percentageCalculator.ts',
            './src/utils/temperatureConverter.ts',
            './src/utils/timeCalculator.ts',
            './src/utils/unitConverter.ts',
          ],
        },
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    // Minify output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Ensure public directory is copied to dist
    copyPublicDir: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react'],
  },
  // Enable server compression
  server: {
    headers: {
      'Cache-Control': 'max-age=31536000',
    },
  },
});
