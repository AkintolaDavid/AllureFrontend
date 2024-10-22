import React from "react";
import pic1 from "./assets/CUSTOMIZE.png";
import AllureHereForYou from "./AllureHereForYou";
import { Link } from "react-router-dom";

export default function GiftCollectionNow() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row h-[450px] max-w-full">
        {/* Image container taking 50% width */}
        <div className="w-[100%] sm:w-1/2 h-1/2 sm:h-full">
          <img
            src={pic1}
            className="h-full w-full object-cover"
            alt="Necklace Collection"
          />
        </div>

        {/* Text container taking 50% width */}
        <div className="w-full sm:w-1/2 h-1/2 sm:h-full  flex flex-col justify-center items-center text-white bg-gray-300 text-center">
          <span className="text-2xl md:text-3xl font-bold">
            We Take Custom Order
          </span>
          <span className="mt-3 text-lg">Customize your jewelry with us</span>
          <Link to="category/customize_jewelry">
            {" "}
            <button className="font-semibold text-white mt-3 py-1 px-10 border-white border-2 text-md sm:text-lg hover:bg-white hover:text-gray-400 hover:border-gray-400">
              PLACE ORDER
            </button>
          </Link>
        </div>
      </div>

      {/* Additional component */}
      {/* <AllureHereForYou /> */}
    </div>
  );
}
