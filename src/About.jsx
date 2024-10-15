import React from "react";
import pic from "./assets/overview3.jpg";
export default function About() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-24 md:h-28 bg-[#fab6c2] flex flex-col items-center justify-center">
        <span className="text-white text-2xl md:text-3xl  font-semibold">
          About Us
        </span>
        <span className="text-white text-center w-[300px] sm:w-[400px] sm:w-[full] text-sm sm:text-md md:text-lg font-semibold">
          Get to know about Allure Beauty Jewelry store and our Owner
        </span>
      </div>
      <div className="flex flex-col items-center md:items-start md:flex-row mt-10 gap-10">
        <img
          src={pic}
          alt="pic"
          className="w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-lg"
        />
        <span className="text-center md:text-left w-[84%] sm:w-[500px] md:w-[400px] lg:w-[520px]">
          We use your information for the following purposes: To process your
          orders and provide customer service. To personalize your shopping
          experience and recommend products.   To send you marketing
          communications, such as newsletters and promotions. To analyze website
          usage and improve our services. To comply with legal requirements.
          Sharing Your Information We may share your information with:
          Third-party service providers: To assist us with order fulfillment,
          shipping, payment processing, and other business functions. Legal
          authorities: To comply with legal requirements or protect our rights.
          Your Rights You have the right to: Access your personal information.
          Request correction of inaccuracies. Object to certain uses of your
          information. Request deletion of your information. Data Security We
          implement reasonable security measures to protect your personal  
        </span>{" "}
      </div>{" "}
    </div>
  );
}
