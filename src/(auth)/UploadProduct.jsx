import React, { useState, useRef } from "react";
import axios from "axios";
import { Textarea, useToast } from "@chakra-ui/react";
import upload from "../assets/images/cloud1-300x300.png";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const UploadProduct = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const inputRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove the token from localStorage
    toast({
      title: "Admin logged out successfully",
      position: "top-right",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/adminrequestotp"); // Redirect to OTP verification page
  };

  const handleImageUpload = async (files) => {
    const uploadedImages = [];
    console.log("Files to upload: ", files); // Log the files selected

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "allure"); // Cloudinary preset
      const token = localStorage.getItem("adminToken");
      console.log(token);
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dvdisnwqt/image/upload",
          formData
        );
        console.log("Uploaded image URL:", res.data.secure_url); // Log each uploaded URL
        uploadedImages.push(res.data.secure_url); // Push Cloudinary image URL to array
      } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
      }
    }
    return uploadedImages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Images before uploading:", images); // Check images before uploading

    setLoading(true); // Set loading to true before starting upload
    const uploadedImageURLs = await handleImageUpload(images); // Upload images to Cloudinary first
    console.log("Uploaded image URLs:", uploadedImageURLs); // Log the final URLs

    const productData = {
      name,
      price,
      category,
      gender,
      images: uploadedImageURLs, // Send Cloudinary URLs to the backend
      description,
    };

    try {
      const response = await axios.post(
        "https://allureserver.onrender.com/api/uploadproducts",
        productData
      );
      setCategory("");
      setImages([]);
      setName("");
      setGender("");
      setPrice("");
      setDescription("");
      if (inputRef.current) {
        inputRef.current.value = null; // Clear file input
      }
      toast({
        title: "Product uploaded successfully",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      alert(
        "Error uploading product: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false); // Set loading to false after upload completion
    }
  };

  const handlecustomizationorder = () => {
    navigate("/adminpage");
  };
  const handlecartorders = () => {
    navigate("/cartorders");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center bg-gradient-to-b from-[#fae6ed] to-[#ffa2c4]  h-[90vh]  "
    >
      <div className="flex w-full justify-end">
        <button
          onClick={handleLogout}
          className="p-2 bg-red-400 flex text-white items-center gap-1 text-2xl rounded-md mt-2 mr-2"
        >
          <HiOutlineLogout /> Logout
        </button>
      </div>
      <div className="h-[50px] flex w-[80%] sm:w-[60%] rounded-md border-[1px] mb-7 mt-4">
        <button
          onClick={handlecustomizationorder}
          className="flex items-center justify-center px-4 rounded-[4px] py-2 border-[#EEEEEE] w-[50%]  bg-[#ffffff] text-[#000000]"
        >
          Customization Orders
        </button>
        <button className="flex items-center justify-center px-4 rounded-[4px] py-2 border-[#EEEEEE] w-[50%] bg-[#ffa2c4] text-white">
          Upload product
        </button>
        <button
          onClick={handlecartorders}
          className="flex items-center justify-center px-4 rounded-[4px] py-2 border-[#EEEEEE] w-[50%] bg-[#ffffff] text-[#000000]"
        >
          Cart Product Orders
        </button>
      </div>
      <div className="flex flex-col  w-[90%] sm:w-[550px]">
        <label className=" mb-1 text-lg text-white font-medium">
          Enter Product Name
        </label>
        <input
          type="text"
          name="productname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full pl-2 rounded-lg h-8"
          placeholder="Product Name"
        />
      </div>
      <div className="flex flex-col  w-[90%] sm:w-[550px]">
        <label className="mt-5 mb-1 text-lg text-white font-medium">
          Enter Product Price
        </label>
        <input
          type="text"
          name="productprice"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full pl-2 rounded-lg h-8"
          placeholder="Product Price"
        />
      </div>

      <div className="flex flex-col  w-[90%] sm:w-[550px]  ">
        <label className="mt-5 mb-1 text-lg text-white font-medium">
          Select Gender
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className=" pl-2 border-[1.5px] border-[#525252] rounded-lg h-8 text-[#525252]"
        >
          <option value="">Select gender</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </div>

      <div className="flex flex-col  w-[90%] sm:w-[550px]  ">
        <label className="mt-5 mb-1 text-lg text-white font-medium">
          Select Product Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className=" pl-2 border-[1.5px] border-[#525252] rounded-lg h-8  text-[#525252]"
        >
          <option value="">Pick a jewelry Category</option>
          <option value="rings">Ring</option>
          <option value="necklace">Necklace</option>
          <option value="earrings">Earrings</option>
          <option value="bracelet">Bracelet</option>
          <option value="watch">Watch</option>
        </select>
      </div>
      <div className="flex flex-col  w-[90%] sm:w-[550px]">
        <label className="mt-5 mb-1 text-lg text-white font-medium">
          Enter Product Description
        </label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="pl-2 border-[1.5px] border-[#525252] rounded-lg text-[#525252]"
          required
        />
      </div>
      <div className="flex flex-col items-center gap-4 mt-6">
        <label
          htmlFor="file-upload"
          className="cursor-pointer px-6 py-2 bg-white text-black rounded-md shadow-md flex flex-col items-center "
        >
          Click to Upload Image
          <img src={upload} alt="upload" className="h-24" />
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)} // Capture selected files
          required
          className="hidden"
          ref={inputRef}
        />
        {images.length > 0 && (
          <div>
            <h3 className="text-white text-lg">Selected Images:</h3>
            <ul className="flex flex-wrap">
              {Array.from(images).map((image, index) => (
                <li
                  key={index}
                  className="w-16 h-16 border-2 border-gray-300 m-1"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        type="submit"
        className={`mt-5 w-[90%] sm:w-[550px] py-2 bg-[#ff7f4a] rounded-lg text-white ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Uploading..." : "Upload Product"}
      </button>
      {loading && (
        <div className="mt-4 text-white">Loading, please wait...</div>
      )}
    </form>
  );
};

export default UploadProduct;
