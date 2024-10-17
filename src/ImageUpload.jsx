import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export default function ImageUpload({ onImagesUploaded }) {
  const [selectedImages, setSelectedImages] = useState([]); // Store selected images for preview
  const [loading, setLoading] = useState(false); // Loading state
  const cloud_name = "dvdisnwqt"; // Your Cloudinary cloud name
  const upload_preset = "allure"; // Your Cloudinary upload preset
  const toast = useToast();

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files); // Get selected files
    const uploadedImages = []; // Array to hold uploaded image URLs
    const imageUrls = files.map((file) => URL.createObjectURL(file)); // Create local URLs for preview
    setSelectedImages(imageUrls); // Set the local image URLs
    setLoading(true); // Start loading

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);
        const token = localStorage.getItem("adminToken");
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,

          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          toast({
            title: "Upload failed",
            // description: "You have signed in successfully!",
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }

        const data = await response.json();
        uploadedImages.push(data.secure_url); // Push the URL of the uploaded image
      });

      await Promise.all(uploadPromises); // Wait for all uploads to complete
      onImagesUploaded(uploadedImages); // Pass the uploaded images to the parent component
      toast({
        title: "Images uploaded successfully!",
        // description: "You have signed in successfully!",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      }); // Alert on success
    } catch (error) {
      toast({
        title: "Images uploaded failed!",
        // description: "You have signed in successfully!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex flex-col">
      <h1>Image Upload</h1>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileUpload}
      />
      {/* Allow multiple file uploads */}
      {loading && <p>Uploading...</p>} {/* Loading message */}
      {selectedImages.length > 0 && (
        <div>
          <h2>Uploaded Images:</h2>
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={image} // Use the local URL here for preview
              alt={`Item Preview ${index + 1}`}
              style={{ width: "100px", height: "100px", margin: "5px" }} // Adjust dimensions as needed
            />
          ))}
        </div>
      )}
    </div>
  );
}
