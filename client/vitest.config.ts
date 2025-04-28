import { defineConfig } from 'vitest/config';

export default defineConfig({
 
  test: {
    setupFiles: './src/setupTests.ts',
    environment: 'jsdom', 
    globals: true,         
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      exclude: ['node_modules/**'],
      include: ['src/**/*.{ts,tsx}'],
    },
    server: {
      deps: {
        inline: ['firebase'],
      },
    },
  },
});
