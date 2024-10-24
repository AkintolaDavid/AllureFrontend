import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react"; // Import Spinner from Chakra UI

const AdminRequestOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const toast = useToast();

  const sendOTP = async () => {
    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.post(
        "https://allureserver.onrender.com/api/send-otp",
        { email }
      );

      if (response.data.success) {
        toast({
          title: response.data.message,
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/adminverifyotp"); // Navigate to OTP verification page
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || "An error occurred.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  return (
    <div className="flex justify-center h-[85vh] bg-gradient-to-b from-[#FFDFEB] to-[#ffa2c4]">
      <div className="flex flex-col bg-[#ffffff] h-[300px] w-[80%] sm:w-[400px] md:w-[450px] items-center mt-20 md:mt-10 pt-4 pb-7 rounded-lg">
        <span className="text-xl sm:text-2xl text-[#fdb0be] font-semibold mt-2">
          Admin Login
        </span>
        <div className="flex flex-col mb-5">
          <label className="mt-5 mb-1 text-lg text-white font-medium">
            Enter email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[280px] sm:w-80 pl-2 rounded-md border-2 border-gray-200 h-10"
            required
          />
        </div>
        <button
          onClick={sendOTP}
          disabled={loading} // Disable button while loading
          className="flex items-center justify-center bg-[#fdb0be] h-10 w-[280px] sm:w-80 mt-5 mb-7 rounded-md text-white text-md font-semibold"
        >
          {loading ? (
            <Spinner size="sm" color="white" /> // Show spinner while loading
          ) : (
            "Send OTP"
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminRequestOtp;
