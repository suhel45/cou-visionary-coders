import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';
import React from 'react';

// Mock all child components to simplify testing
vi.mock('../components/Nav', () => ({
  default: () => <div data-testid="nav">Nav</div>,
}));

vi.mock('../shared/Footer/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock('../pages/Home/pages', () => ({
  default: () => <div>Home Page Content</div>,
}));

vi.mock('../components/ErrorComponent', () => ({
  default: () => <div>Page Not Found</div>,
}));

// Mock AuthProvider to avoid Firebase initialization
vi.mock('../Hooks/contextApi/UserContext', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock Toaster to avoid side effects
vi.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="toaster"></div>,
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks and reset DOM before each test
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });

  it('renders Home page on "/" route', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Home Page Content')).toBeInTheDocument();
    });
  });

  it('renders Not Found page for invalid route', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-route']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    });
  });

  it('renders all main layout components', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  describe('Route testing', () => {
    const renderWithRouter = (route: string) => {
      return render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={[route]}>
            <App />
          </MemoryRouter>
        </QueryClientProvider>
      );
    };

    it('renders Home component for /home route', async () => {
      renderWithRouter('/home');
      await waitFor(() => {
        expect(screen.getByText('Home Page Content')).toBeInTheDocument();
      });
    });

    it('renders 404 for unknown routes', async () => {
      renderWithRouter('/unknown-route');
      await waitFor(() => {
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
      });
    });
  });
});