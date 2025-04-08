// src/test/App.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a query client for testing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Helper to render App with necessary wrappers
function renderWithProviders(initialRoute: string = '/') {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('App Routing and Rendering', () => {
  it('renders home page by default', () => {
    renderWithProviders('/');
    expect(
      screen.getByText(/about us/i)
    ).toBeInTheDocument(); // Adjust this based on Home.tsx content
  });

  it('renders login page', () => {
    renderWithProviders('/login');
    expect(screen.getByText(/login/i)).toBeInTheDocument(); // Make sure login page has "Login" text
  });

  it('renders signup page', () => {
    renderWithProviders('/signup');
    expect(screen.getByText(/sign up/i)).toBeInTheDocument(); // Adjust as needed
  });

  it('shows 404 page for unknown routes', () => {
    renderWithProviders('/unknown-route');
    expect(screen.getByText(/page not found/i)).toBeInTheDocument(); // Based on PageNotFound component
  });
});
