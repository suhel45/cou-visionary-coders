import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import { AuthContext } from '../../Hooks/contextApi/UserContext';

const TestComponent = () => <div>Protected Route</div>;
const LoginComponent = () => <div>Login Page</div>;

describe('PrivateRoute', () => {
  const renderWithAuth = (authValue: any, initialRoute = '/protected') => {
    return render(
      <AuthContext.Provider value={authValue}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route element={<PrivateRoute />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );
  };

  it('should show loading message if initializing or loading is true', () => {
    renderWithAuth({ initializing: true, loading: false, user: null });

    expect(screen.getByText(/Loading authentication/i)).toBeInTheDocument();
  });

  it('should redirect to login if user is not authenticated', () => {
    renderWithAuth({ initializing: false, loading: false, user: null });

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  it('should render the protected component if user is authenticated', () => {
    renderWithAuth({
      initializing: false,
      loading: false,
      user: { name: 'Mahmoud' },
    });

    expect(screen.getByText(/Protected Route/i)).toBeInTheDocument();
  });

  it('should throw error if AuthContext is not provided', () => {
    // Suppress the error message from console
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>,
      ),
    ).toThrow('AuthContext is not provided');

    spy.mockRestore();
  });
});
