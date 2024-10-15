import React from "react";
import necklace from "./assets/guide/men.webp";
import ring from "./assets/guide/ring.png";
import bracelet from "./assets/guide/braceletguide.png";
import ringguide from "./assets/guide/ringguide.png";
import wrist from "./assets/guide/wristt.jpeg";
export default function Sizeguide() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full  h-24 md:h-28   bg-[#eec0c9] flex flex-col items-center justify-center">
        <span className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">
          Allure Beauty Jewelry Store Size Guide
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-3xl font-medium underline underline-offset-1 mt-8 mb-1">
          Ring Guide
        </span>
        <div className="flex flex-col items-center sm:flex-row gap-1 sm:gap-8">
          <img src={ring} alt="alt" className="h-52 sm:h-60 w-52 sm:w-60" />
          <img
            src={ringguide}
            alt="alt"
            className="h-96 w-[350px] md:w-[500px]"
          />
        </div>

        <span className="text-3xl font-medium underline underline-offset-1 mt-10  mb-1">
          Bracelet Guide
        </span>
        <div className="flex flex-col items-center sm:flex-row gap-10">
          <img src={wrist} alt="alt" className="h-52 sm:h-60 w-52 sm:w-60" />
          <img src={bracelet} alt="alt" className="h-60 w-80 md:w-[500px]" />
        </div>
        <span className="text-3xl font-medium underline underline-offset-1 mt-10  mb-3">
          Necklace Guide
        </span>
        <div className="flex mt-5">
          <img src={necklace} alt="alt" className="h-80 w-80" />
          {/* <img src={necklace} alt="alt" className="h-60 w-60" /> */}
        </div>
      </div>
    </div>
  );
}
