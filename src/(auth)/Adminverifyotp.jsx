import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { verifyAdmin } from "../store/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import { useToast, Spinner } from "@chakra-ui/react"; // Import Spinner from Chakra UI

const AdminVerifyOtp = () => {
  const dispatch = useDispatch();
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const toast = useToast();
  const navigate = useNavigate();

  const verifyOTP = async () => {
    const otp = otp1 + otp2 + otp3 + otp4;
    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await axios.post(
        "https://allureserver.onrender.com/api/verify-otp",
        { otp }
      );

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        toast({
          title: response.data.message,
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        dispatch(verifyAdmin());
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
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  const handleOtpChange =
    (setOtp, currentIndex, nextFieldId, prevFieldId) => (e) => {
      const value = e.target.value;

      // If the input is empty and we are deleting a character
      if (value === "" && currentIndex > 0) {
        // Focus on the previous field
        document.getElementById(prevFieldId).focus();
        setOtp(value);
        return; // Exit early
      }

      setOtp(value);
      // If the value is not empty and there's a next field, focus on it
      if (value && nextFieldId) {
        document.getElementById(nextFieldId).focus();
      }
    };
  return (
    <div className="flex justify-center h-[85vh] bg-gradient-to-b from-[#FFDFEB] to-[#ffa2c4]">
      <div className="flex flex-col bg-[#ffffff] h-[300px] w-[80%] sm:w-[400px] md:w-[450px] items-center mt-20 md:mt-10 pt-4 pb-7 rounded-lg">
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
            onChange={handleOtpChange(setOtp1, 0, "otp2", null)} // No previous field for the first input
            maxLength="1"
            className="w-10 h-10 text-center text-2xl border-2 border-gray-300 rounded-md"
          />
          <input
            id="otp2"
            type="text"
            value={otp2}
            onChange={handleOtpChange(setOtp2, 1, "otp3", "otp1")}
            maxLength="1"
            className="w-10 h-10 text-center text-2xl border-2 border-gray-300 rounded-md"
          />
          <input
            id="otp3"
            type="text"
            value={otp3}
            onChange={handleOtpChange(setOtp3, 2, "otp4", "otp2")}
            maxLength="1"
            className="w-10 h-10 text-center text-2xl border-2 border-gray-300 rounded-md"
          />
          <input
            id="otp4"
            type="text"
            value={otp4}
            onChange={handleOtpChange(setOtp4, 3, null, "otp3")} // No next field for the last input
            maxLength="1"
            className="w-10 h-10 text-center text-2xl border-2 border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={verifyOTP}
          disabled={loading} // Disable button while loading
          className="flex items-center justify-center bg-[#fdb0be] h-10 w-[280px] sm:w-80 mt-9 mb-4 rounded-md text-white text-md font-semibold"
        >
          {loading ? (
            <Spinner size="sm" color="white" /> // Show spinner while loading
          ) : (
            "Verify OTP"
          )}
        </button>
        <div className="text-center">
          <p>
            Didn't receive OTP?
            <Link
              to="/adminrequestotp"
              className="text-[#fdb0be] underline underline-offset-1 ml-2"
            >
              Click to request again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminVerifyOtp;
