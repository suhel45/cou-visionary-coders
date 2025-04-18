
import { vi } from 'vitest';

export const getAuth = vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn((callback) => {
      callback(null);
      return vi.fn();
    }),
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
  }));
  
  export const GoogleAuthProvider = vi.fn();