import { vi,describe, it, expect } from 'vitest';

vi.mock('../../components/firebase/Firebase.config');
vi.mock('../Hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
  }),
}));
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import AuthProvider from '../Hooks/contextApi/UserContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('App Component', () => {
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
