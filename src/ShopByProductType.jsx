import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiperCustom.css";
import Shopbyproduct from "./Shopbtproduct";
// Import required modules
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  A11y,
} from "swiper/modules";
import GiftCollectionNow from "./GiftCollectionNow";
import { Link } from "react-router-dom";
import NecklaceShopNow from "./NecklaceShopNow";

export default function ShopByProductType() {
  return (
    <>
      <div
        id="products"
        className="flex flex-col items-center justify-center mt-14 px-4 py-5 mb-20"
      >
        <span className="text-2xl   md:text-3xl text-center mb-8">
          Shop By Product Types
        </span>

        <div className="max-w-screen-lg w-full">
          <Swiper
            pagination={{ clickable: true }}
            cssMode={true}
            navigation={true}
            mousewheel={true}
            keyboard={true}
            modules={[Pagination, Navigation, Mousewheel, Keyboard, A11y]}
            className="mySwiper"
            breakpoints={{
              450: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              700: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {Shopbyproduct.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex flex-col items-center relative group ">
                  <div className="relative ">
                    {" "}
                    <Link to={`/category/${product.description}`}>
                      {" "}
                      <img
                        alt={product.description}
                        src={product.image}
                        className=" w-40 h-40 sm:w-48 sm:h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-95"
                      />
                    </Link>
                  </div>{" "}
                  <span className="mt-5 text-xl text-center underline underline-offset-1">
                    <Link to={`/category/${product.description}`}>
                      {" "}
                      {product.description}{" "}
                    </Link>
                  </span>
                  <div className="h-10"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <NecklaceShopNow />
    </>
  );
}
