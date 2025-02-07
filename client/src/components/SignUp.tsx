import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserData {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    department: string;
    session: string;
    gender: string;
    religion: string;
    dayOfBirth: string;
    familyStatus: string;
    maritalStatus: string;
    height: string;
    weight: string;
    skinColor: string;
    presentAddress?: string;
    permanentAddress?: string;
    work: string;
  }
  
  interface Errors {
    password: string;
  }

const SignUp = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    department: "",
    session: "",
    gender: "",
    religion: "",
    dayOfBirth: "",
    familyStatus: "",
    maritalStatus: "",
    height: "",
    weight: "",
    skinColor: "",
    presentAddress: "",
    permanentAddress: "",
    work: "",
  });

  const navigate = useNavigate();
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    if (name === "password" && value.length < 6) {
      setErrors({ ...errors, password: "Password must be at least 6 characters" });
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
 
  const handleSubmit = async (e:any) => {
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
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        department: "",
        session: "",
        gender: "",
        religion: "",
        dayOfBirth: "",
        familyStatus: "",
        maritalStatus: "",
        height: "",
        weight: "",
        skinColor: "",
        work: "",
      });
      alert('Sign Up Success..');
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const [errors, setErrors] = useState({
    password: ""
  });
  const generateSessionOptions = () => {
    const options = [];
    for (let year = 2005; year <= 2030; year++) {
      options.push(
        <option
          key={`year-${year}-${year + 1}`}
          value={`${year}-${year + 1}`}
        >{`${year}-${year + 1}`}</option>
      );
    }
    return options;
  };
  const generateDayOptions = () => {
    const days = [];
    for (let day = 1; day <= 31; day++) {
      days.push(<option key={day} value={day}>{day}</option>);
    }
    return days;
  };
  const [showPassword, setShowPassword] = useState(false);

  const generateMonthOptions = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.map((month, index) => (
      <option key={month} value={index + 1}>
        {month}
      </option>
    ));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const generateYearOptions = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 100; year <= currentYear; year++) {
      years.push(<option key={year} value={year}>{year}</option>);
    }
    return years;
  };

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
          value={userData.name}
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
       
        <br/>
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
          <br/>
       
        <label className="label">
          ডিপার্টমেন্ট
          <select
            name="department"
            value={userData.department}
            onChange={handleChange}
            className="option-btn"
            required
          >
            <option value="">Select</option>
            <option value="ICT">ICT</option>
            <option value="CSE">CSE</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label className="label">
          সেশন
          <select
            name="session"
            value={userData.session}
            onChange={handleChange}
            className="option-btn"
            required
          >
            <option value="">Select...</option>
            {generateSessionOptions()}
          </select>
        </label>
        <br />
        <label className="label">
        Gender
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            className="option-btn"
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label className="label">
          ধর্ম -
          <select
            name="religion"
            value={userData.religion}
            onChange={handleChange}
            className="option-btn"
            required
          >
            <option value="">Select...</option>
            <option value="ইসলাম">ইসলাম</option>
            <option value="হিন্দু">হিন্দু</option>
            <option value="খ্রিস্টান">খ্রিস্টান</option>
            <option value="বৌদ্ধ">বৌদ্ধ</option>
           
          </select>
        </label>

        <br />
        <label className="label">
          জন্ম তারিখ
          <div className="flex gap-2">
            <select
              name="dayOfBirth"
              value={userData.dayOfBirth}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Day</option>
              {generateDayOptions()}
            </select>
            <select
              name="monthOfBirth"
              value={userData.monthOfBirth}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Month</option>
              {generateMonthOptions()}
            </select>
            <select
              name="yearOfBirth"
              value={userData.yearOfBirth}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Year</option>
              {generateYearOptions()}
            </select>
          </div>
        </label>
        <br />

        <label className="label">
          অর্থনৈতিক অবস্থা -
          <select
            name="familyStatus"
            value={formData.familyStatus}
            onChange={handleChange}
            className="option-btn"
            required
          >
            <option value="">Select</option>
            <option value="উচ্চবিত্ত">উচ্চবিত্ত</option>
            <option value="উচ্চ মধ্যবিত্ত"> উচ্চ মধ্যবিত্ত</option>
            <option value="মধ্যবিত্ত"> মধ্যবিত্ত</option>
            <option value="নিম্ন মধ্যবিত্ত"> নিম্ন মধ্যবিত্ত </option>
            <option value="নিম্নবিত্ত"> নিম্নবিত্ত</option>
          </select>
        </label>
        <br />
        <label className="label">
          বৈবাহিক অবস্থা -
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="option-btn"
            required
          >
            <option value="">Select</option>
            <option value="অবিবাহিত">অবিবাহিত</option>
            <option value="বিবাহিত">বিবাহিত</option>
            <option value="ডিভোর্সড">ডিভোর্সড</option>
            <option value="বিধবা">বিধবা</option>
            <option value="বিপত্নীক">বিপত্নীক</option>
          </select>
        </label>
        <br />
        <label className="label">
          উচ্চতা -
          <select
            name="height"
            value={userData.height}
            onChange={handleChange}
            className="option-btn"
            required
          >
            <option value="">Select Height</option>
            {Array.from({ length: 36 }, (_, i) => {
              const feet = Math.floor(i / 12) + 4;
              const inches = i % 12;
              const formattedHeight = `${feet}'${inches}"`;
              return (
                <option key={formattedHeight} value={formattedHeight}>
                  {formattedHeight}
                </option>
              );
            })}
          </select>
        </label>

        <br />
        <label className="label">
          ওজন -
          <select
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="option-btn"
            required
          >
            <option value="">Select Weight</option>
            {Array.from({ length: 91 }, (_, i) => {
              const weight = i + 30;
              return (
                <option key={weight} value={`${weight} kg`}>
                  {`${weight} kg`}
                </option>
              );
            })}
          </select>
        </label>

        <br />
        <label className="label">
          গাত্রবর্ন -
          <select
            name="skinColor"
            value={formData.skinColor}
            onChange={handleChange}
            className="option-btn"
            required
          >
            <option value="">Select</option>
            <option value="উজ্জ্বল ফর্সা">উজ্জ্বল ফর্সা</option>
            <option value="ফর্সা">ফর্সা</option>
            <option value="শ্যামলা">শ্যামলা</option>
            <option value="উজ্জ্বল শ্যামলা">উজ্জ্বল শ্যামলা</option>
            <option value="কালো">কালো</option>
          </select>
        </label>
        <br />
        
        
        <label className="label">
          পেশা -
          <select
            className="option-btn"
            name="work"
            value={formData.work}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="শিক্ষার্থী">শিক্ষার্থী</option>
            <option value="ডাক্তার">ডাক্তার</option>
            <option value="ইঞ্জিনিয়ার">ইঞ্জিনিয়ার</option>
            <option value="সরকারি চাকরি">সরকারি চাকরি</option>
            <option value="বেসরকারি চাকরি">বেসরকারি চাকরি</option>
            <option value="ব্যবসায়ী">ব্যবসায়ী</option>
            <option value="শিক্ষক">শিক্ষক</option>
            <option value="ফ্রীল্যান্সার">ফ্রীল্যান্সার</option>
            <option value="প্রবাসী">প্রবাসী</option>
            <option value="পেশা নাই">পেশা নাই</option>
            <option value="অন্যান্য"> অন্যান্য </option>
          </select>
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
