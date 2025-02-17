import { useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase"; // Firebase config & auth
import { UserData } from "../interfaces";
import { useAuth } from "../context/AuthContext"; // Access the setUser function from context

// Default user data
const defaultUserData: UserData = {
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

// Action types for useReducer
type ActionType =
  | { type: "SET_FIELD"; field: keyof UserData; value: string }
  | { type: "RESET_FORM" };

// Reducer function
const userReducer = (state: UserData, action: ActionType): UserData => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return defaultUserData;
    default:
      return state;
  }
};

const SignUp = () => {
  const [userData, dispatch] = useReducer(userReducer, defaultUserData);
  const [errors, setErrors] = useState<{ password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: (value.length < 6 && value.length > 0) ? "Password must be at least 6 characters" : "",
      }));
    }

    dispatch({ type: "SET_FIELD", field: name as keyof UserData, value });
  };

  // Handle Email/Password Sign Up
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Firebase: Create user with Email/Password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Save user to DB
      await storeUserInDB(userCredential, {
        username: userData.username,
        phoneNumber: userData.phoneNumber,
      });

      // Reset Form
      dispatch({ type: "RESET_FORM" });

      alert("Sign Up Success!");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Sign Up Failed!");
    }
  };

  // Handle Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      // Save user to DB
      await storeUserInDB(userCredential, {
        username: "", // or extract from userCredential if available
        phoneNumber: "",
      });

      alert("Google Sign Up Success!");
      navigate("/login");
    } catch (error) {
      console.error("Error with Google Sign Up:", error);
      alert("Google Sign Up Failed!");
    }
  };

  // Store user in global context and also in your MongoDB
  const storeUserInDB = async (
    userCredential: UserCredential,
    extraData: { username: string; phoneNumber: string }
  ) => {
    const firebaseUser = userCredential.user;
    console.log("Firebase User Created:", firebaseUser);

    // Update user in global context
    setUser(firebaseUser);

    // Prepare data for MongoDB
    const { uid, email } = firebaseUser;
    const { username, phoneNumber } = extraData;

    // Store user in MongoDB via your backend
    const response = await axios.post("http://localhost:3000/api/signup", {
      uid,
      username,
      email,
      phoneNumber,
    });

    console.log("MongoDB Response:", response.data);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-sky-50 py-8 px-2">
      <h2 className="heading mb-4 text-2xl font-bold">Create Account</h2>

      {/* Email/Password Sign Up Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border-pink-600 p-6 md:px-20 m-2 rounded-md border shadow-lg flex flex-col gap-2 w-full sm:w-1/3"
      >
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Enter Your Name"
          required
          className="form-input p-2 w-full"
        />

        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
          required
          className="form-input p-2 w-full"
        />

        <input
          type="tel"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter Your Phone Number"
          required
          className="form-input p-2 w-full"
        />

        {/* Password */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            required
            className="form-input p-2 w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}

        {/* Confirm Password */}
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Your Password"
            required
            className="form-input p-2 w-full"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" className="btn-primary mx-auto mt-2">
          Register
        </button>

        {/* Divider with 'or' */}
        <div className="my-4 flex items-center">
          <span className="border-b w-full" />
          <span className="px-2 text-gray-500">or</span>
          <span className="border-b w-full" />
        </div>

        {/* Google Sign Up Button */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className=" flex items-center justify-center bg-white text-gray-600 border border-gray-300 rounded py-2 shadow hover:bg-gray-100"
        >
          {/* Google Icon */}
          <img
            src="https://imgs.search.brave.com/0dfkmCFWC2zrjWCenB_rDnfa_wKBmKDmxG4qSB78iQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi01MTJ4NTEy/LXRxYzllbDNyLnBu/Zw"
            alt="Google Logo"
            className="w-5 h-5 mr-2 "
          />
          Create account with Google
        </button>
      </form>
    </div>
  );
};

export default SignUp;