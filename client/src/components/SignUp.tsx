import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../Hooks/contextApi/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { IFormData, UserProfile } from '../interfaces/Signup.interface';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
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
      // Simulate a 2-second delay to submit the form
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create user with email and password
      await createUser(data.email, data.password);

      // Update user profile with the provided username
      await handleUpdateUserProfile(data.username);

      // Save user data to the server
      await saveUser(
        data.username,
        data.phoneNumber,
        data.email,
        data.password,
      );

      toast.success('User created successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error('Error creating user. Please try again.');
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
    }
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
    try {
      const response = await fetch(
        'https://halalbondhon-server.vercel.app/api/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      );
      const responseData = await response.json();
      if (!responseData.success) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };

  const inputStyle: string =
    'm-2 outline-0 rounded-md border border-slate-300 focus:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:p-2 focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 focus:my-2 text-xs sm:text-sm sm:leading-6 p-2 w-full';

  return (
    <div className="flex flex-col items-center justify-center shadow-lg bg-indigo-50 py-8 px-2 border-2 border-pink-700 m-4 rounded-md">
      <h2 className="bg-pink-600 text-white py-2 px-6 shadow-sm outline outline-pink-600 outline-offset-2 m-2 rounded-md text-center font-bold text-xl md:text-2xl mb-4">
        Create Account
      </h2>

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
          <span className="text-red-500">
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
          <span className="text-red-500">
            {errors.email?.message && String(errors.email?.message)}
          </span>
        )}

        {/* Phone Number */}
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
          className={inputStyle}
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
              required: 'Password is required',
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  'Password must be 8+ characters, include uppercase, lowercase, number & symbol.',
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
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword?.message &&
                String(errors.confirmPassword?.message)}
            </span>
          )}
        </div>

        {/* Show login option */}
        <p className="text-center text-sm md:text-lg font-semibold text-gray-800">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-700 hover:text-lg hover:underline hover:text-blue-400 font-bold"
          >
            Login
          </Link>
        </p>

        {/* Submit button */}
        <button
          type="submit"
          className="w-1/2 py-2 px-5 bg-violet-700 text-white font-semibold rounded-full shadow-md hover:bg-violet-900 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-violet-400 focus:ring-opacity-75 mx-auto mt-2"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
