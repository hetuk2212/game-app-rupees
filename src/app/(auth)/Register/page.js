"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import BASE_URL from "@/public/commonText/apiUrl";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (!password) newErrors.password = "Password is required.";
    else if (!passwordPattern.test(password))
      newErrors.password =
        "Password must be at least 8 characters, include a capital letter, a number, and a special character.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Please correct the errors and try again.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/users/register", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/login");
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-secondry">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              // required
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              // required
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              // required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              // required
            />
            {errors.password ? (
              <p className="text-red-500 text-sm">{errors.password}</p>
            ) : (
              <p className="text-gray-500 text-sm">
                Must be at least 8 characters, include a capital letter, a
                number, and a special character.
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 ${
              loading ? "bg-gray-400" : "bg-blue-500"
            } text-white rounded-md hover:bg-blue-600`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <span className="block text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:underline ml-2"
          >
            Login here
          </button>
        </span>
      </div>
    </div>
  );
};

export default Register;
