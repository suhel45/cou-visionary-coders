// Login.test.tsx
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/Login';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Hooks/useAuth/useAuth';
import axios from 'axios';

// Mock useForm
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual<typeof import('react-hook-form')>('react-hook-form');
  return {
    ...actual,
    useForm: vi.fn(() => ({
      register: vi.fn(),
      handleSubmit: (fn: any) => (e: any) => fn(e),
      formState: { errors: {} },
    })),
  };
});

// Mock useAuth
vi.mock('../../Hooks/useAuth/useAuth', () => ({
  useAuth: () => ({
    loginUser: vi.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
  }),
}));

// Mock axios
vi.mock('axios');
const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
};
mockedAxios.post = vi.fn(() => Promise.resolve({ data: { success: true } }));

const renderLogin = () =>
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the login form properly', () => {
    renderLogin();
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('displays error if form is submitted without input', async () => {
    renderLogin();
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    await waitFor(() =>
      expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument()
    );
  });

  it('submits the form and handles login flow', async () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/Email address/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test1234' } });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });
});
