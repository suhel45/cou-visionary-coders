import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../../components/SignUp';
import { AuthContext } from '../Hooks/contextApi/UserContext';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

// Mock dependencies
vi.mock('axios');
vi.mock('../utils/passwordValidation/ValidatePassword', () => ({
  ValidatePassword: () => null,
}));
vi.mock('../utils/Button/CommonButton', () => ({
  default: ({ label, ...props }: any) => <button {...props}>{label}</button>,
}));
vi.mock('../utils/OrDivider/OrDivider', () => ({
  default: () => <div>OR</div>,
}));
vi.mock('./GoogleSignIn', () => ({
  default: () => <div>Google SignIn</div>,
}));

describe('SignUp Component', () => {
  const mockCreateUser = vi.fn();
  const mockUpdateUserProfile = vi.fn();
  const mockDeleteUser = vi.fn();
  const navigate = vi.fn();

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
          user: { uid: '123' },
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
      expect(screen.getByText('This field is required')).toBeInTheDocument();
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
      expect(mockUpdateUserProfile).toHaveBeenCalled();
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
});
