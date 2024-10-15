import React from "react";

export default function Policy() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full  h-24 md:h-28 bg-[#fab6c2] flex flex-col items-center justify-center">
        <span className="text-white text-2xl md:text-3xl  font-semibold">
          Privacy Policy
        </span>
        <span className="text-white text-center w-[300px] sm:w-[400px] text-sm sm:text-md md:text-lg font-semibold">
          What Allure Beauty Jewelry store will do with your information
        </span>
      </div>
      <div className="flex flex-col w-[80%]   md:w-[700px] justify-center py-4">
        <span className="text-2xl underline underline-offset-1">
          Introduction
        </span>
        <span className="text-sm">
          {" "}
          This Privacy Policy outlines how Allure Beauty Jewelry Store collects,
          uses, discloses, and protects your personal information when you visit
          our website, shop in-store, or interact with our services.
        </span>
        <span className="text-2xl mt-3 underline underline-offset-1">
          Information We Collect
        </span>
        <span className="text-sm">
          {" "}
          We may collect the following types of personal information: Contact
          information: Name, email address, phone number, shipping address,
          billing address.   Order information: Products purchased, order
          history, payment information. Account information: Username, password,
          preferences. Usage information: Your interactions with our website,
          such as pages visited, time spent, and clicks.
        </span>
        <span className="text-2xl mt-3 underline underline-offset-1">
          {" "}
          How We Collect Information
        </span>{" "}
        <span className="text-sm">
          We collect information in various ways, including: Directly from you:
          When you provide information through our website, in-store purchases,
          or customer service interactions. Automatically: Through cookies, web
          beacons, and similar technologies.
        </span>{" "}
        <span className="text-2xl mt-3 underline underline-offset-1">
          {" "}
          How We Use Your Information
        </span>
        <span className="text-sm">
          We use your information for the following purposes: To process your
          orders and provide customer service. To personalize your shopping
          experience and recommend products.   To send you marketing
          communications, such as newsletters and promotions. To analyze website
          usage and improve our services. To comply with legal requirements.
        </span>
        <span className="text-2xl mt-3 underline underline-offset-1">
          Sharing Your Information
        </span>
        <span className="text-sm">
          {" "}
          We may share your information with: Third-party service providers: To
          assist us with order fulfillment, shipping, payment processing, and
          other business functions. Legal authorities: To comply with legal
          requirements or protect our rights.
        </span>
        <span className="text-2xl mt-3 underline underline-offset-1">
          {" "}
          Your Rights{" "}
        </span>
        <span className="text-sm">
          You have the right to: Access your personal information. Request
          correction of inaccuracies. Object to certain uses of your
          information. Request deletion of your information.
        </span>
        <span className="text-2xl mt-3 underline underline-offset-1">
          {" "}
          Data Security
        </span>{" "}
        <span className="text-sm">
          We implement reasonable security measures to protect your personal
          information from unauthorized access, disclosure, alteration, or
          destruction. However, no method of transmission over the internet or
          electronic storage is completely secure.
        </span>
         
        <span className="text-2xl underline underline-offset-1">
          {" "}
          Children's Privacy
        </span>
        <span className="text-sm">
          {" "}
          Our website is not intended for children under the age of 13. We do
          not knowingly collect personal information from children.  
        </span>{" "}
        <span className="text-2xl mt-3 underline underline-offset-1">
          Changes to This Policy
        </span>
        <span className="text-sm">
          {" "}
          We may update this Privacy Policy from time to time. We will notify
          you of any significant changes.
        </span>
         
      </div>
    </div>
  );
}
