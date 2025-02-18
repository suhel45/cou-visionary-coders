import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { LoginData } from "../interfaces";

// Firebase imports
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";


import { useAuth } from "../context/AuthContext"; // Adjust path as needed

const User = { email: "", password: "" };

const Login = () => {
  const [data, setData] = useState<LoginData>(User);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // 2. Get setUser from our AuthContext
  const { setUser } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      // Example email/password login
      const response = await axios.post("http://localhost:3000/api/login", data);
      const { user, accessToken } = response.data;

      setUser(user);

      navigate("/profile");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      // You can also send googleUser info to your backend for verification
      const token = await googleUser.getIdToken();

      

      

      navigate("/profile");
    } catch (error: any) {
      setError(error.message || "Google Sign-In failed. Please try again.");
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
        <h2 className="mt-5 heading">Log in</h2>
      </div>

      {error && (
        <div className="mx-auto max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4">
          {error}
        </div>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleChange}
              value={data.email}
              required
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                onChange={handleChange}
                value={data.password}
                required
                className="block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md shadow-md hover:bg-indigo-700 font-bold"
          >
            Sign in
          </button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-md shadow-md hover:bg-gray-100"
        >
          <img
            src="https://imgs.search.brave.com/0dfkmCFWC2zrjWCenB_rDnfa_wKBmKDmxG4qSB78iQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi01MTJ4NTEy/LXRxYzllbDNyLnBu/Zw"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-sm md:text-lg text-gray-500">
          Not a member?
          <a
            href="/signup"
            className="text-indigo-700 hover:text-indigo-400 font-bold px-2"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
