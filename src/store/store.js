// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice"; // Import the admin reducer
import likedProductsReducer from "./likedProductsSlice"; // Import the liked products reducer

const store = configureStore({
  reducer: {
    admin: adminReducer, // Add the admin reducer to the store
    likedProducts: likedProductsReducer, // Add the liked products reducer to the store
  },
});

export default store; // Export the store
