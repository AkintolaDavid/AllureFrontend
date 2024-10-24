import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        "https://allureserver.onrender.com/api/forgotpassword",
        { email }
      );

      navigate("/signin");
      toast({
        title: response.data,
        description: "Check your mail for password reset link",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Invalid email provided",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center h-[85vh] bg-gradient-to-b from-[#FFDFEB] to-[#ffa2c4]">
      <Link to="/signin">
        <IoArrowBack className="absolute top-28 sm:top-40 md:top-44 left-10 sm:left-16 text-3xl md:text-4xl" />
      </Link>
      <div className="flex flex-col bg-[#ffffff] h-[300px] w-[80%] sm:w-[400px] md:w-[450px] items-center mt-20 md:mt-10 pt-4 pb-7 rounded-lg">
        <h2 className="text-xl sm:text-2xl text-[#fdb0be] font-semibold mt-2">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex flex-col mb-5">
            <label className="mt-5 mb-1 text-lg text-white font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-[280px] sm:w-80 pl-2 rounded-md border-2 border-gray-200 h-10"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center bg-[#fdb0be] h-10 w-[280px] sm:w-80 mt-5 mb-7 rounded-md text-white text-md font-semibold"
            disabled={loading} // Disable button while loading
          >
            {loading ? <Spinner size="sm" color="white" /> : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
