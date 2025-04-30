import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/Login';
import { AuthContext } from '../../Hooks/contextApi/UserContext';
import axios from 'axios';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
};
mockedAxios.post = vi.fn(() => Promise.resolve({ data: { success: true } }));

// Mock useAuth
const mockLoginUser = vi.fn();
const mockSignInWithGoogle = vi.fn();

const renderLogin = () =>
  render(
    <AuthContext.Provider
      value={{
        user: null,
        createUser: vi.fn(),
        loginUser: mockLoginUser,
        logOut: vi.fn(),
        updateUserProfile: vi.fn(),
        signInWithGoogle: mockSignInWithGoogle,
        loading: false,
        initializing: false,
        refreshUser: vi.fn(),
        isNewlyRegistered: false,
        deleteUser: vi.fn(),
      }}
    >
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthContext.Provider>,
  );

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.skip('renders the login form properly', () => {
    renderLogin();
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
    expect(screen.getByText(/Continue with Google/i)).toBeInTheDocument();
  });

  it('displays error if form is submitted without input', async () => {
    renderLogin();
    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it.skip('submits the form and handles login flow successfully', async () => {
    mockLoginUser.mockResolvedValue({
      user: {
        email: 'test@example.com',
      },
    });

    renderLogin();

    const emailInput = screen.getByLabelText(
      /Email address/i,
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '!test1234' } });

    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith(
        'test@example.com',
        'test1234',
      );
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`,
        { email: 'test@example.com', password: 'test1234' },
        { withCredentials: true },
      );
    });
  });

  it('shows error message if login fails', async () => {
    mockLoginUser.mockRejectedValue(new Error('Login failed'));

    renderLogin();

    const emailInput = screen.getByLabelText(
      /Email address/i,
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Incorrect email or password/i),
      ).toBeInTheDocument();
    });
  });

  it.skip('shows network error message if server is unreachable', async () => {
    mockedAxios.post.mockRejectedValueOnce({ request: {} });

    renderLogin();

    const emailInput = screen.getByLabelText(
      /Email address/i,
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test1234' } });

    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

    await waitFor(() => {
      // Use a more flexible matcher
      expect(
        screen.getByText((content) =>
          content.includes('No response from the server'),
        ),
      ).toBeInTheDocument();
    });
  });

  it.skip('shows generic error message if login fails for unknown reasons', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Unknown error'));

    renderLogin();

    const emailInput = screen.getByLabelText(
      /Email address/i,
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test1234' } });

    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Login Failed. Please try again later.'),
      ).toBeInTheDocument();
    });
  });

  it('handles Google Sign-In successfully', async () => {
    mockSignInWithGoogle.mockResolvedValue({
      user: {
        email: 'googleuser@example.com',
        displayName: 'Google User',
      },
    });

    renderLogin();

    fireEvent.click(screen.getByText(/Continue with Google/i));

    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled();
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login/google`,
        { email: 'googleuser@example.com', username: 'Google User' },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    });
  });

  it('shows error message if Google Sign-In fails', async () => {
    mockSignInWithGoogle.mockRejectedValue(new Error('Google login failed'));

    renderLogin();

    fireEvent.click(screen.getByText(/Continue with Google/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Google login failed. Try again./i),
      ).toBeInTheDocument();
    });
  });
});
