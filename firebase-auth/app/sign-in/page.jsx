'use client';
import React, { useState } from "react";
import Swal from "sweetalert2";
import signIn from "@/app/auth/signin"; // Replace with your actual sign-in function path
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router= useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { result, error } = await signIn(formData.email, formData.password);

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: error.message || "Invalid email or password.",
        });
        return;
      }

      // Show success notification
      Swal.fire({
        icon: "success",
        title: "Sign In Successful",
        text: "Welcome back!",
      });

      console.log(result);
      return router.push("/admin")
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In to Your Account
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
