import { vi, describe, it, expect, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import AuthProvider from '../Hooks/contextApi/UserContext';

// Mock Firebase completely
vi.mock('../../components/firebase/Firebase.config', () => ({
  auth: vi.fn(() => ({
    currentUser: null,
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
  })),
  // Add other Firebase services you use here
}));

vi.mock('../Hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('App Component', () => {
  beforeAll(() => {
    // Mock window.matchMedia which is not implemented in JSDOM
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('should render Home page on "/" route', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByText(/home/i));
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  it('should render Not Found page for invalid route', async () => {
    window.history.pushState({}, 'NoMatch', '/invalid-route');

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByText(/page not found/i));
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
