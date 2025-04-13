import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormInput } from '../interfaces/Login.interface';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import GoogleSignIn from './GoogleSignIn';
import { useAuth } from '../Hooks/useAuth/useAuth';
import OrDivider from '../utils/OrDivider/OrDivider';

const Login: React.FC = () => {
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
      const result = await loginUser(data.email, data.password);
      const user = result.user;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ email: user.email, password: data.password }),
        },
      );

      const responseData = await response.json();

      if (responseData.success) {
        toast.success('User login sucessfully');
        navigate(from, { replace: true });
      } else {
        toast.error(responseData.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again later.';
      toast.error(errorMessage);
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
          className="mt-2  text-violet-700 py-2 px-6   m-2 rounded-md text-center font-bold text-xl md:text-4xl
"
        >
          Log in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
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
              <span className="text-red-500 font-semibold  p-2">
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
                  // pattern: {
                  // value:
                  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  // message: 'Password is required',
                  // },
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
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 font-semibold">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="cursor-pointer w-1/2 py-2 px-5 bg-violet-700 text-white font-semibold rounded-full shadow-md hover:bg-violet-900 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-violet-400 focus:ring-opacity-75 mx-auto mt-2 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              'Log in'
            )}
          </button>
        </form>

        {/* Or Divider */}
        <OrDivider />

        {/* Google Sign-In */}
        <GoogleSignIn />

        <p className="mt-6 text-center text-sm md:text-lg text-gray-500">
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
