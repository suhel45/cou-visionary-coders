import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
    }),
    tailwindcss(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    proxy: {
      // Example:
      '/api': 'http://localhost:5173',
    },
  },
  build: {
    outDir: 'dist',  // Ensure output directory is set
  },
  test: {
    environment: 'jsdom', // for DOM testing
    globals: true,         // so you can use describe(), it(), expect() globally
    setupFiles: './src/setupTests.ts', // optional setup file
  },
});
