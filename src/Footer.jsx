import React from "react";
import logo from "./assets/photo_32_2024-09-15_13-45-00.jpg";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="flex flex-col items-center mt-6 sm:mt-10">
      <div>
        {" "}
        <Link to="/">
          <img src={logo} alt="logo" className="h-16 sm:h-20 md:h-24 " />
        </Link>
      </div>{" "}
      <div className="flex gap-[40px] sm:gap-24 md:gap-28 mt-3">
        <div>
          <Link to="/">Home</Link>
        </div>

        <div>
          {" "}
          <Link to="/about">About</Link>
        </div>
        <div>
          <Link to="/privacypolicy"> Policy</Link>
        </div>
        <div>
          {" "}
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="flex justify-center gap-8 md:gap-10 mt-5 sm:mt-6">
        <a
          href="https://wa.me/+2349052148104"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsWhatsapp className="text-xl sm:text-2xl" />
        </a>
        <a
          href="mailto:nkemdilimoganah@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdOutlineMail className="text-xl sm:text-2xl" />
        </a>
        <a
          href="https://www.instagram.com/allure__beauty____/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-xl sm:text-2xl" />
        </a>
        <a
          href="https://snapchat.com/add/nkemm_j"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaSnapchat className="text-xl sm:text-2xl" />
        </a>
      </div>
      <hr className="h-0.5 w-[80vw] bg-black mt-5 md:mt-7" />
      <span className=" flex items-center justify-center mt-3 mb-3 text-sm">
        Copyright @2024 -All Rights Reserved
      </span>
    </div>
  );
}
