import React from "react";
import { useLikedItems } from "./Context/LikedProductsContext";
import { Link } from "react-router-dom"; // Import Link for navigation
import { TbCurrencyNaira } from "react-icons/tb";
const Items = ({ id, name, image, price, description }) => {
  const { likedItems, toggleLike } = useLikedItems();
  const liked = likedItems.some((item) => item._id === id); // Use unique identifier

  return (
    <div className="border-[2px] w-[200px] sm:w-[270px] rounded-md flex flex-col items-center">
      {/* Link wraps the image to navigate to the product display */}
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-[100%] h-40 object-cover rounded-md mb-2"
        />
      </Link>
      <div className="w-full flex-col px-3 sm:px-5">
        <h2 className="text-md font-semibold mb-1 h-[70px]">{name}</h2>

        <div className="flex items-center  justify-between">
          <p className="text-gray-600 mb-2 flex items-center">
            {" "}
            <TbCurrencyNaira />
            {price}
          </p>
          <button
            onClick={() => toggleLike({ _id: id, name, image, price })} // Use _id here
            className={`p-2 rounded-full transition duration-300 ${
              liked ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3.172 5.172a4 4 0 010 5.656L10 16l6.828-5.172a4 4 0 10-5.656-5.656L10 6.343 8.828 5.172a4 4 0 00-5.656 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Items;
