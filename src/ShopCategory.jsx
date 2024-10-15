import React, { useState, useEffect } from "react";
import axios from "axios";
import Items from "./Items";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector

const ShopCategory = ({ category, banner }) => {
  const [products, setProducts] = useState([]);
  const [filterGender, setFilterGender] = useState("");
  const dispatch = useDispatch(); // Initialize dispatch
  const likedProducts = useSelector((state) => state.likedProducts.liked); // Get liked products from Redux

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          "https://allureserver.onrender.com/api/products"
        );
        const allProducts = response.data.products;

        const filteredProducts = allProducts.filter((item) => {
          if (category === "men" || category === "women") {
            return item.gender === category;
          }
          if (item.category === category) {
            return !filterGender || item.gender === filterGender;
          }
          return false;
        });

        const fetchedProducts = shuffleArray(filteredProducts).map(
          (product) => ({
            ...product,
            liked: likedProducts.some((liked) => liked._id === product._id), // Check if the product is liked
          })
        );

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products by category", error);
      }
    };

    fetchProductsByCategory();
  }, [category, filterGender, likedProducts]); // Fetch products again if likedProducts changes

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96">
        <img
          className="h-full w-full object-cover"
          src={banner}
          alt={`${category} banner`}
        />
      </div>
      <div className="py-4 text-center text-black">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          {category.charAt(0).toUpperCase() + category.slice(1)} Products
        </h1>
        <div className="mt-2 w-16 sm:w-20 h-1 bg-black mx-auto"></div>
      </div>

      {/* Conditional rendering: Hide the filter when category is "men" or "women" */}
      {category !== "men" && category !== "women" && (
        <div className="mb-4">
          <button
            onClick={() => setFilterGender("")}
            className={`border-[2px] rounded-full border-[#fab6c2] px-6 py-1 mx-2 ${
              filterGender === ""
                ? "bg-[#fab6c2] text-white"
                : "hover:bg-[#fab6c2] hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterGender("women")}
            className={`border-[2px] rounded-full border-[#fab6c2] px-6 py-1 mx-2 ${
              filterGender === "women"
                ? "bg-[#fab6c2] text-white"
                : "hover:bg-[#fab6c2] hover:text-white"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => setFilterGender("men")}
            className={`border-[2px] rounded-full border-[#fab6c2] px-6 py-1 mx-2 ${
              filterGender === "men"
                ? "bg-[#fab6c2] text-white"
                : "hover:bg-[#fab6c2] hover:text-white"
            }`}
          >
            Men
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-10 px-4 sm:px-8">
        {products.length > 0 ? (
          products.map((product) => (
            <Items
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.images}
              price={product.price}
              description={product.description}
              liked={product.liked}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
