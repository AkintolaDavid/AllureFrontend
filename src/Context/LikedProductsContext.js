import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
const LikedProductsContext = createContext();

// Custom hook for using the liked items context
export const useLikedItems = () => {
  return useContext(LikedProductsContext);
};

// Provider component
export const LikedProductsProvider = ({ children }) => {
  const [likedItems, setLikedItems] = useState(() => {
    // Initialize state from localStorage
    const storedItems = localStorage.getItem("likedItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const toggleLike = (item) => {
    setLikedItems((prev) => {
      const isLiked = prev.some((likedItem) => likedItem._id === item._id);
      if (isLiked) {
        return prev.filter((likedItem) => likedItem._id !== item._id);
      }
      return [...prev, item];
    });
  };

  // Save liked items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  }, [likedItems]);

  return (
    <LikedProductsContext.Provider value={{ likedItems, toggleLike }}>
      {children}
    </LikedProductsContext.Provider>
  );
};
