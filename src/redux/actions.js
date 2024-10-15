// src/redux/actions.js

// Action to remove a liked product by its ID
export const removeLikedProduct = (id) => {
  return {
    type: "REMOVE_LIKED_PRODUCT",
    payload: id,
  };
};
