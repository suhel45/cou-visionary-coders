import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from '../../../components/forgotPassword/ForgotPassword';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

// Mock CommonButton component
vi.mock('../../utils/Button/CommonButton', () => ({
  default: (props: any) => (
    <button onClick={props.onClick} disabled={props.loading}>
      {props.loading ? 'Loading...' : props.label}
    </button>
  ),
}));

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Utility for rendering with routing context
const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe.skip('ForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with email input and submit button', () => {
    renderWithRouter(<ForgotPassword />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send reset link/i }),
    ).toBeInTheDocument();
  });

  it('shows validation error for empty email submission', async () => {
    renderWithRouter(<ForgotPassword />);
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    renderWithRouter(<ForgotPassword />);
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it('displays success message when API call succeeds', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: { message: 'Reset link sent successfully' },
    });

    renderWithRouter(<ForgotPassword />);
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(
      await screen.findByText(/reset link sent successfully/i),
    ).toBeInTheDocument();
  });

  it('displays error message when API call fails with message', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Email not found',
        },
      },
      isAxiosError: true,
    });

    renderWithRouter(<ForgotPassword />);
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'fail@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(await screen.findByText(/email not found/i)).toBeInTheDocument();
  });

  it('displays network error when no response from server', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      request: {},
      isAxiosError: true,
    });

    renderWithRouter(<ForgotPassword />);
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'network@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(
      await screen.findByText(/check your network connection/i),
    ).toBeInTheDocument();
  });

  it('displays fallback error for unknown issues', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Unexpected'));

    renderWithRouter(<ForgotPassword />);
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'unknown@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(
      await screen.findByText(/error sending reset link/i),
    ).toBeInTheDocument();
  });
});
