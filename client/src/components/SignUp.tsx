import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { IFormData, UserProfile } from '../interfaces/Signup.interface';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../Hooks/useAuth/useAuth';
import CommonButton from '../utils/Button/CommonButton';
import GoogleSignIn from './GoogleSignIn';
import OrDivider from '../utils/OrDivider/OrDivider';
import axios from 'axios';
import { Alert } from '@mui/material';
import { ValidatePassword } from '../utils/passwordValidation/ValidatePassword';

const SignUp = () => {
  const { createUser, updateUserProfile, user, deleteUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormData>();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Watch the password field
  const password = watch('password');

  const onSubmit = async (data: IFormData) => {
    setLoading(true);

    try {
      // Create user with email and password in Firebase
      await createUser(data.email, data.password);

      // Update user profile
      await handleUpdateUserProfile(data.username);

      // Save user data db
      try {
        await saveUser(data.username, data.email, data.password);

        toast.success('User created successfully');
        navigate('/login');
      } catch (dbError) {
        console.error('Error saving user data:', dbError);
        setMessage('Registration failed. Please try again.');

        // Use the user state from context
        if (user) {
          await deleteUser(user);
        }

        throw new Error('Failed to save user data. Registration cancelled.');
      }
    } catch (error) {
      //check firebase or backend sever errors
      if (
        (axios.isAxiosError(error) && error.response) ||
        !(error instanceof Error && error.name === 'AxiosError')
      ) {
        setMessage('Registration failed. Please try again.');
      } else if (axios.isAxiosError(error) && error.request) {
        setMessage(
          'No response from the server. Please check your network connection.',
        );
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserProfile = async (name: string) => {
    const profile: UserProfile = {
      displayName: name,
    };
    try {
      await updateUserProfile(profile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const saveUser = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const user = {
      username,
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/api/signup`,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseData = response.data;
    if (!responseData.success) {
      setMessage('Registration failed. Please try again.');
    }
    return responseData;
  };

  const inputStyle: string =
    'm-2 outline-0 rounded-md border border-slate-300 focus:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:p-2 focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 focus:my-2 text-xs sm:text-sm sm:leading-6 p-2 w-full';

  return (
    <div className="flex flex-col items-center justify-center shadow-lg bg-indigo-50 py-8 px-2 border-2 border-pink-700 m-4 rounded-md">
      <h2 className="bg-pink-600 text-white py-2 px-6 shadow-sm outline outline-pink-600 outline-offset-2 m-2 rounded-md text-center font-bold text-xl md:text-2xl mb-4">
        Create Account
      </h2>

      {message && (
        <div className="flex justify-center items-center">
          <Alert severity="error" sx={{ width: '100%', marginBottom: 2 }}>
            {message}
          </Alert>
        </div>
      )}

      {/* Email/Password Sign Up Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border-pink-600 p-6 md:px-20 m-2 rounded-md border-2 shadow-lg flex flex-col gap-2 w-full sm:w-1/3"
      >
        {/* Username */}
        <input
          type="text"
          {...register('username', { required: 'This field is required' })}
          placeholder="Enter Your Name"
          className={inputStyle}
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username?.message && String(errors.username?.message)}
          </span>
        )}

        {/* Email */}
        <input
          type="email"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
          placeholder="Enter Your Email"
          className={inputStyle}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">
            {errors.email?.message && String(errors.email?.message)}
          </span>
        )}

        {/* Password */}
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              validate: (value) => {
                const validationError = ValidatePassword(value);
                if (validationError) {
                  return validationError;
                }
                return true;
              },
            })}
            placeholder="Enter Your Password"
            className={inputStyle}
          />
          <button
            type="button"
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password?.message && String(errors.password?.message)}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', {
              required: 'This field is required',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            placeholder="Confirm Your Password"
            className={inputStyle}
          />
          <button
            type="button"
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
            onClick={toggleConfirmPasswordVisibility}
            aria-label={
              showConfirmPassword
                ? 'Hide confirm password'
                : 'Show confirm password'
            }
          >
            {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword?.message &&
                String(errors.confirmPassword?.message)}
            </span>
          )}
        </div>

        {/* Show login option */}
        <p className="text-center text-sm text-gray-800">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-700 hover:text-lg hover:underline hover:text-blue-400 font-bold"
          >
            Login
          </Link>
        </p>

        {/* Submit button */}
        <CommonButton
          type="submit"
          label="Register"
          loading={loading}
          fullWidth
        />
      </form>

      {/* Divider */}
      <OrDivider />

      {/* Google Sign In Button */}
      <GoogleSignIn />
    </div>
  );
};

export default SignUp;
