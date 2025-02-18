/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      console.log(data);
      // Handle form submission
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setLoading(false);
    }
  };

  // Watch the password field
  const password = watch("password");

  return (
    <div className="flex flex-col items-center justify-center bg-sky-50 py-8 px-2">
      <h2 className="heading mb-4 text-2xl font-bold">Create Account</h2>

      {/* Email/Password Sign Up Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border-pink-600 p-6 md:px-20 m-2 rounded-md border shadow-lg flex flex-col gap-2 w-full sm:w-1/3">
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Enter Your Name"
          className="form-input p-2 w-full"
        />
        {errors.username && (
          <span className="text-red-500">This field is required</span>
        )}

        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Enter Your Email"
          className="form-input p-2 w-full"
        />
        {errors.email && (
          <span className="text-red-500">This field is required</span>
        )}

        <input
          type="tel"
          {...register("phoneNumber", { required: true })}
          placeholder="Enter Your Phone Number"
          className="form-input p-2 w-full"
        />
        {errors.phoneNumber && (
          <span className="text-red-500">This field is required</span>
        )}

        {/* Password */}
        <div className="relative w-full">
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter Your Password"
            className="form-input p-2 w-full"
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative w-full">
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm Your Password"
            className="form-input p-2 w-full"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword && typeof errors.confirmPassword.message === "string" && errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary mx-auto mt-2"
          disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
