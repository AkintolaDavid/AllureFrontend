// import React, { useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import { useContext } from "react";
// import { ShopContext } from "./Context/ShopContext";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "./swiperCustom.css";
// // Import required modules
// import "./swiperCustom.css";
// import {
//   Navigation,
//   Pagination,
//   Mousewheel,
//   Keyboard,
//   A11y,
// } from "swiper/modules";
// import { Link } from "react-router-dom";
// import { Items } from "./Items";
// export default function RelatedProduct({ relatedproducts = [] }) {
//   const { selectedCategory } = useContext(ShopContext);
//   console.log("Selected Category:", selectedCategory); // Log the selected category

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center mt-9 sm:mt-14 px-4 py-7 mb-0 sm:mb-20">
//         <span className="text-2xl md:text-3xl text-center mb-3 sm:mb-6">
//           Related Products
//         </span>

//         <div className="max-w-screen-lg w-full">
//           <Swiper
//             pagination={{ clickable: true }}
//             cssMode={true}
//             navigation={true}
//             mousewheel={true}
//             keyboard={true}
//             modules={[Navigation, Mousewheel, Pagination, Keyboard]}
//             className="mySwiper"
//             breakpoints={{
//               150: {
//                 slidesPerView: 2,
//                 spaceBetween: 10,
//               },
//               780: {
//                 slidesPerView: 3,
//                 spaceBetween: 15,
//               },
//               1024: {
//                 slidesPerView: 4,
//                 spaceBetween: 20,
//               },
//             }}
//           >
//             {all_product.map((product) => (
//               <SwiperSlide key={product.id}>
//                 <Items
//                   key={product.id}
//                   id={product.id}
//                   name={product.name}
//                   image={product.image}
//                   price={product.price}
//                   // filtereditem={filteredItems}
//                 />
//                 <button className="text-center bg-white text-black px-4 py-7 sm:py-4 rounded-full opacity-0 ">
//                   Add to Cartss
//                 </button>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </>
//   );
// }
