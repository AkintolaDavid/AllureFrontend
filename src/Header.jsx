import React, { useContext, useState, useEffect } from "react";
import { LuUser2 } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import logo from "./assets/photo_32_2024-09-15_13-45-00.jpg";
import { MdOutlineContactSupport } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useToast } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
import { useLikedItems } from "./Context/LikedProductsContext";
import { CartContext } from "./Context/CartContext";

export default function Header() {
  const { cart } = useContext(CartContext);
  const { likedItems } = useLikedItems();
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState("");
  const toast = useToast();

  const calculateTotalQuantity = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    toast({
      title: "You have logged out successfully.",
      // description: "You have signed in successfully!",
      position: "top-right",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    // setLogoutMessage("You have logged out successfully.");
    setTimeout(() => {
      setLogoutMessage("");
    }, 2000);
    navigate("/");
  };

  const capitalizeFirstLetterOfEachWord = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const isLoggedIn = !!localStorage.getItem("token");
  const fullName = localStorage.getItem("fullName");
  const userfullName = fullName
    ? capitalizeFirstLetterOfEachWord(JSON.parse(fullName).fullName)
    : "Guest";

  const [isScrolled, setIsScrolled] = useState(false);

  const handleCategoryClick = (category) => {
    navigate(`/shopcategory/${category}`);
  };
  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      const offset = window.scrollY;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        if (offset > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full justify-center h-20 sm:h-24">
          <div className="flex justify-center items-center w-[90%] md:w-[85%] lg:w-[85%]">
            <div className="flex gap-8 place-items-center w-[33.3%]">
              {/* Sidebar will only show on small screens */}

              <div className="sm:hidden">
                <Sidebar
                  pageWrapId={"page-wrap"}
                  outerContainerId={"App"}
                  handleLogout={handleLogout}
                />
              </div>

              {isLoggedIn ? (
                <div className="flex flex-col md:flex-row md:gap-2">
                  <span className="text-xs font-medium sm:text-md md:text-lg">
                    Welcome
                  </span>
                  <span className="text-xs font-medium sm:text-md md:text-lg">
                    {userfullName}
                  </span>
                </div>
              ) : (
                <Link to="contact">
                  <div className="flex gap-1 md:gap-2 items-center">
                    <MdOutlineContactSupport className=" text-lg md:text-xl" />
                    <span className=" text-[16px] md:text-xl">Contact</span>
                  </div>
                </Link>
              )}
            </div>
            <div className="w-[33.3%] flex justify-center">
              <Link to="/">
                <img
                  src={logo}
                  className="h-[60px] sm:h-[65px] md:h-[75px] w-[100px] sm:w-[120px] md:w-[150px]"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="flex gap-4 md:gap-8 place-items-center justify-end w-[33.3%]">
              {isLoggedIn ? (
                <span onClick={handleLogout} className="cursor-pointer">
                  <HiOutlineLogout className="text-2xl md:text-3xl" />
                </span>
              ) : (
                <Link to="/signin">
                  <LuUser2 className="text-xl md:text-2xl" />
                </Link>
              )}
              <Link to="/likedproducts">
                <div className="relative">
                  <FiHeart className="text-xl md:text-2xl" />
                  <div className="text-white bg-red-600 absolute top-[-6px] right-[-14px] text-[12px] font-bold rounded-full flex items-center justify-center w-5 h-5">
                    {likedItems.length}
                  </div>
                </div>
              </Link>
              <Link to="/cart">
                <div className="relative">
                  <MdOutlineShoppingBag className="text-2xl md:text-3xl" />
                  <div className="text-white bg-red-600 absolute top-[-3px] right-[-8px] text-[12px] font-bold rounded-full flex items-center justify-center w-5 h-5">
                    {calculateTotalQuantity()}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Show navigation only on screens wider than 768px */}
        {!isScrolled && (
          <div className="bg-gray-100 h-10 hidden sm:flex items-center justify-between px-3 md:px-8 lg:px-26">
            <Link to="/" className="text-md">
              Home
            </Link>
            {[
              { name: "Rings", path: "rings" },
              { name: "Necklace", path: "necklace" },
              { name: "Earrings", path: "earrings" },
              { name: "Bracelet", path: "bracelet" },
              { name: "Watch", path: "watch" },
              { name: "Customize Jewelry", path: "customize_jewelry" }, // Updated path with underscore
            ].map(({ name, path }) => (
              <div key={path} className="text-md relative">
                <Link
                  to={`/category/${path}`} // Correct path here
                  onClick={() => handleCategoryClick(name)}
                >
                  {name}
                </Link>
              </div>
            ))}
          </div>
        )}

        {logoutMessage && (
          <div className="flex flex-col items-center absolute top-[150%] left-[34%] bg-white py-10 px-6 rounded-lg">
            <p className="text-red-600 text-2xl font-semibold">
              {logoutMessage}
            </p>
            <IoCheckmarkCircleSharp className="text-4xl mt-4 text-red-600" />
          </div>
        )}
      </div>
    </div>
  );
}
