"use client";
import BASE_URL from "@/public/commonText/apiUrl";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      toast.error("Please correct the errors and try again.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/users/login", {
        email: email,
        password: password,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 100);
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
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
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
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            // required
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Passworad
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            // required
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <button
          className={`w-full py-2 ${
            loading ? "bg-gray-400" : "bg-blue-500"
          } text-white rounded-md hover:bg-blue-600`}
          disabled={loading}
          onClick={() => {
            handleSubmit();
          }}
        >
          {loading ? "Logining..." : "login"}
        </button>
        <span className="block text-center mt-4">
          Don't have an account?
          <button
            onClick={() => router.push("/Register")}
            className="text-blue-500 hover:underline ml-2"
          >
            Register here
          </button>
        </span>
      </div>
    </div>
  );
};

export default Login;
