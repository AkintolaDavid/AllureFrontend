import React from "react";
import pic1 from "./assets/NecklaceShopNow/images.jpeg";
import pic2 from "./assets/NecklaceShopNow/IMG_3007.webp";
import pic3 from "./assets/NecklaceShopNow/imggg.jpg";
import pic4 from "./assets/NecklaceShopNow/mm1-0308_1000x667.jpeg";
import ShopByProductType from "./ShopByProductType";
import { Link } from "react-router-dom";
import AllureHereForYou from "./AllureHereForYou";
export default function NecklaceShopNow() {
  return (
    <div className="">
      {/* <div className="ml-[10%] flex justify-around items-center max-w-[80%] bg-black rounded-2xl"> */}

      <div className=" flex flex-col sm:flex-row h-auto sm:h-[500px]  justify-around items-center max-w-full bg-black pb-8 ">
        <div className="grid grid-cols-2 py-10 gap-6">
          <div className="py-3 px-3 border-white border-2">
            {" "}
            <img
              src={pic1}
              alt="pic1"
              className="w-28 h-28 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
            />
          </div>
          <div className="py-3 px-3 border-white border-2">
            {" "}
            <img
              src={pic2}
              alt="pic1"
              className="w-28 h-28 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
            />
          </div>
          <div className="py-3 px-3 border-white border-2">
            {" "}
            <img
              src={pic3}
              alt="pic1"
              className="w-28 h-28 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
            />
          </div>
          <div className="py-3 px-3 border-white border-2">
            {" "}
            <img
              src={pic4}
              alt="pic1"
              className="w-28 h-28 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
            />
          </div>
        </div>
        <div className="flex flex-col items-center text-white text-center">
          <span className="text-2xl md:text-3xl font-bold">
            Our Necklace Collection
          </span>
          <span className="mt-3 text-md">
            Take a look at our Necklace collection
          </span>
          <Link to="category/necklace">
            {" "}
            <button className="font-semibold text-white mt-3 py-1 px-14 border-white border-2 text-md sm:text-lg hover:bg-white hover:text-black">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>
      <AllureHereForYou />
    </div>
  );
}
