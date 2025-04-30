// Verify.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import Verify from '../../../../components/dashboard/verify/Verify';
import axios from 'axios';
// import { UploadCloud } from 'lucide-react';
// import Loading from '../../../../utils/Loading/Loading';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as vi.Mocked<typeof axios>;

// Mock child components
vi.mock('lucide-react', () => ({
  UploadCloud: () => <div>UploadCloud Icon</div>,
}));

vi.mock('../../../utils/Loading/Loading', () => ({
  default: () => <div>Loading...</div>,
}));

describe('Verify Component', () => {
  const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders loading state initially', () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));
    render(<Verify />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  describe('when biodata is not created', () => {
    beforeEach(() => {
      mockedAxios.get.mockImplementation((url) => {
        if (url.includes('biodata')) {
          return Promise.resolve({ data: { success: false } });
        }
        if (url.includes('identity/status')) {
          return Promise.resolve({ data: { status: 'Not Submitted' } });
        }
        return Promise.reject(new Error('Unexpected URL'));
      });
    });

    it('shows "Not Created" for biodata status', async () => {
      render(<Verify />);
      await waitFor(() => {
        expect(screen.getByText('Not Created')).toBeInTheDocument();
      });
    });

    it('shows "Not Verified" for verification status', async () => {
      render(<Verify />);
      await waitFor(() => {
        expect(screen.getByText('Not Verified')).toBeInTheDocument();
      });
    });
  });

  describe('when biodata is created', () => {
    beforeEach(() => {
      mockedAxios.get.mockImplementation((url) => {
        if (url.includes('biodata')) {
          return Promise.resolve({ data: { success: true } });
        }
        if (url.includes('identity/status')) {
          return Promise.resolve({ data: { status: 'Not Submitted' } });
        }
        return Promise.reject(new Error('Unexpected URL'));
      });
    });

    it('shows "Success" for biodata status', async () => {
      render(<Verify />);
      await waitFor(() => {
        expect(screen.getByText('Success')).toBeInTheDocument();
      });
    });

    it('shows file upload section when ID status is "Not Submitted"', async () => {
      render(<Verify />);
      await waitFor(() => {
        expect(screen.getByText('Upload Student ID Image')).toBeInTheDocument();
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
      });
    });

    describe('file upload', () => {
      it('handles file selection', async () => {
        render(<Verify />);
        await waitFor(() => {
          const fileInput = screen.getByTestId(
            'file-input',
          ) as HTMLInputElement;
          fireEvent.change(fileInput, { target: { files: [mockFile] } });
          expect(fileInput.files?.[0].name).toBe('test.png');
        });
      });

      it('submits the file when upload button is clicked', async () => {
        mockedAxios.post.mockResolvedValue({});
        render(<Verify />);

        await waitFor(() => {
          const fileInput = screen.getByTestId('file-input');
          fireEvent.change(fileInput, { target: { files: [mockFile] } });
        });

        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
          expect(mockedAxios.post).toHaveBeenCalled();
          expect(mockedAxios.post).toHaveBeenCalledWith(
            expect.stringContaining('/api/upload'),
            expect.any(FormData),
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );
        });
      });
    });
  });

  describe('when ID status is "Approved" and biodata is created', () => {
    beforeEach(() => {
      mockedAxios.get.mockImplementation((url) => {
        if (url.includes('biodata')) {
          return Promise.resolve({ data: { success: true } });
        }
        if (url.includes('identity/status')) {
          return Promise.resolve({ data: { status: 'Approved' } });
        }
        return Promise.reject(new Error('Unexpected URL'));
      });
    });

    it('shows "Verified" status', async () => {
      render(<Verify />);
      await waitFor(() => {
        expect(screen.getByText('Verified')).toBeInTheDocument();
        expect(screen.getByText('Verified')).toHaveClass('text-green-700');
      });
    });
  });

  describe('when ID status is "Rejected"', () => {
    beforeEach(() => {
      mockedAxios.get.mockImplementation((url) => {
        if (url.includes('biodata')) {
          return Promise.resolve({ data: { success: true } });
        }
        if (url.includes('identity/status')) {
          return Promise.resolve({ data: { status: 'Rejected' } });
        }
        return Promise.reject(new Error('Unexpected URL'));
      });
    });

    it('shows "Rejected" with red color', async () => {
      render(<Verify />);
      await waitFor(() => {
        expect(screen.getByText('Rejected')).toBeInTheDocument();
        expect(screen.getByText('Rejected')).toHaveClass('text-red-900');
      });
    });
  });

  describe('error handling', () => {
    it('handles API errors gracefully', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));
      render(<Verify />);

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
    });
  });
});
