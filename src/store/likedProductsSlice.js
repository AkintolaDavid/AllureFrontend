// src/store/likedProductsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const likedProductsSlice = createSlice({
  name: "likedProducts",
  initialState: {
    liked: Array.isArray(JSON.parse(localStorage.getItem("likedProducts")))
      ? JSON.parse(localStorage.getItem("likedProducts"))
      : [], // Ensure it's an array
    count: 0,
  },
  reducers: {
    addLikedProduct: (state, action) => {
      state.liked.push(action.payload); // Push to the liked array
      state.count += 1; // Increment count
      localStorage.setItem("likedProducts", JSON.stringify(state.liked)); // Save to local storage
    },
    removeLikedProduct: (state, action) => {
      const filteredLiked = state.liked.filter(
        (product) => product._id !== action.payload._id
      );
      state.count -= 1; // Decrement count
      state.liked = filteredLiked; // Update liked products
      localStorage.setItem("likedProducts", JSON.stringify(filteredLiked)); // Update local storage
    },
    setLikedProducts: (state, action) => {
      state.liked = action.payload;
      state.count = action.payload.length; // Update count
    },
  },
});

export const { addLikedProduct, removeLikedProduct, setLikedProducts } =
  likedProductsSlice.actions;
export default likedProductsSlice.reducer;
