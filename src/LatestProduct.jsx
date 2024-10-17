import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiperCustom.css";
import { Pagination, Mousewheel, Keyboard, A11y } from "swiper/modules";
import Shopforthem from "./Shopforthem";
import Items from "./Items";

export default function LatestProduct() {
  const [products, setProducts] = useState([]);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    axios
      .get("https://allureserver.onrender.com/api/test")
      .then((response) => {
        setApiData(response.data);
      })
      .catch((err) => {
        console.log("Error fetching API data");
      });
    console.log(apiData);
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://allureserver.onrender.com/api/getproducts"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-8 h-[420px] sm:h-[500px]">
        <span className="text-2xl md:text-3xl text-center mb-10">
          Our Latest Products
        </span>
        <p>{/* <strong>Message:</strong> {apiData.message} */}</p>
        <div className="w-[90%]">
          <Swiper
            cssMode={true}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            modules={[Pagination, Mousewheel, Keyboard, A11y]}
            className="mySwiper mr-2 lg:mr-16"
            spaceBetween={100}
            breakpoints={{
              360: {
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
      <Shopforthem />
    </>
  );
}
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Items from "./Items";

// export default function LatestProduct() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//         );
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h1>Our Latest Products</h1>
//       <div className="grid grid-cols-2 gap-4">
//         {products.map((product) => (
//           <Items
//             key={product._id}
//             id={product._id}
//             name={product.name}
//             image={product.images}
//             price={product.price}
//             description={product.description}
//             liked={product.liked}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
