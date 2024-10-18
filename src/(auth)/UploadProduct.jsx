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
  const inputRef = useRef(null);
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove the token from localStorage
    toast({
      title: "Admin logged out successfully",
      // description: "You have signed in successfully!",
      position: "top-right",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/adminrequestotp"); // Redirect to OTP verification page
  };
  // Debugging: Check if the files are being captured correctly
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
          // {
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
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
    }
  };
  const handlecustomizationorder = () => {
    navigate("/adminpage");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center bg-gradient-to-b from-[#fae6ed] to-[#ffa2c4]  h-[90vh]  "
    >
      <div className="flex w-full justify-end">
        {" "}
        <button
          onClick={handleLogout}
          className="p-2 bg-red-400 flex text-white items-center gap-1 text-2xl rounded-md mt-2 mr-2"
        >
          <HiOutlineLogout /> Logout
        </button>
      </div>
      <div className="h-[50px] flex w-[80%] sm:w-[60%] rounded-md border-[1px] mb-7  mt-4">
        <button
          onClick={handlecustomizationorder}
          className="flex items-center justify-center px-4 rounded-[4px] py-2 border-[#EEEEEE] w-[50%]  bg-[#ffffff] text-[#000000]"
        >
          Customization Orders
        </button>
        <button
          // onClick={handleuploadproduct}
          className="flex items-center justify-center px-4 rounded-[4px] py-2 border-[#EEEEEE] w-[50%] bg-[#ffa2c4] text-white"
        >
          Upload product
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
        />{" "}
      </div>
      <div className="flex flex-col items-center gap-4 mt-6">
        <label
          htmlFor="file-upload"
          className="cursor-pointer px-6 py-2 bg-white text-black rounded-md shadow-md flex flex-col items-center "
        >
          Click to Upload Image
          <img src={upload} alt="sss" className="h-24" />
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)} // Capture selected files
          required
          className="hidden" // Hide the default input appearance
        />
        {images && images.length > 0 && (
          <p className="text-sm text-gray-500">
            {images.length} file(s) selected
          </p>
        )}
      </div>

      <button type="submit" className="bg-white p-4 mt-7 rounded-lg">
        Upload Product
      </button>
    </form>
  );
};

export default UploadProduct;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ShopCategory = ({ category, banner }) => {
//   const [products, setProducts] = useState([]);

//   // Fetch products by category when the component mounts
//   useEffect(() => {
//     const fetchProductsByCategory = async () => {

//         console.log(response.data.products);
//         // Assuming 'category' is the selected category
//         console.log(category);
//         setProducts(
//           response.data.products.filter((item) => {
//             // If the selected category is 'men' or 'women', filter by gender
//             if (category === "men" || category === "women") {
//               return item.gender === category;
//             }

//             return item.category === category;
//           })
//         );

//         console.log(category);
//       } catch (error) {
//         console.error("Error fetching products by category", error);
//       }
//     };

//     fetchProductsByCategory();
//   }, [category]);

//   return (
//     <div className="flex flex-col items-center justify-center w-full">
//       {/* Display category banner */}
//       <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96">
//         <img
//           className="h-full w-full object-cover"
//           src={banner}
//           alt={`${category} banner`}
//         />
//       </div>

//       <h1 className="category-title">
//         {category.charAt(0).toUpperCase() + category.slice(1)} Collection
//       </h1>

//       {/* Display products */}
//       <div className="product-grid">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product._id} className="product-card">
//               <img src={product.images[0]} alt={product.name} />
//               <h2>{product.name}</h2>
//               <p>${product.price}</p>
//               <p>{product.gender === "men" ? "Men's" : "Women's"} Jewelry</p>
//             </div>
//           ))
//         ) : (
//           <p>No products found in this category</p>
//         )}
//       </div>
//     </div>
//   );
// };
