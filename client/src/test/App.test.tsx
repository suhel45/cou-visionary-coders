import { describe, it, expect } from 'vitest';
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

//   it('should render the SignUp page when navigating to "/signup"', async () => {
//     window.history.pushState({}, 'SignUp', '/signup');

//     render(
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <AuthProvider>
//             <App />
//           </AuthProvider>
//         </BrowserRouter>
//       </QueryClientProvider>
//     );

//     // Try using a more specific query like by role or test ID
//     await waitFor(() => screen.getByRole('heading', { name: /Create Account/i }));
//     expect(screen.getByRole('heading', { name: /Create Account/i })).toBeInTheDocument();
//   });

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
