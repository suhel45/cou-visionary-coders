import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserData {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  password: string;
}

const SignUp = () => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "password" && value.length < 6) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters",
      });
    } else {
      setErrors({ ...errors, password: "" });
    }
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[.]{8,}$/; // Password validation regex

  // const validatePassword = (password) => {
  //   return passwordRegex.test(password); // Returns true if password is valid, false otherwise
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const { password } = formData; // Extract password from form data

    // if (!validatePassword(password)) {
    //   alert("Password must be at least 8 characters and contain a lowercase letter, uppercase letter, digit, and special character.");
    //   return; // Prevent form submission if password is invalid
    // }

    try {
      // Send form data to server
      console.log(userData);
      const response = await axios.post(
        "http://localhost:3000/signup",
        userData
      );
      //console.log(response.data); // Assuming server responds with a success message

      console.log(response.data);
      setUserData({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      alert("Sign Up Success..");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const [errors, setErrors] = useState({
    password: "",
  });
  // const generateSessionOptions = () => {
  //   const options = [];
  //   for (let year = 2005; year <= 2030; year++) {
  //     options.push(
  //       <option
  //         key={`year-${year}-${year + 1}`}
  //         value={`${year}-${year + 1}`}
  //       >{`${year}-${year + 1}`}</option>
  //     );
  //   }
  //   return options;
  // };
  // const generateDayOptions = () => {
  //   const days = [];
  //   for (let day = 1; day <= 31; day++) {
  //     days.push(<option key={day} value={day}>{day}</option>);
  //   }
  //   return days;
  // };
  const [showPassword, setShowPassword] = useState(false);

  // const generateMonthOptions = () => {
  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   return months.map((month, index) => (
  //     <option key={month} value={index + 1}>
  //       {month}
  //     </option>
  //   ));
  // };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const generateYearOptions = () => {
  //   const years = [];
  //   const currentYear = new Date().getFullYear();
  //   for (let year = currentYear - 40; year <= currentYear; year++) {
  //     years.push(<option key={year} value={year}>{year}</option>);
  //   }
  //   return years;
  // };

  return (
    <div className="flex flex-col items-center justify-center bg-sky-50   py-4">
      <h2 className="heading">Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        className="grow bg-white border-pink-600 p-6 md:px-20 m-1 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2"
      >
        <input
          type="text"
          name="name"
          value={userData.username}
          onChange={handleChange}
          className="form-input p-2 w-full"
          required
          placeholder="Enter Your Name "
        />

        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="form-input p-2 w-full"
          required
          placeholder="Enter Your Email"
        />

        <input
          type="tel"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
          className="form-input p-2 w-full"
          required
          placeholder="Enter Your Phone Number"
        />

        <br />
        <label className="label">
          Password
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="form-input p-2 w-full"
              required
              placeholder="Enter Your Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600 text-center">
              {errors.password}
            </p>
          )}
        </label>
        <br />

        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
