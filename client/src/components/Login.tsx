import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormInput } from '../interfaces/Login.interface';
import { Eye, EyeOff } from 'lucide-react';
import GoogleSignIn from './GoogleSignIn';
import { useAuth } from '../Hooks/useAuth/useAuth';
import OrDivider from '../utils/OrDivider/OrDivider';
import axios from 'axios';
import { Alert } from '@mui/material';
import CommonButton from '../utils/Button/CommonButton';

const Login: React.FC = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // location page the user was trying to access
  const from = location.state?.from || '/';

  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    setLoading(true);
    try {
      // First authenticate with Firebase
      const result = await loginUser(data.email, data.password);
      const user = result.user;

      // Then authenticate with your backend
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`,
        { email: user.email, password: data.password },
        { withCredentials: true },
      );

      toast.success('User login successfully');
      navigate(from, { replace: true });

    } catch (error) {
      //check firebase or backend sever errors
      if (
        (axios.isAxiosError(error) && error.response) ||
        !(error instanceof Error && error.name === 'AxiosError')
      ) {
        setMessage('Incorrect email or password');

      } else if (axios.isAxiosError(error) && error.request) {
        setMessage(
          'No response from the server. Please check your network connection.',
        );

      } else {
        setMessage('Login Failed. Please try again later.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 shadow-md rounded-md border border-pink-600 m-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <img
          className="mx-auto h-32 w-auto"
          src="https://cdn.dribbble.com/users/756147/screenshots/2494603/unlock_animaiton.gif"
          alt="Login"
        />
        <h2
          className="mt-5 bg-pink-600 text-white py-2 px-6 shadow-sm outline outline-pink-600  outline-offset-2  m-2 rounded-md text-center font-bold text-xl md:text-2xl;
"
        >
          Log in
        </h2>
      </div>

      {/* show error messae*/}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        {message && (
          <Alert severity="error" sx={{ width: '100%', marginBottom: 2 }}>
            {message}
          </Alert>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              {...register('email', { required: 'Email is required' })}
              type="email"
              autoComplete="email"
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm font-semibold  p-2">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                {...register('password', {
                  required: 'Password is required',
                })}
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Forgot password?
            </Link>
            {errors.password && (
              <span className="text-red-500 text-sm font-semibold">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit button*/}
          <CommonButton
            type="submit"
            label="Log in"
            loadingLabel="logging in..."
            loading={loading}
            fullWidth
          />
        </form>

        {/* Or Divider */}
        <OrDivider />

        {/* Google Sign-In */}
        <GoogleSignIn />

        <p className="mt-6 text-center text-sm  text-gray-500">
          Not a member?
          <Link
            to="/signup"
            className="text-indigo-700 hover:text-indigo-400 font-bold px-2"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
