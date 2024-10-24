import React, { useState } from "react";
import ImageUpload from "./ImageUpload"; // Assuming ImageUpload handles image upload
import watch1 from "./assets/inspogallery/watch1.jpg";
import watch2 from "./assets/inspogallery/watch2.jpg";
import ring1 from "./assets/inspogallery/ring1.jpg";
import ring2 from "./assets/inspogallery/ring2.jpg";
import neck1 from "./assets/inspogallery/neck1.jpg";
import neck2 from "./assets/inspogallery/neck2.jpg";
import brac1 from "./assets/inspogallery/brac1.jpg";
import brac2 from "./assets/inspogallery/brac2.jpg";
import "./customjewelry.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast, Spinner } from "@chakra-ui/react";
export default function CustomizeJewelry({
  minPrice = 0,
  maxPrice = 100000,
  onPriceChange,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [BUDGET, setBUDGET] = useState(0);
  const [maxValue, setMaxValue] = useState(maxPrice);
  const [engraving, setEngraving] = useState("no");
  const [jewelryType, setJewelryType] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [engravingText, setEngravingText] = useState("");
  const [engravingPart, setEngravingPart] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [fontStyle, setFontStyle] = useState("");
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]); // State for uploaded images
  const handleImagesUploaded = (images) => {
    setUploadedImages(images); // Update state with the uploaded images
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    const data = {
      BUDGET,
      engraving,
      jewelryType,
      materialType,
      engravingText,
      engravingPart,
      moreInfo,
      fontStyle,
      fullname,
      email,
      phonenumber,
      images: uploadedImages, // Include the uploaded images in the data
    };

    const token = localStorage.getItem("token");
    // alert("Token received:", token);
    if (!/^\d{11}$/.test(data.phonenumber)) {
      return toast({
        title: "Invalid phone number",
        description: "Please enter a valid 11-digit phone number.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      return toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    try {
      const response = await axios.post(
        "https://allureserver.onrender.com/api/customizejewelry",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: response.data.message,
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
      // Clear form fields upon successful submission
      if (response.data.data.images || response.data.data.images.length > 0) {
        // Reset state values here
        setBUDGET(0);
        setEngraving("no");
        setJewelryType("");
        setMaterialType("");
        setEngravingText("");
        setEngravingPart("");
        setMoreInfo("");
        setFontStyle("");
        setfullname("");
        setemail("");
        setphonenumber("");
        setUploadedImages([]); // Clear uploaded images
      } else {
        toast({
          title: "Image upload failed",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      if (error.message) {
        toast({
          title: "Please login before submitting form",
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

  const handleMinChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice);
    setBUDGET(value);
    if (onPriceChange) onPriceChange(value, maxValue);
  };

  const handleEngravingChange = (e) => {
    setEngraving(e.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-[#eec0c9] pb-10">
      <span className="text-center w-[320px] sm:w-[400px] md:w-[full] text-xl sm:text-2xl md:text-[28px] text-white font-semibold h-24 md:h-28 flex items-center">
        Customize your jewelry with Allure Beauty Jewelry Store
      </span>
      <Link to="https://www.pinterest.com/search/pins/?rs=ac&len=2&q=engraved%20jewelry&eq=engraved%20je&etslf=5457">
        <div className="relative grid grid-cols-4 w-[full]">
          <img
            src={neck1}
            alt="necklace"
            className="w-[100%] h-[100%] sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-tl-xl"
          />
          <img
            src={watch1}
            alt="watch"
            className="w-[100%] h-[100%] sm:w-32 sm:h-32 md:w-40 md:h-40"
          />
          <img
            src={ring1}
            alt="ring"
            className="w-[100%] h-[100%] sm:w-32 md:w-40 sm:h-32 md:h-40"
          />
          <img
            src={brac1}
            alt="bracelet"
            className="w-[100%] h-[100%] sm:w-32 md:w-40 sm:h-32 md:h-40 rounded-tr-xl"
          />
          <img
            src={brac2}
            alt="bracelet"
            className="w-[100%] h-[100%] sm:w-32 md:w-40 sm:h-32 md:h-40 rounded-bl-xl"
          />
          <img
            src={ring2}
            alt="ring"
            className="w-[100%] h-[100%] sm:w-32 md:w-40 sm:h-32 md:h-40"
          />
          <img
            src={watch2}
            alt="watch"
            className="w-[100%] h-[100%] sm:w-32 md:w-40 sm:h-32 md:h-40"
          />
          <img
            src={neck2}
            alt="necklace"
            className="w-[100%] h-[100%] sm:w-32 md:w-40 sm:h-32 md:h-40 rounded-br-xl"
          />
          <div className="absolute bottom-[40%] bg-black opacity-80 w-[100%] sm:left-[0%] text-center text-white text-md sm:text-lg md:text-xl rounded-xl border-2 border-white p-1">
            Click to explore other customization inspiration
          </div>
        </div>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
        {/* Jewelry Type Selection */}
        <div className="flex items-center mt-10 mb-10 w-[90%] sm:w-[550px] justify-between">
          <div className="text-white text-md sm:text-lg md:text-xl">
            Select type of Jewelry you want:
          </div>
          <select
            value={jewelryType}
            onChange={(e) => setJewelryType(e.target.value)}
            className="text-[#525252] ml-3 pl-2 border-[1.5px] border-[#525252] rounded-lg h-8 w-48"
          >
            <option value="">Pick a jewelry type</option>
            <option value="Ring">Ring</option>
            <option value="Necklace">Necklace</option>
            <option value="Earrings">Earrings</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Watch">Watch</option>
          </select>
        </div>

        {/* Material Type Selection */}
        <div className="flex items-center mb-8 w-[90%] sm:w-[550px] justify-between">
          <div className="text-white text-md sm:text-lg md:text-xl">
            Select type of Material you want:
          </div>
          <select
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            className="ml-3 pl-2 border-[1.5px] border-[#525252] text-[#525252] rounded-lg h-8 w-48"
          >
            <option value="">Pick a material type</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
            <option value="Diamond">Diamond</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="w-[80%] sm:w-[480px] md:w-[600px] mt-4 mb-10 items-center gap-10">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white text-center">
            Set your budget(N)
          </h3>
          <div className="flex items-center justify-center">
            <input
              type="range"
              className="h-2 bg-gray-200 rounded-lg cursor-pointer"
              min={setBUDGET}
              max={maxPrice}
              value={BUDGET}
              onChange={handleMinChange}
              style={{ cursor: "url(path/to/white-cursor.png), auto" }}
            />
          </div>
          <div className="flex flex-col items-center">
            <input
              type="number"
              className="mt-3 text-[#3d3d3d] pl-[30px] w-[100px] border-[#525252] border-[1.5px] rounded-lg h-8"
              placeholder="Min"
              value={BUDGET}
              onChange={handleMinChange}
            />
            {/* <input
              type="number"
              className="mt-3 text-[#3d3d3d] pl-[30px] w-[100px] border-[#525252] border-[1.5px] rounded-lg h-8"
              placeholder="Max"
              value={maxValue}
              onChange={(e) => setMaxValue(Number(e.target.value))}
            /> */}
          </div>
        </div>

        {/* Engraving Options */}
        <div className="flex justify-between items-center w-[90%] sm:w-[550px] mb-8">
          <div className="text-white text-md sm:text-lg md:text-xl">
            Engrave your jewelry?
          </div>
          <select
            value={engraving}
            onChange={handleEngravingChange}
            className="ml-3 pl-2 border-[1.5px] border-[#525252] rounded-lg h-8 w-32 text-[#525252]"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Engraving Text and Part Selection */}
        {engraving === "yes" && (
          <div className="flex flex-col items-center mb-8 w-[90%] sm:w-[550px]">
            <input
              type="text"
              placeholder="Enter your engraving text"
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              className="border-[#525252] border-[1.5px] rounded-lg h-8 pl-2 w-full"
            />
            <select
              value={engravingPart}
              onChange={(e) => setEngravingPart(e.target.value)}
              className="mt-8 pl-2 mb-8 border-[1.5px] border-[#525252] rounded-lg h-8 w-full text-[#525252]"
            >
              <option value="">Select engraving part</option>
              <option value="front">Front</option>
              <option value="back">Back</option>
              <option value="inside">Inside</option>
              <option value="outside">Outside</option>
            </select>
            {/* More Info Section */}
            <div className="flex flex-col items-center mb-8 w-[90%] sm:w-[550px]">
              <textarea
                placeholder="More information"
                value={moreInfo}
                onChange={(e) => setMoreInfo(e.target.value)}
                className="border-[#525252] border-[1.5px] rounded-lg pl-2 h-20 w-full"
              />
            </div>
            {/* Font Style Selection */}
            <div className="flex flex-col items-center mb-8 w-[90%] sm:w-[550px]">
              <select
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                className=" pl-2 border-[1.5px] border-[#525252] rounded-lg h-8 w-full text-[#525252]"
              >
                <option value="">Select font style</option>
                <option value="cursive">Cursive</option>
                <option value="serif">Serif</option>
                <option value="sans-serif">Sans-serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
          </div>
        )}

        {/* Image Upload Component */}
        <ImageUpload onImagesUploaded={handleImagesUploaded} />
        <div className="flex flex-col  w-[90%] sm:w-[550px]">
          <label className="mt-5 mb-1 text-lg text-white font-medium">
            Fullname
          </label>
          <input
            type="text"
            name="Fullname"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
            required
            className="w-full pl-2 rounded-lg h-8"
            placeholder="enter fullname"
          />
        </div>
        <div className="flex flex-col  w-[90%] sm:w-[550px]">
          <label className="mt-5 mb-1 text-lg text-white font-medium">
            Phone number
          </label>
          <input
            type="phonenumber"
            name="phonenumber"
            value={phonenumber}
            onChange={(e) => setphonenumber(e.target.value)}
            required
            className="w-full pl-2 rounded-lg h-8"
            placeholder="enter phone number"
          />
        </div>
        <div className="flex flex-col  w-[90%] sm:w-[550px]">
          <label className="mt-5 mb-1 text-lg text-white font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            className="w-full pl-2 rounded-lg h-8"
            placeholder="enter email"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 w-[80%] sm:w-[300px] bg-white text-black rounded-lg h-10 font-bold hover:bg-gray-200"
        >
          {loading ? (
            <Spinner size="sm" color="white" />
          ) : (
            " Submit Customization"
          )}{" "}
        </button>
      </form>
    </div>
  );
}
