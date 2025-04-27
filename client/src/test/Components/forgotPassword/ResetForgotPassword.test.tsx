import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResetForgotPassword from '../../../components/forgotPassword/ResetForgotPassword';
import axios from 'axios';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import PasswordInput from '../../../utils/passVisibilityToggle/PasswordInput';
import CommonButton from '../../../utils/Button/CommonButton';

// Mock CommonButton component
vi.mock('../../utils/Button/CommonButton', () => ({
  default: (props: any) => (
    <button onClick={props.onClick} disabled={props.loading}>
      {props.loading ? 'Loading...' : props.label}
    </button>
  ),
}));

// Mock PasswordInput component
vi.mock('../../utils/passVisibilityToggle/PasswordInput', () => ({
  default: (props: any) => (
    <input
      type="password"
      name={props.name}
      placeholder={props.label}
      onChange={props.onChange}
      value={props.value}
      aria-invalid={props.error}
    />
  ),
}));

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Utility for rendering with routing context
const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe.skip('ResetForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with password inputs and submit button', () => {
    renderWithRouter(<ResetForgotPassword />);
    expect(screen.getByPlaceholderText(/new password/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/confirm password/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reset password/i }),
    ).toBeInTheDocument();
  });

  it('shows validation error for mismatched passwords', async () => {
    renderWithRouter(<ResetForgotPassword />);
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'wrongpassword123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(/passwords do not match/i),
    ).toBeInTheDocument();
  });

  it('shows validation error for password length', async () => {
    renderWithRouter(<ResetForgotPassword />);
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(/password must be at least 8 characters/i),
    ).toBeInTheDocument();
  });

  it('shows success message when password reset is successful', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: { message: 'Password reset successfully' },
    });

    renderWithRouter(<ResetForgotPassword />);
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(/password reset successfully/i),
    ).toBeInTheDocument();
  });

  it('displays error message when API call fails with server error', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: 'Internal server error' } },
      isAxiosError: true,
    });

    renderWithRouter(<ResetForgotPassword />);
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(/internal server error/i),
    ).toBeInTheDocument();
  });

  it('displays error message when no response from server', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      request: {},
      isAxiosError: true,
    });

    renderWithRouter(<ResetForgotPassword />);
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(/check your network connection/i),
    ).toBeInTheDocument();
  });

  it('displays fallback error for unexpected issues', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Unexpected error'));

    renderWithRouter(<ResetForgotPassword />);
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(/error resetting password/i),
    ).toBeInTheDocument();
  });
});
