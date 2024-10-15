// src/redux/reducer.js

const initialState = {
  liked: [],
};

// Reducer function to manage liked products state
const likedProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_LIKED_PRODUCT":
      return {
        ...state,
        liked: state.liked.filter((product) => product.id !== action.payload),
      };
    // Add other cases as necessary (e.g., ADD_LIKED_PRODUCT)
    default:
      return state;
  }
};

export default likedProductsReducer;
