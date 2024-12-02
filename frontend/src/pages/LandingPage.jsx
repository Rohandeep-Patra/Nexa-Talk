import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "../App.css";

const LandingPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-screen h-screen bg-[url('Landing_page_background.jpg')] bg-no-repeat bg-cover bg-center text-white px-6 md:px-10">
      <nav className="flex justify-between items-center bg-transparent">
        {/* Logo */}
        <div className="w-32 md:w-48">
          <img
            src="streamify_logo_white.png"
            className="max-w-full h-auto cursor-pointer"
            alt="Streamify Logo"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 gap-8">
          <NavLink to="/" className="cursor-pointer hover:text-gray-300">
            Join as Guest
          </NavLink>
          <NavLink to="/auth" className="cursor-pointer hover:text-gray-300">
            REGISTER
          </NavLink>
          <NavLink to="/auth" className="cursor-pointer hover:text-gray-300">
            LOGIN
          </NavLink>
        </div>

        {/* Mobile Menu (Toggle on click) */}
        <div className="md:hidden relative">
          <button
            className="flex items-center focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <img
              src="Menu.png"
              alt="Menu Icon"
              className="w-8 h-8 cursor-pointer"
            />
          </button>

          {/* Mobile Menu Popup */}
          {open && (
            <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white rounded-md shadow-lg py-2 w-48 z-50">
              <NavLink
                to="/"
                className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                Join as Guest
              </NavLink>
              <NavLink
                to="/auth"
                className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                REGISTER
              </NavLink>
              <NavLink
                to="/auth"
                className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                LOGIN
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row justify-between items-center p-6">
        {/* Text Section */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-4">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            <span className="text-yellow-500">Connect </span>With Your Loved
            Ones
          </p>
          <p className="text-lg sm:text-xl md:text-2xl">
            Cover a distance by Streamify
          </p>

          {/* Updated to NavLink */}
          <NavLink
            to="/auth"
            className="cursor-pointer text-yellow-500 hover:text-yellow-400 mt-4"
          >
            Get Started
          </NavLink>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src="Landing_page_side_image.png"
            alt="Landing Image"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
