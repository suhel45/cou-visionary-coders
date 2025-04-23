import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../Hooks/useAuth/useAuth';
import { useState } from 'react';
import { Alert } from '@mui/material';

const GoogleSignIn = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const { signInWithGoogle } = useAuth();

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login/google`,
        { email: user.email, username: user.displayName }, // This is the request body
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const responseData = response.data;

      if (responseData.success) {
        toast.success('User login successfully');
        navigate(from, { replace: true });
      } else {
        setMessage(responseData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Google login error:', error.message);
      const errorMessage = error.request
        ? 'No response from the server. Please check your network connection.'
        : error.response?.data?.message || 'Google login failed. Try again.';
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" sm:mx-auto sm:w-full sm:max-w-md">
      {message && (
        <Alert severity="error" sx={{ width: '100%', marginBottom: 2 }}>
          {message}
        </Alert>
      )}

      <button
        onClick={handleGoogle}
        className="cursor-pointer flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span>Continue with Google</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default GoogleSignIn;
