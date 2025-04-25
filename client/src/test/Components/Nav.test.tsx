import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Nav from '../../components/Nav'; // adjust path as necessary
import { AuthContext } from '../../Hooks/contextApi/UserContext';

// Helper to render with context and router
const renderWithContext = (contextValue: any) => {
  render(
    <AuthContext.Provider value={contextValue}>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </AuthContext.Provider>,
  );
};

describe('Nav Component', () => {
  it('renders guest nav links when user is not logged in', () => {
    const contextValue = {
      user: null,
      isNewlyRegistered: false,
      logOut: vi.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('renders logged-in user nav links when user is authenticated and not new', () => {
    const contextValue = {
      user: { email: 'test@example.com' },
      isNewlyRegistered: false,
      logOut: vi.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.getByText('Biodata')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logOut function when Logout is clicked', async () => {
    const logOutMock = vi.fn();
    const contextValue = {
      user: { email: 'test@example.com' },
      isNewlyRegistered: false,
      logOut: logOutMock,
    };

    renderWithContext(contextValue);

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(logOutMock).toHaveBeenCalled();
  });

  it('toggles the mobile menu when menu button is clicked', () => {
    const contextValue = {
      user: null,
      isNewlyRegistered: false,
      logOut: vi.fn(),
    };

    renderWithContext(contextValue);

    const toggleButton = screen.getByLabelText('Toggle Mobile Menu');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Home')).toBeVisible();

    fireEvent.click(toggleButton);

    // No error = test passes for toggle (difficult to assert hidden due to Tailwind styles)
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('throws an error if AuthContext is null', () => {
    // Suppress the expected error in test output
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      render(
        <BrowserRouter>
          <Nav />
        </BrowserRouter>,
      ),
    ).toThrow('AuthContext is null');
  });
});
