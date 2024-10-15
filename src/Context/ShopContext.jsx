import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const ShopContext = createContext();

export function ShopContextProvider({ children }) {
  const [likedProducts, setLikedProducts] = useState([]);
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    // Fetch liked products from the database
    const fetchLikedProducts = async () => {
      try {
        const response = await axios.get(
          "https://allureserver.onrender.com/api/likedproducts"
        );
        setLikedProducts(response.data);
        setLikedCount(response.data.filter((product) => product.liked).length);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };

    fetchLikedProducts();
  }, []);

  const toggleLike = async (id) => {
    try {
      const response = await axios.put(
        `https://allureserver.onrender.com/api/liketoggle/${id}`
      );
      const updatedLiked = response.data.liked;

      // Update state for liked products
      setLikedProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, liked: updatedLiked } : product
        )
      );

      // Update liked count
      setLikedCount((prevCount) =>
        updatedLiked ? prevCount + 1 : prevCount - 1
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <ShopContext.Provider value={{ likedProducts, likedCount, toggleLike }}>
      {children}
    </ShopContext.Provider>
  );
}
