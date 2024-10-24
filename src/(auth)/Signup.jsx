// SignUp.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useToast, Spinner } from "@chakra-ui/react";
const SignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    fullName: "", // Add full name field
  });

  const [loading, setLoading] = useState(false);
  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return; // Ensure loading is false before return
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both passwords are the same.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    // Validate phone number format
    if (!/^\d{11}$/.test(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 11-digit phone number.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      // Send data to the backend
      const response = await axios.post(
        "https://allureserver.onrender.com/api/signup",
        {
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          fullName: formData.fullName, // Send full name
        }
      );

      if (response.status === 200) {
        toast({
          title: "User Signup Successful",
          description: "You have signed up successfully!",
          position: "top-right",
          status: "success", // Set status to success
          duration: 5000,
          isClosable: true,
        });
      }

      setFormData({
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        fullName: "", // Reset full name field
      });

      setTimeout(() => {
        navigate("/signin"); // Redirect to home
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        toast({
          title: "Signup Failed",
          description: error.response.data.message,
          position: "top-right",
          status: "error", // Set status to error
          duration: 5000,
          isClosable: true,
        });
      } else if (error.request) {
        toast({
          title: "Server Unresponsive",
          description: "No response from the server. Please try again later.",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Signup Error",
          description: "Something went wrong. Please try again.",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false); // Set loading to false regardless of the outcome
    }
  };

  return (
    <div className="flex justify-center h-[100vh] pb-10 bg-gradient-to-b from-[#FFDFEB] to-[#ffa2c4]">
      <Link to="/signin">
        {" "}
        <IoArrowBack className="absolute top-10 left-16 text-4xl" />
      </Link>
      <div className="flex flex-col bg-[rgb(255,255,255)] h-[610px] w-[80%] sm:w-[400px] md:w-[450px]  items-center mt-10 pt-4 rounded-lg pb-6">
        <h2 className="text-[20px] sm:text-2xl text-[#fdb0be] font-semibold mt-3">
          Create your Allure Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex flex-col mt-1">
            <label className="mb-1 text-lg text-white font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-[280px] sm:w-80 pl-2 rounded-md border-2 border-gray-200 h-12"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label className="mb-1 text-lg text-white font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-[280px] sm:w-80 pl-2 rounded-md border-2 border-gray-200 h-12"
              placeholder="example@example.com"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label className="mb-1 text-lg text-white font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-[280px] sm:w-80 pl-2 rounded-md border-2 border-gray-200 h-12"
              placeholder="Enter phone number"
            />
          </div>
          <div className="flex flex-col">
            <label className="mt-3 mb-1 text-lg text-white font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-[280px] sm:w-80 pl-2 rounded-md border-2 border-gray-200 h-12"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col">
            <label className="mt-3 mb-1 text-lg text-white font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-[280px] sm:w-80 pl-2 rounded-md border-2 border-gray-200 h-12"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center bg-[#fdb0be] h-12 w-[280px] sm:w-80 mt-8 mb-5 rounded-md text-white text-md font-semibold"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" color="white" /> : "Sign Up"}{" "}
          </button>
          <div className="text-center text-[16px]">
            <p>
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-[#fdb0be] underline underline-offset-1"
              >
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
