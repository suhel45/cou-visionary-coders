import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, beforeAll } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../../components/SignUp';
import { AuthContext } from '../../Hooks/contextApi/UserContext';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Mock dependencies
vi.mock('axios');
vi.mock('../../utils/passwordValidation/ValidatePassword', () => ({
  ValidatePassword: (value: string) => {
    if (value.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*]/.test(value)) return 'Password must contain at least one special character';
    return null;
  },
}));
vi.mock('../../utils/Button/CommonButton', () => ({
  default: ({ label, ...props }: any) => <button {...props}>{label}</button>,
}));
vi.mock('../../utils/OrDivider/OrDivider', () => ({
  default: () => <div>OR</div>,
}));
vi.mock('../../components/GoogleSignIn', () => ({
  default: () => <div>Google SignIn</div>,
}));

describe('SignUp Component', () => {
  const mockCreateUser = vi.fn();
  const mockUpdateUserProfile = vi.fn();
  const mockDeleteUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (axios.post as any).mockResolvedValue({ data: { success: true } });
  });

  const renderWithContext = () => {
    return render(
      <AuthContext.Provider
        value={{
          createUser: mockCreateUser,
          updateUserProfile: mockUpdateUserProfile,
          deleteUser: mockDeleteUser,
          loginUser: vi.fn(),
          logOut: vi.fn(),
          signInWithGoogle: vi.fn(),
          isNewlyRegistered: false,
          refreshUser: vi.fn(),
          user: null,
          loading: false,
          initializing: false,
        }}
      >
        <BrowserRouter>
          <Toaster />
          <SignUp />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  it('renders all form fields and buttons', () => {
    renderWithContext();

    expect(screen.getByPlaceholderText('Enter Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Your Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows validation error if fields are empty and form is submitted', async () => {
    renderWithContext();

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getAllByText('This field is required')).toHaveLength(3);
    });
  });

  it('shows password validation errors', async () => {
    renderWithContext();

    fireEvent.change(screen.getByPlaceholderText('Enter Your Password'), {
      target: { value: 'short' },
    });

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
    });
  });

  it('shows error if passwords do not match', async () => {
    renderWithContext();

    fireEvent.change(screen.getByPlaceholderText('Enter Your Password'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Your Password'), {
      target: { value: 'Password1234!' },
    });

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('submits the form successfully', async () => {
    mockCreateUser.mockResolvedValue({});
    mockUpdateUserProfile.mockResolvedValue({});

    renderWithContext();

    fireEvent.change(screen.getByPlaceholderText('Enter Your Name'), {
      target: { value: 'Mahmoud' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Email'), {
      target: { value: 'mahmoud@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Password'), {
      target: { value: 'StrongPassword123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Your Password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith(
        'mahmoud@example.com',
        'StrongPassword123!'
      );
      expect(mockUpdateUserProfile).toHaveBeenCalledWith({ displayName: 'Mahmoud' });
    });
  });

  it('shows error if registration fails', async () => {
    mockCreateUser.mockRejectedValue(new Error('Registration failed'));

    renderWithContext();

    fireEvent.change(screen.getByPlaceholderText('Enter Your Name'), {
      target: { value: 'Mahmoud' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Email'), {
      target: { value: 'mahmoud@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Your Password'), {
      target: { value: 'StrongPassword123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Your Password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument();
    });
  });
});