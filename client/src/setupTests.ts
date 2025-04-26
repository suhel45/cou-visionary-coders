import { vi,afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

vi.mock('firebase/auth');
vi.mock('firebase/app');


// Mock for MUI components
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
};

afterEach(() => {
  cleanup();
});
