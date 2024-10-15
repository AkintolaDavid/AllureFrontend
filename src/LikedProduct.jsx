// import React, { useContext, useState } from "react";
// import { ShopContext } from "./Context/ShopContext";
// import { Items } from "./Items";
// import { useEffect } from "react";
// import axios from "axios";

// export default function LikedProducts() {
//   const [Products, setProducts] = useState("");
//   const { all_product, likedProducts, toggleLikeProduct } =
//     useContext(ShopContext);

//   useEffect(() => {
//     const fetchProductsByCategory = async () => {
//       try {
//         const allProducts = response.data.products;

//         setProducts(shuffleArray(allProducts));
//       } catch (error) {
//         console.error("Error fetching products by category", error);
//       }
//     };

//     fetchProductsByCategory();
//   }, [category, filterGender]);

//   return (
//     <div className="  mt-10 sm:mx-auto p-3 sm:p-5 h-auto overflow-y-auto lg:w-[1000px]">
//       <h2 className="text-2xl md:text-3xl font-medium text-center mb-3 sm:mb-6">
//         Liked Products
//       </h2>
//       {likedProductDetails.length > 0 ? (
//         <div className="grid grid-cols-2 lg:grid-cols-3 sm:gap-2">
//           {likedProductDetails.map((product) => (
//             <Items
//               key={product.id}
//               id={product.id}
//               name={product.name}
//               image={product.image}
//               price={product.price}
//               onLikeToggle={() => toggleLikeProduct(product.id)}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-md md:text-xl text-center">
//           You have not liked any products yet.
//         </p>
//       )}
//     </div>
//   );
// LikedProducts.jsimport React from "react";
import { useLikedItems } from "./Context/LikedProductsContext";
import Items from "./Items";

const LikedProducts = () => {
  const { likedItems } = useLikedItems();

  return (
    <div className="p-4 flex flex-col mt-5">
      <span className="text-2xl md:text-3xl text-center mb-4">
        Liked Products
      </span>
      {likedItems.length === 0 ? (
        <p>No liked products.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 m-0 lg:my-5 lg:mx-16">
          {" "}
          {likedItems.map((item) => (
            <Items
              key={item._id}
              id={item._id} // Ensure this matches the structure
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedProducts;
