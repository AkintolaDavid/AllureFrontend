import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiperCustom.css";
import { Mousewheel, Keyboard, A11y, Autoplay } from "swiper/modules";
import slide1 from "./assets/overview1.jpg";
import slide2 from "./assets/overview2.jpeg";
import slide3 from "./assets/overview3.jpg";
import LatestProduct from "./LatestProduct";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <>
      <div className=" flex flex-col items-center justify-center ">
        <div className="w-full">
          <Swiper
            cssMode={true}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            autoplay={{
              delay: 4000, // 3 seconds delay between slides
              disableOnInteraction: false, // Keeps autoplay even if user interacts with the swiper
            }}
            modules={[Mousewheel, Keyboard, A11y, Autoplay]}
            className="mySwiper"
            spaceBetween={10}
          >
            <SwiperSlide>
              <div className="relative">
                <img
                  alt="Slide 3"
                  src={slide3}
                  className="w-[100%]  h-[40vh] sm:h-[50vh] md:h-[50vh] 
              object-cover opacity-90"
                />
                <div className=" absolute top-[30%] sm:top-[45%] left-5 sm:left-10 flex flex-col font-semibold text-white gap-3 sm:gap-4 md:gap-6">
                  <span className="text-[25px] sm:text-3xl md:text-4xl lg:text-5xl">
                    Allure Beauty Jewelry Store.
                  </span>
                  <div className="flex flex-col">
                    {" "}
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      Providing the perfect jewelry that
                    </span>{" "}
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      {" "}
                      reflects and elevates your style
                    </span>{" "}
                  </div>{" "}
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="relative">
                <img
                  alt="Slide 1"
                  src={slide1}
                  className="w-[100%]  h-[40vh] sm:h-[50vh] md:h-[50vh] 
              object-cover opacity-90"
                />
                <div className=" absolute top-[20%] left-5 sm:left-10 flex flex-col font-semibold text-white  gap-2 sm:gap-4 md:gap-6">
                  <span className="text-[25px] sm:text-3xl md:text-4xl lg:text-5xl">
                    Your Vision, Your Jewelry.
                  </span>
                  <div className="flex flex-col">
                    {" "}
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      Customize every detail to create something
                    </span>{" "}
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      {" "}
                      that reflects your unique style
                    </span>{" "}
                  </div>{" "}
                  <Link to="/category/customize_jewerly">
                    <button className="font-semibold text-white mt-3 py-3 w-72 sm:w-80 md:w-96 border-white border-4 text-md sm:text-lg md:text-xl hover:bg-white hover:text-gray-500">
                      PLACE CUSTOMIZATION ORDER
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="relative">
                <img
                  alt="Slide 2"
                  src={slide2}
                  className="w-[100%]  h-[40vh] sm:h-[50vh] md:h-[50vh] 
              object-cover opacity-90"
                />
                <div className=" absolute top-[25%] sm:top-[25%] text-right right-5 sm:right-10 flex flex-col font-semibold opacity-85 text-[#686868] gap-3 sm:gap-4 md:gap-6">
                  <span className="text-[25px] sm:text-3xl md:text-4xl lg:text-5xl">
                    Perfect Fit, Perfect Style.
                  </span>
                  <div className="flex flex-col">
                    {" "}
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xll">
                      Discover stunning rings designed
                    </span>{" "}
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xll">
                      {" "}
                      to complement your individuality.
                    </span>{" "}
                  </div>{" "}
                  <div className="flex justify-end">
                    <Link to="/category/rings">
                      <button className=" rounded-mx font-semibold text-[#686868] mt-3 py-3 w-52 sm:w-80 md:w-96 border-[#686868] border-4 text-md sm:text-lg md:text-xl hover:bg-[#686868] hover:text-white ">
                        CHECK COLLECTION
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
          </Swiper>
        </div>
      </div>
      <LatestProduct />
    </>
  );
}
