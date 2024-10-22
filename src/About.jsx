import React from "react";
import pic2 from "./assets/contact/photo_2_2024-10-21_08-10-00.jpg";
import pic3 from "./assets/contact/photo_3_2024-10-21_08-10-00.jpg";
export default function About() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-24 md:h-28 bg-[#fab6c2] flex flex-col items-center justify-center">
        <span className="text-white text-2xl md:text-3xl  font-semibold">
          About Us
        </span>
        {/* <span className="text-white text-center w-[300px] sm:w-[400px] text-sm sm:text-md md:text-lg font-semibold">
          Get to know about Allure Beauty Jewelry store and our Owner
        </span> */}
      </div>
      <div className="flex flex-col items-center md:items-start md:flex-row mt-10 gap-5 sm:gap-10">
        <img
          src={pic3}
          alt="pic"
          className="w-56 h-64 sm:w-72 sm:h-80 lg:w-80 lg:h-96 rounded-lg"
        />
        <div className="w-[84%] sm:w-[430px] md:w-[480px] flex flex-col">
          <span className="text-center md:text-left  text-xl sm:text-3xl">
            Get to know about Allure Beauty Jewelry Store and our Owner
          </span>
          <span className="text-center md:text-left mt-4 text-[14px] sm:text-[17px]">
            {" "}
            We use your information for the following purposes: To process your
            orders and provide customer service. To personalize your shopping
            experience and recommend products.   To send you marketing
            communications, such as newsletters and promotions. To analyze
            website usage and improve our services. To comply with legal
            requirements. Sharing Your Information We may share your information
            with: Third-party service providers: To assist us with order
            fulfillment,
          </span>
        </div>{" "}
      </div>{" "}
      <div className="flex flex-col items-center  md:flex-row mt-10 gap-5 sm:gap-10">
        <div className="w-[84%] sm:w-[430px] md:w-[480px] flex flex-col items-center justify-center">
          <span className="text-center md:text-left  text-xl sm:text-3xl">
            What Allure Beauty Jewelry Store offers you:
          </span>
          <span className="text-center md:text-left mt-4 text-[14px] sm:text-[17px]">
            {" "}
            We use your information for the following purposes: To process your
            orders and provide customer service. To personalize your shopping
            experience and recommend products.   To send you marketing
          </span>
        </div>{" "}
        <img
          src={pic2}
          alt="pic"
          className="w-56 h-80 sm:w-64 lg:h-88 rounded-lg"
        />
      </div>{" "}
    </div>
  );
}
