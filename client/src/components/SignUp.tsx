import { useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../interfaces";
import { Eye, EyeOff } from "lucide-react"; 

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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signup", userData);
      console.log(response.data);

      dispatch({ type: "RESET_FORM" });
      alert("Sign Up Success!");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-sky-50 py-8 px-2">
      <h2 className="heading">Create Account</h2>
      <form
        onSubmit={handleSubmit}
        className=" bg-white border-pink-600 p-6 md:px-20 m-2 rounded-md border shadow-lg flex flex-col gap-2 w-full sm:w-1/3"
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

        <button type="submit" className="btn-primary mx-auto">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
