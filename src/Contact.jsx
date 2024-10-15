import React, { useState } from "react";
import axios from "axios"; // Import axios
import img from "./assets/contact/bck.jpeg";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BiSolidFoodMenu } from "react-icons/bi";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Contact() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      // Send the data to the backend
      const response = await axios.post(
        "https://allureserver.onrender.com/api/contact",
        formData
      );
      toast({
        title: "Message sent Successful",
        // description: "You have signed in successfully!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({ name: "", email: "", message: "" }); // Clear the form after successful submission
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.response && error.response.data) {
        toast({
          title: "Message sent Successful",
          description: error.response.data,
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setError(error.response.data.message); // Display error message from backend
      } else {
        toast({
          title: "Something went wrong. Please try again.",
          description: error.response.data,
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full">
        <img
          src={img}
          alt="alt"
          className="w-full h-40 sm:h-60 md:h-80 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-3 sm:p-4 bg-black text-white text-2xl md:text-3xl font-semibold bg-opacity-70">
          GET IN TOUCH
        </div>
      </div>
      <div className="mt-10 mb-7 flex flex-col-reverse gap-10 md:flex-row md:gap-28 lg:gap-60">
        {/* <div className="flex flex-col text-md sm:text-lg gap-3 mt-10 md:mt-0">
          <div className="flex items-center gap-3">
            <FaPhoneAlt /> <span>08069709910</span>
          </div>
          <div className="flex items-center gap-3">
            <IoMdMail /> <span>allurebeauty@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <BiSolidFoodMenu />{" "}
            <span className="underline underline-offset-1">
              <Link to="/sizeguide">Look at our Size Guide</Link>
            </span>
          </div>
        </div> */}

        <div className="relative">
          <form onSubmit={handleSubmit}>
            <label className="flex items-center">
              <span className="w-20 text-md sm:text-lg"> Name:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-7 w-60 sm:w-80 bg-white border-2 rounded-lg pl-3"
                required
              />
            </label>
            <br />
            <label className="flex items-center">
              <span className="w-20 text-md sm:text-lg"> Email:</span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="h-7 w-60 sm:w-80 bg-white border-2 rounded-lg pl-3"
                required
              />
            </label>
            <br />
            <label className="flex">
              <span className="w-20 mt-2 text-md sm:text-lg"> Message:</span>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-60 sm:w-80 h-20 bg-white border-2 rounded-lg pl-3 pt-1"
                required
              />
            </label>
            <br />
            <button
              type="submit"
              className="bg-[#fab6c2] text-white font-bold py-2 px-5 rounded-lg absolute right-0"
            >
              Submit
            </button>
          </form>
          {error && <p className="text-red-600">{error}</p>}{" "}
          {/* Display error message */}
          {success && <p className="text-green-600">{success}</p>}{" "}
          {/* Display success message */}
        </div>
      </div>
    </div>
  );
}
