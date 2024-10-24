import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { CartContext } from "./Context/CartContext";

export default function ProductDisplay({ product }) {
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState("");
  const toast = useToast();
  const { productId } = useParams(); // Get product ID from URL

  useEffect(() => {
    // Reset the selected size when the product ID changes
    setSelectedSize("");
    // Fetch the product details based on the productId
    const fetchProduct = async () => {
      // You would implement your fetching logic here using productId
      // Example: const fetchedProduct = await fetch(`/api/products/${productId}`);
      // and then set your product state
    };

    fetchProduct();
  }, [productId]); // Runs when productId changes

  const getSizeOptions = (categories) => {
    const categoryList = Array.isArray(categories) ? categories : [categories];
    const category = categoryList.find((cat) =>
      ["rings", "necklace", "bracelet", "watches", "earrings"].includes(cat)
    );

    switch (category) {
      case "rings":
        return [5, 6, 7, 8, 9, 10, 11, 12];
      case "necklace":
        return [16, 18, 20, 24, 32, 34, 36, 48];
      case "bracelet":
        return ["S", "M", "L", "XL"];
      default:
        return null; // No size for watches/earrings
    }
  };

  const sizeOptions = getSizeOptions(product.category);

  return (
    <div className="flex flex-col md:flex-row mt-0 md:mt-4 justify-center">
      <div className="flex flex-col-reverse md:flex-row items-center">
        <div className="flex flex-row md:flex-col gap-3">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              className="h-60 w-60 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-[10px]"
              alt={`product-${index}`}
            />
          ))}
        </div>
      </div>
      <div className="pl-[8%] sm:pl-[6%] flex flex-col max-w-[90%] md:max-w-[350px] lg:max-w-[530px] justify-start mt-5 md:mt-0">
        <span className="text-xl md:text-2xl lg:text-3xl font-semibold">
          {product.name}
        </span>
        <span className="flex items-center text-2xl mt-3">
          <TbCurrencyNaira className="text-3xl" />
          {product.price}
        </span>
        <span className="md:text-[12px] lg:text-[14px] mt-3">
          {product.description}
        </span>

        {sizeOptions && (
          <div className="flex flex-col gap-3 mt-3">
            <span className="text-xl font-semibold">Select size</span>
            <div className="flex flex-wrap gap-2 w-full">
              {sizeOptions.map((size) => (
                <div
                  key={size}
                  onClick={() => setSelectedSize(size)} // Set selected size on click
                  className={`border-[1px] py-1 px-4 border-black cursor-pointer ${
                    selectedSize === size ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
            <span className="text-l font-semibold underline">
              <Link to="/sizeguide">Use Size Guide</Link>
            </span>
          </div>
        )}

        <button
          className="bg-[#fab6c2] font-semibold w-full px-2 py-3 rounded-md text-white mt-5 text-lg"
          onClick={() => {
            if (sizeOptions && !selectedSize) {
              toast({
                title: "Please select a size before adding to cart.",
                position: "top-right",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            } else if (!product._id) {
              toast({
                title: "Product ID is not defined.",
                position: "top-right",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            } else {
              addToCart(product._id, selectedSize);
            }
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
