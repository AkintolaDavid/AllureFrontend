import React, { useState } from "react";
import axios from "axios";
import img from "./assets/contact/bck.jpeg";
import { useToast, Spinner } from "@chakra-ui/react";
export default function Contact() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true during form submission

    try {
      // Send the data to the backend
      const response = await axios.post(
        "https://allureserver.onrender.com/api/contact",
        formData
      );
      if (response.status === 200) {
        toast({
          title: "Message sent successfully",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error.response && error.response.data) {
        toast({
          title: "Error",
          description: error.response.data,
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Something went wrong. Please try again.",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false); // Set loading to false after completion
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
        <div className="relative">
          <form onSubmit={handleSubmit}>
            <label className="flex items-center">
              <span className="w-24 text-md sm:text-lg">Name:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-10 w-60 sm:w-80 bg-white border-2 rounded-lg pl-3"
                required
              />
            </label>
            <br />
            <label className="flex items-center">
              <span className="w-24 text-md sm:text-lg">Email:</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="h-10 w-60 sm:w-80 bg-white border-2 rounded-lg pl-3"
                required
              />
            </label>
            <br />
            <label className="flex">
              <span className="w-24 mt-2 text-md sm:text-lg">Message:</span>
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
              className="bg-[#fab6c2] h-10 w-60 sm:w-80 text-white font-bold py-2 px-5 rounded-lg absolute right-0"
              disabled={loading} // Disable the button during loading
            >
              {loading ? <Spinner size="sm" color="white" /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
