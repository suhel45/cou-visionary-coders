import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Verify from '../../../../components/dashboard/verify/Verify';
import axios from 'axios';
// import { UploadCloud } from 'lucide-react';
// import Loading from '../../../../utils/Loading/Loading';

// Mock the axios module
vi.mock('axios');
const mockedAxios = axios as vi.Mocked<typeof axios>;

describe('Verify Component - File Upload', () => {
  const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock successful initial API calls
    mockedAxios.get.mockResolvedValueOnce({ data: { success: true } });
    mockedAxios.get.mockResolvedValueOnce({ data: { status: 'Not Submitted' } });
  });

  it('handles file selection and upload', async () => {
    render(<Verify />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('Upload Student ID Image')).toBeInTheDocument();
    });

    // Get the file input using testid
    const fileInput = screen.getByTestId('file-input');
    
    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    // Verify file is selected
    await waitFor(() => {
      expect(screen.getByText('Selected: test.png')).toBeInTheDocument();
    });

    // Mock the fetch call
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: true });

    // Click the submit button
    fireEvent.click(screen.getByText('Submit'));

    // Verify fetch was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/upload`,
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  it('shows file name after selection', async () => {
    render(<Verify />);

    await waitFor(() => {
      expect(screen.getByTestId('file-input')).toBeInTheDocument();
    });

    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(screen.getByText('Selected: test.png')).toBeInTheDocument();
    });
  });

  it('does not submit when no file is selected', async () => {
    render(<Verify />);

    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    global.fetch = vi.fn();
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });
});