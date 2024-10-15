// ResetPassword.js

import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useToast } from "@chakra-ui/react";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://allureserver.onrender.com/api/reset-password/${token}`,
        {
          newPassword,
        }
      );
      toast({
        title: response.data,
        // description: "You have signed in successfully!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/signin");
    } catch (error) {
      toast({
        title: error.response.data,
        // description: "You have signed in successfully!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex justify-center h-[85vh]  bg-gradient-to-b from-[#FFDFEB] to-[#ffa2c4]">
      <Link to="/signin">
        <IoArrowBack className="absolute top-28 sm:top-40 md:top-44 left-10 sm:left-16 text-3xl md:text-4xl" />
      </Link>
      <div className="flex flex-col [#ffffff] h-[300px]  w-[80%] sm:w-[400px] md:w-[450px] items-center  mt-20 md:mt-10  pt-4 pb-7 rounded-lg">
        <h2 className="text-2xl text-white font-semibold">Reset Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex flex-col">
            <label className="mt-5 mb-1 text-lg text-white font-medium">
              New password
            </label>{" "}
            <input
              type="password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-[280px] sm:w-80 pl-2  rounded-lg h-8"
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center bg-white p-2 w-36 sm:w-44 mt-8 mb-7 rounded-lg text-[#fdb0be] text-md sm:text-lg font-semibold"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
