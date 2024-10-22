import React, { useState } from "react";
// Import Swiper React components
import axios from "axios";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContext } from "react";
import { ShopContext } from "./Context/ShopContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiperCustom.css";
// Import required modules
import "./swiperCustom.css";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  A11y,
} from "swiper/modules";
import Items from "./Items";
export default function RelatedProduct({ relatedproducts = [] }) {
  const [products, setProducts] = useState([]);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://allureserver.onrender.com/api/getproducts"
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [Items]);
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4 sm:mt-7 px-4 py-7 mb-0 sm:mb-20">
        <span className="text-2xl md:text-3xl text-center mb-3 sm:mb-6">
          Related Products
        </span>

        <div className="w-[90%]">
          <Swiper
            pagination={{ clickable: true }}
            cssMode={true}
            mousewheel={true}
            keyboard={true}
            modules={[Mousewheel, Pagination, Keyboard]}
            className="mySwiper"
            breakpoints={{
              390: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1000: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1300: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="mr-2 lg:ml-16">
                <Items
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  image={product.images}
                  price={product.price}
                  description={product.description}
                  liked={product.liked}
                />
                <div className="h-16"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
