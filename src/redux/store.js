// src/redux/store.js

import { createStore, combineReducers } from "redux";
import likedProductsReducer from "./reducer"; // Adjust the import path as needed

// Combine reducers if you have more than one
const rootReducer = combineReducers({
  likedProducts: likedProductsReducer,
  // Add other reducers here
});

// Create Redux store
const store = createStore(rootReducer);

export default store;
