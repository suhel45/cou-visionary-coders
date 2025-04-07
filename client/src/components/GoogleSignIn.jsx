import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../Hooks/useAuth/useAuth';

const GoogleSignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const { signInWithGoogle } = useAuth();

  const handleGoogle = async () => {
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
        toast.error(responseData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Google login error:', error);
      const errorMessage =
        error.response?.data?.message || 'Google login failed. Try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <button
      onClick={handleGoogle}
      className="cursor-pointer flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-md shadow-md hover:bg-gray-100"
    >
      <img
        src="https://imgs.search.brave.com/0dfkmCFWC2zrjWCenB_rDnfa_wKBmKDmxG4qSB78iQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi01MTJ4NTEy/LXRxYzllbDNyLnBu/Zw"
        alt="Google"
        className="w-5 h-5 mr-2"
      />{' '}
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
