import { describe, it, expect, vi } from 'vitest';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Mock the Firebase modules
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => 'mockedApp'),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => 'mockedAuth'),
}));

// Import the file after mocking
import { auth } from '../../../components/firebase/Firebase.config';

describe('Firebase Config', () => {
  it('should initialize Firebase app with correct config and return auth instance', () => {
    // Assert that Firebase was initialized
    expect(initializeApp).toHaveBeenCalled();

    // Assert that getAuth was called with the returned app
    expect(getAuth).toHaveBeenCalledWith('mockedApp');

    // Check if exported auth is what we mocked
    expect(auth).toBe('mockedAuth');
  });
});
