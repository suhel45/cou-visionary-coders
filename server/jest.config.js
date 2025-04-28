module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    setupFilesAfterEnv: ['./src/setup.ts'],
    coverageReporters: ['lcov', 'text'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/index.ts',
      '!src/**/__tests__/**',
      '!src/**/__mocks__/**',
    ],
  };