import React from "react";
import { useLikedItems } from "./Context/LikedProductsContext";
import { Link } from "react-router-dom"; // Import Link for navigation
import { TbCurrencyNaira } from "react-icons/tb";
const Items = ({ id, name, image, price, description }) => {
  const { likedItems, toggleLike } = useLikedItems();
  const liked = likedItems.some((item) => item._id === id); // Use unique identifier

  return (
    <div className="border-[2px] rounded-md p-5 flex flex-col items-center">
      {/* Link wraps the image to navigate to the product display */}
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-[200px] h-40 object-cover rounded-md mb-2"
        />
      </Link>
      <h2 className="text-md font-semibold mb-1 h-[50px]">{name}</h2>
      <div className="w-full flex items-center  justify-between px-0 sm:px-5">
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
  );
};

export default Items;
