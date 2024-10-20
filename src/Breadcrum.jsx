import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

// Helper function to capitalize the first letter of each word
const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const Breadcrum = (props) => {
  const { product } = props;
  console.log(product);

  // Check if category is a string (for single category) or an array (for multiple categories)
  const categories = Array.isArray(product.category)
    ? product.category
    : [product.category];

  return (
    <div className="flex items-center text-[14px] sm:text-[16px] md:text-[18px] sm:text-sm text-[#434141] ml-5 sm:ml-10 md:ml-36 mt-8 mb-8">
      {/* Home link */}
      <Link to="/">HOME</Link> <FaChevronRight className="ml-2 mr-2" />
      {/* Map over categories and display them as links */}
      {categories.map((category, index) => (
        <span key={index} className="flex items-center">
          <Link to={`/category/${category}`}>
            {capitalizeFirstLetter(category)}
          </Link>
          {index < categories.length - 1 && (
            <FaChevronRight className="ml-2 mr-2" />
          )}{" "}
          {/* Chevron between categories */}
        </span>
      ))}
      <FaChevronRight className="ml-2 mr-2" />
      {/* Product name */}
      <span>{product.name}</span>
    </div>
  );
};
