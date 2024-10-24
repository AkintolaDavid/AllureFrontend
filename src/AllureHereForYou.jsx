import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaGift } from "react-icons/fa6";
import { MdOutlineDesignServices } from "react-icons/md";
import { IoHome } from "react-icons/io5";

import { ThemeProvider } from "@mui/system";
import Shopforthem from "./Shopforthem";
import GiftCollectionNow from "./GiftCollectionNow";
export default function AllureHereForYou() {
  return (
    <>
      {" "}
      <div className="flex flex-col justify-center items-center h-auto md:h-[450px] py-8 gap-10 sm:gap-16 ">
        <div className="text-[25px] md:text-3xl text-center ">
          {" "}
          Elevate Your Experience With Allure
        </div>
        <div className="grid grid-cols-2 px-3 gap-5 sm:gap-0 md:flex w-full justify-around">
          <div className="flex flex-col items-center gap-2">
            {" "}
            <TbTruckDelivery className="text-3xl md:text-4xl lg:text-5xl" />
            <div className="sm:text-lg lg:text-xl font-semibold  w-40 lg:w-48 text-center">
              Fast and efficient shipping{" "}
            </div>
            <div className="sm:w-40 lg:w-48 text-center text-sm font-light">
              Enjoy your new jewelry delivered right to your doorstep within a
              week, anywhere in the world.{" "}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            {" "}
            <FaGift className="text-3xl md:text-4xl lg:text-5xl" />
            <div className="sm:text-lg lg:text-xl font-semibold w-40 lg:w-48 text-center">
              Exquisite gift packaging{" "}
            </div>
            <div className="sm:w-40 lg:w-48 text-center text-sm font-light">
              Our elegant gift wrapping makes your jewelry purchase the perfect
              present.
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            {" "}
            <MdOutlineDesignServices className="text-3xl md:text-4xl lg:text-5xl" />
            <div className="sm:text-lg lg:text-xl font-semibold  w-40 lg:w-48 text-center">
              Custom engraving and design{" "}
            </div>
            <div className="sm:w-40 lg:w-48 text-center text-sm font-light">
              Create a truly unique piece with our personalized engraving and
              customization services.{" "}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            {" "}
            <IoHome className="text-3xl md:text-4xl lg:text-5xl" />
            <div className="sm:text-lg lg:text-xl font-semibold  w-40 lg:w-48 text-center">
              We offer Home delivery{" "}
            </div>
            <div className="sm:w-40 lg:w-48 text-center text-sm font-light">
              Avoid the hassle of in-store shopping and have your jewelry
              delivered directly to your home.
            </div>
          </div>
        </div>
      </div>
      <GiftCollectionNow />
    </>
  );
}
