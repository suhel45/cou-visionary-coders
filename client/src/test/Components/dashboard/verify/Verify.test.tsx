import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Verify from '../../../../components/dashboard/verify/Verify';
import axios from 'axios';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as unknown as {
  get: (url: string, config?: any) => Promise<any>;
};

// Set up fake environment variable
vi.stubEnv('VITE_BACKEND_BASE_URL', 'https://fake-backend.com');

describe('Verify Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading initially and then shows verification info', async () => {
    mockedAxios.get = vi
      .fn()
      // Mock biodata
      .mockResolvedValueOnce({
        data: { success: true },
      })
      // Mock ID status
      .mockResolvedValueOnce({
        data: { status: 'Approved' },
      });

    render(<Verify />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Profile Verification')).toBeInTheDocument();
    });

    // Check text from verified state
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('displays "Not Submitted" when ID status is not submitted and allows file upload simulation', async () => {
    mockedAxios.get = vi
      .fn()
      .mockResolvedValueOnce({ data: { success: true } })
      .mockResolvedValueOnce({ data: { status: 'Not Submitted' } });

    render(<Verify />);

    await screen.findByText('Profile Verification');

    expect(screen.getByText('Not Submitted')).toBeInTheDocument();

    const file = new File(['test'], 'student-id.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload student id image/i);

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText(/Selected: student-id.png/i)).toBeInTheDocument();

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
  });

  it('displays "Not Verified" when ID is Pending and biodata is false', async () => {
    mockedAxios.get = vi
      .fn()
      .mockResolvedValueOnce({ data: { success: false } })
      .mockResolvedValueOnce({ data: { status: 'Pending' } });

    render(<Verify />);

    await screen.findByText('Profile Verification');

    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Not Created')).toBeInTheDocument();
    expect(screen.getByText('Not Verified')).toBeInTheDocument();
  });
});
