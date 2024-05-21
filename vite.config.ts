import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.tsx'),
    },
  },
  optimizeDeps: {
    include: ['bootstrap', 'vite', 'sass'],
  },
});
