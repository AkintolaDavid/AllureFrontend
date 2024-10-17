import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { verifyAdmin } from "../store/adminSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const AdminVerifyOtp = ({ onVerify }) => {
  const dispatch = useDispatch();
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const verifyOTP = async () => {
    const otp = otp1 + otp2 + otp3 + otp4; // Combine all OTP inputs

    try {
      const response = await axios.post(
        "https://allureserver.onrender.com/api/verify-otp",
        { otp }
      );
      if (response.data.success) {
        console.log(response.data.token);
        localStorage.setItem("adminToken", response.data.token); // Store token
        toast({
          title: response.data.message,
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        dispatch(verifyAdmin()); // Dispatch the verifyAdmin action
        navigate("/adminpage");
      } else {
        toast({
          title: "Invalid OTP. Please try again.",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error verifying OTP. Please try again.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error during OTP verification:", error);
    }
  };

  // Function to move to the next input field when a digit is entered
  const handleOtpChange = (setOtp, nextFieldId) => (e) => {
    setOtp(e.target.value);
    if (e.target.value && nextFieldId) {
      document.getElementById(nextFieldId).focus(); // Move to next input field
    }
  };

  return (
    <div className="flex justify-center h-[85vh]  bg-gradient-to-b from-[#FFDFEB] to-[#ffa2c4]">
      <div className="flex flex-col  bg-[#ffffff] h-[300px]  w-[80%] sm:w-[400px] md:w-[450px] items-center  mt-20 md:mt-10  pt-4 pb-7 rounded-lg">
        <span className="text-xl sm:text-2xl text-[#fdb0be] font-semibold mt-2">
          Admin OTP Verification
        </span>
        <p className="text-md text-[#ff1943] font-medium mt-2">
          An OTP has been sent. Please enter it below:
        </p>
        <div className="flex gap-4 mt-8">
          <input
            id="otp1"
            type="text"
            value={otp1}
            onChange={handleOtpChange(setOtp1, "otp2")}
            maxLength="1"
            className="w-10 h-10 text-center text-2xl border-2 border-gray-300 rounded-md"
          />
          <input
            id="otp2"
            type="text"
            value={otp2}
            onChange={handleOtpChange(setOtp2, "otp3")}
            maxLength="1"
            className="w-10 h-10 text-center text-2xl border-2 border-gray-300 rounded-md"
          />
          <input
            id="otp3"
            type="text"
            value={otp3}
            onChange={handleOtpChange(setOtp3, "otp4")}
            maxLength="1"
            className="w-10 h-10 text-center text-2xl border-2 border-gray-300 rounded-md"
          />
          <input
            id="otp4"
            type="text"
            value={otp4}
            onChange={(e) => setOtp4(e.target.value)}
            maxLength="1"
            className="w-10 h-10 text-center text-2xl border-2 border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={verifyOTP}
          className="flex items-center justify-center bg-[#fdb0be] h-10 w-[280px] sm:w-80 mt-9 mb-4 rounded-md text-white text-md font-semibold"
        >
          Verify OTP
        </button>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <div className="text-center">
          <p>
            Didn't receive otp?
            <a
              href="/adminrequestotp"
              className="text-[#fdb0be] underline underline-offset-1 ml-2"
            >
              Click to request again
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminVerifyOtp;
