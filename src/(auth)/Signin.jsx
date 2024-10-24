import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useToast, Spinner } from "@chakra-ui/react";

const Signin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        "https://allureserver.onrender.com/api/login",
        formData
      );

      // Assuming your backend sends a token, fullName, and email on successful login
      const { token, fullName, email } = response.data;

      // Store token, fullName, and email in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("fullName", JSON.stringify({ fullName }));
      localStorage.setItem("email", email); // Save the user's email in local storage

      setFormData({
        email: "",
        password: "",
      });
      toast({
        title: "Login Successful",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Delay navigation to allow message to be visible
      setTimeout(() => {
        navigate("/"); // Redirect to home
      }, 1000); // Change the duration (in milliseconds) as needed
    } catch (error) {
      // Handle different types of errors from the backend
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;

        if (errorMessage === "Email not registered") {
          toast({
            title: "Login Failed",
            description: "Email is not registered.",
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else if (errorMessage === "Invalid password") {
          toast({
            title: "Login Failed",
            description: "Password is incorrect.",
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          // General error toast
          toast({
            title: "Login Failed",
            description: "An error occurred during login. Please try again.",
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        // Handle case where server is unreachable or no response received
        toast({
          title: "Server Error",
          description:
            "Could not connect to the server. Please try again later.",
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
    <div className="flex justify-center h-[85vh] bg-gradient-to-b from-[#FFDFEB] to-[#ffa2c4]">
      <Link to="/">
        <IoArrowBack className="absolute top-28 sm:top-40 md:top-44 left-10 sm:left-16 text-3xl md:text-4xl" />
      </Link>
      <div className="flex flex-col bg-[#ffffff] h-[420px] w-[80%] sm:w-[400px] md:w-[450px] items-center mt-20 md:mt-10 pt-4 pb-7 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full items-center"
        >
          <h2 className="text-xl sm:text-2xl text-[#fdb0be] font-semibold mt-3">
            Sign In To Your Account
          </h2>

          <div className="flex flex-col ">
            <label className="mt-3 mb-1 text-lg text-white font-medium ">
              Email
            </label>
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

          <div className="flex flex-col ">
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
            <div className="w-full mt-2">
              <span className="text-[16px] flex justify-end text-[#fdb0be] underline underline-offset-1">
                <Link to="/forgot-password"> Forgot password?</Link>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center bg-[#fdb0be] h-12 w-[280px] sm:w-80 mt-5 mb-7 rounded-md text-white text-md font-semibold"
            disabled={loading} // Disable button when loading
          >
            {loading ? <Spinner size="sm" color="white" /> : "Sign In"}{" "}
            {/* Show spinner or text */}
          </button>

          <div className="text-[16px] text-center">
            <p>
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-[#fdb0be] underline underline-offset-1"
              >
                Sign up here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
