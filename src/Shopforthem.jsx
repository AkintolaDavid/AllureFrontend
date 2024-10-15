import React from "react";
import img from "./assets/NecklaceShopNow/shopforthem.png";
import ShopByProductType from "./ShopByProductType";
import { Link } from "react-router-dom";

export default function Shopforthem() {
  return (
    <>
      <div className="mt-5">
        <div className="flex flex-col-reverse sm:flex-row h-[450px] max-w-full">
          {/* Image container taking 50% width */}

          {/* Text container taking 50% width */}
          {/* Text container taking 50% width */}
          <div className="w-full sm:w-1/2 h-1/2 sm:h-full flex flex-col justify-center items-center text-white bg-gray-300">
            <span className=" text-2xl md:text-3xl font-bold text-center">
              Gift your loved ones Today!
            </span>
            <span className="mt-3 text-sm sm:text-lg md:text-lg md:w-[400px] text-center">
              Explore our jewerlry collection and pick for that special someone
            </span>
            <Link to="category/women">
              {" "}
              <button className="font-semibold text-white mt-5 py-1 w-60 border-white border-2 sm:text-md md:text-lg hover:bg-white hover:text-gray-400 hover:border-gray-400">
                SHOP FOR WOMEN
              </button>
            </Link>
            <Link to="category/men">
              {" "}
              <button className="font-semibold text-white mt-5 py-1 w-60 border-white border-2 sm:text-md md:text-lg hover:bg-white hover:text-gray-400 hover:border-gray-400">
                SHOP FOR MEN
              </button>
            </Link>
          </div>

          <div className="w-[100%] sm:w-1/2 h-1/2 sm:h-full">
            <img
              src={img}
              className="w-full h-full object-cover"
              alt="Necklace Collection"
            />
          </div>
        </div>
      </div>
      <ShopByProductType />
    </>
  );
}
