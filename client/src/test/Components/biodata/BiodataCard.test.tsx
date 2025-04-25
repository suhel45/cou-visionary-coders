import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BiodataCard from '../../../components/biodata/BiodataCard';
import { BiodataCardProps } from '../../../interfaces/BiodataSearch.interface';
import { AuthContext } from '../../../Hooks/contextApi/UserContext';

// Create a test query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock user for AuthContext
const mockAuthUser = {
  _id: 'user123',
  email: 'test@example.com',
  token: 'testtoken',
};

// Mock images
vi.mock('../../assets/man.png', () => ({
  default: 'man-image-path',
}));
vi.mock('../../assets/woman.png', () => ({
  default: 'woman-image-path',
}));

describe.skip('BiodataCard', () => {
  const mockUser = {
    _id: '123',
    biodataNo: 'BD-1001',
    personalInfo: {
      gender: 'Male',
      birthDate: '1995-01-01',
      height: "5'8\"",
      occupation: 'Engineer',
      complexion: 'Fair',
    },
  };

  const defaultProps: BiodataCardProps = {
    user: mockUser,
    currentPage: 1,
    mode: 'add',
  };

  const renderWithProviders = (props = defaultProps) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthContext.Provider
            value={{
              user: mockAuthUser,
              isLoading: false,
              error: null,
              login: vi.fn(),
              logout: vi.fn(),
              register: vi.fn(),
            }}
          >
            <BiodataCard {...props} />
          </AuthContext.Provider>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('renders correctly with male user', () => {
    renderWithProviders();

    // Verify header
    expect(screen.getByText('বায়োডাটা নং - BD-1001')).toBeInTheDocument();
    
    // Verify image
    expect(screen.getByAltText('Man')).toBeInTheDocument();
    expect(screen.getByAltText('Man')).toHaveAttribute('src', 'man-image-path');
    
    // Verify personal info
    expect(screen.getByText('জন্ম তারিখ')).toBeInTheDocument();
    expect(screen.getByText('1995-01-01')).toBeInTheDocument();
    expect(screen.getByText('উচ্চতা')).toBeInTheDocument();
    expect(screen.getByText("5'8\"")).toBeInTheDocument();
    expect(screen.getByText('পেশা')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('গায়ের রং')).toBeInTheDocument();
    expect(screen.getByText('Fair')).toBeInTheDocument();
    
    // Verify buttons
    expect(screen.getByText('View Profile')).toBeInTheDocument();
  });

  it('renders correctly with female user', () => {
    const femaleUser = {
      ...mockUser,
      personalInfo: {
        ...mockUser.personalInfo,
        gender: 'Female',
      },
    };

    renderWithProviders({ ...defaultProps, user: femaleUser });

    expect(screen.getByAltText('Woman')).toBeInTheDocument();
    expect(screen.getByAltText('Woman')).toHaveAttribute('src', 'woman-image-path');
  });

  it('contains correct link to profile page with state', () => {
    renderWithProviders();

    const link = screen.getByRole('link', { name: /view profile/i });
    expect(link).toHaveAttribute('href', '/biodata/profile/123');
  });

 
  it('displays all personal information correctly', () => {
    const customUser = {
      ...mockUser,
      personalInfo: {
        gender: 'Male',
        birthDate: '1990-05-15',
        height: "6'0\"",
        occupation: 'Doctor',
        complexion: 'Medium',
      },
    };

    renderWithProviders({ ...defaultProps, user: customUser });

    expect(screen.getByText('1990-05-15')).toBeInTheDocument();
    expect(screen.getByText("6'0\"")).toBeInTheDocument();
    expect(screen.getByText('Doctor')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });
});