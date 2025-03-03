import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../Hooks/contextApi/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { IFormData, UserProfile } from '../interfaces/Signup.interface';
import { Eye, EyeOff } from 'lucide-react';
import { GetCsrfToken } from '../utils/csrfToken/GetCsrfToken';

const SignUp = async() => {
  const csrfToken = await GetCsrfToken();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is null');
  }

  const { createUser, updateUserProfile } = authContext;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IFormData) => {
    setLoading(true);
    try {
      //simulate a 2 second delay to submit the form
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });

      createUser(data.email, data.password)
        .then(() => {
          handleUpdateUserProfile(data.username);

          saveUser(data.username, data.phoneNumber, data.email, data.password);
        })
        .catch((error: any) => {
          console.log(error);
          toast.error('Error creating user. Please try again.');
        });
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserProfile = (name: string) => {
    const profile: UserProfile = {
      displayName: name,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error: any) => console.error(error));
  };

  const saveUser = async (
    username: string,
    phoneNumber: string,
    email: string,
    password: string,
  ) => {
    const user = {
      username,
      phoneNumber,
      email,
      password,
    };
    const response = await fetch(
      'https://halalbondhon-server.vercel.app/api/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(user),
      },
    );
    const responseData = await response.json();
    if (responseData.success) {
      toast.success('user created successfully');
      navigate('/login');
    } else {
      toast.error(responseData.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Watch the password field
  const password = watch('password');

  return (
    <div className="flex flex-col items-center justify-center bg-sky-50 py-8 px-2">
      <h2 className="heading mb-4 text-2xl font-bold">Create Account</h2>

      {/* Email/Password Sign Up Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border-pink-600 p-6 md:px-20 m-2 rounded-md border shadow-lg flex flex-col gap-2 w-full sm:w-1/3"
      >
        <input
          type="text"
          {...register('username', { required: 'This field is required' })}
          placeholder="Enter Your Name"
          className="form-input p-2 w-full"
        />
        {errors.username && (
          <span className="text-red-500">
            {errors.username?.message && String(errors.username?.message)}
          </span>
        )}

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
          className="form-input p-2 w-full"
        />
        {errors.email && (
          <span className="text-red-500">
            {errors.email?.message && String(errors.email?.message)}
          </span>
        )}

        <input
          type="tel"
          {...register('phoneNumber', {
            required: 'This field is required',
            pattern: {
              value: /^\d{11}$/,
              message: 'Invalid phone number',
            },
          })}
          placeholder="Enter Your Phone Number"
          className="form-input p-2 w-full"
        />
        {errors.phoneNumber && (
          <span className="text-red-500">
            {errors.phoneNumber?.message && String(errors.phoneNumber?.message)}
          </span>
        )}

        {/* Password */}
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            placeholder="Enter Your Password"
            className="form-input p-2 w-full"
          />
          <button
            type="button"
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <span className="text-red-500">
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
              validate: (value: any) =>
                value === password || 'Passwords do not match',
            })}
            placeholder="Confirm Your Password"
            className="form-input p-2 w-full"
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
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword?.message &&
                String(errors.confirmPassword?.message)}
            </span>
          )}
        </div>

        {/* show login option */}
        <p className="text-center text-sm md:text-lg font-semibold text-gray-800">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-700 hover:text-lg hover:underline hover:text-blue-400 font-bold"
          >
            Login
          </Link>
        </p>

        <button
          type="submit"
          className="btn-primary mx-auto mt-2"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
