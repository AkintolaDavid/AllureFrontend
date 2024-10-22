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
          <span className="text-center md:text-left  text-xl sm:text-[30px]">
            Get to know about Allure Beauty Jewelry Store and our Owner
          </span>
          <span className="text-center md:text-left mt-4 text-[14px] sm:text-[17px]">
            {" "}
            Allure Beauty Jewelry Store is dedicated to providing exceptional
            and timeless pieces that enhance the beauty and elegance of every
            individual. Founded by Ashley Nkemdilim, a proud graduate of
            Covenant University with a degree in Chemical Engineering, the store
            was born from her passion for jewelry. Inspired by a deep love for
            the artistry that defines fine jewelry. With an eye for detail and
            commitment to quality, Nkem created Allure Beauty Jewelry Store to
            offer customers an experience—one where style meets sophistication
            and personal expression.
          </span>
        </div>{" "}
      </div>{" "}
      <div className="flex flex-col items-center  md:flex-row mt-10 gap-5 sm:gap-10">
        <div className="w-[84%] sm:w-[430px] md:w-[480px] flex flex-col items-center justify-center">
          <span className="text-center md:text-left  text-xl sm:text-[30px]">
            What Allure Beauty Jewelry Store offers you:
          </span>
          <span className="text-center md:text-left mt-4 text-[14px] sm:text-[17px]">
            At Allure Beauty, we carefully curate each piece to reflect our
            dedication to craftsmanship, beauty, and luxury, ensuring that every
            item is as unique as the individual wearing it. Our passion for
            jewelry drives us to continuously expand our collection, making sure
            our customers always have access to the most exquisite, on-trend
            designs.Allure Beauty Jewelry Store offers something for every taste
            and occasion.
          </span>
        </div>{" "}
        <img
          src={pic2}
          alt="pic"
          className="w-52 h-80 sm:w-60 lg:h-88 rounded-lg"
        />
      </div>{" "}
    </div>
  );
}
