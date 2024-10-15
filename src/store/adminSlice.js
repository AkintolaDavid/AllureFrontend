// src/store/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdminVerified: false,
  },
  reducers: {
    verifyAdmin: (state) => {
      state.isAdminVerified = true; // Update the state to reflect that the admin is verified
    },
    logoutAdmin: (state) => {
      state.isAdminVerified = false; // Reset the admin verification state
    },
  },
});

export const { verifyAdmin, logoutAdmin } = adminSlice.actions; // Export actions for use in components
export default adminSlice.reducer; // Export the reducer for the store
