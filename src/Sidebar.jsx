import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "./assets/photo_32_2024-09-15_13-45-00.jpg";
export default function Sidebar({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Combine closeMenu with handleLogout
  const handleLogoutClick = () => {
    handleLogout(); // Trigger the logout logic
    closeMenu(); // Close the sidebar
  };
  return (
    <Menu isOpen={isOpen} onStateChange={handleStateChange}>
      <Link className="menu-item" onClick={closeMenu} to="/">
        <img
          src={logo}
          className="ml-[35%] h-[70px]   md:h-[75px] w-[110px] sm:w-[120px] md:w-[150px]"
          alt="logo"
        />
      </Link>
      <Link className="menu-item" to="/" onClick={closeMenu}>
        Home
      </Link>

      <Link className="menu-item" to="category/men" onClick={closeMenu}>
        Men
      </Link>
      <Link className="menu-item" to="category/women" onClick={closeMenu}>
        Women
      </Link>
      <Link className="menu-item" to="category/rings" onClick={closeMenu}>
        Rings
      </Link>
      <Link className="menu-item" to="category/necklace" onClick={closeMenu}>
        Necklace
      </Link>
      <Link className="menu-item" to="category/watch" onClick={closeMenu}>
        Watch
      </Link>
      <Link className="menu-item" to="category/earrings" onClick={closeMenu}>
        Earrings
      </Link>

      <Link className="menu-item" to="category/bracelet" onClick={closeMenu}>
        Bracelet
      </Link>

      {isLoggedIn ? (
        <a className="menu-logout" href="/" onClick={closeMenu}>
          <div
            className="flex items-center gap-2 text-xl"
            onClick={handleLogoutClick}
          >
            <HiOutlineLogout />
            Logout
          </div>
        </a>
      ) : (
        <></>
      )}
    </Menu>
  );
}
