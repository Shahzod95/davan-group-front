// Navbar.jsx
import { useContext, useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CartContext } from "../../context/CarProvider";

import logo from "../../assets/logo.png"

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, toggleBasket } = useContext(CartContext);

  const handleNav = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // 50px dan pastga tushganda fixed bo'ladi
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: 1, text: "Home", path: "#hero" },
    { id: 2, text: "About", path: "#about" },
    { id: 3, text: "Collection", path: "#collection" },
    { id: 4, text: "How it works", path: "#how-it-works" },
    { id: 5, text: "Contact", path: "#contact" },
  ];

  const handleScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  

  return (
    <nav
      className={`w-full bg-gray-300 shadow-lg transition-all duration-300 z-30 ${
        isScrolled ? "fixed top-0 left-0 bg-opacity-90" : "relative"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              className="h-28"
              alt="logo image"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <div className="ml-10 flex items-baseline space-x-4"> */}
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleScroll(e, item.path)}
                className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                {item.text}
              </a>
            ))}

            <button onClick={toggleBasket} className="relative">
              <AiOutlineShoppingCart className="h-6 w-6 text-black" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
            {/* </div> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleBasket} className="relative">
              <AiOutlineShoppingCart className="h-6 w-6 text-black" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={handleNav}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {navOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          navOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              onClick={(e) => handleScroll(e, item.path)}
              className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
