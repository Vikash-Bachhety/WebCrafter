import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Links from "./Links";
import favicon from "../assets/api.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
 

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/Home");
  };

  return (
    <div className="backGroundAnimate bg-black flex flex-col sm:flex sm:flex-row text-white min-w-full h-28 sm:h-16 text-sm sm:text-xl font-normal sm:tracking-wider font-sans items-center justify-between fixed top-0 left-0 z-20">
      <Link
        to="/Home"
        className="backGroundAnimate bg-transparent flex flex-col w-12 sm:w-40 sm:h-40 sm:mt-8 rounded-full relative z-10"
      >
       <div className="dot-animation-container">
  <img
    className="sm:w-28 sm:h-28 sm:mt-8 sm:ml-4 relative"
    src={favicon}
    alt=""
  />
</div>

      </Link>

      <div className="flex flex-wrap justify-center gap-x-2 mx-2 sm:gap-x-8">
        <Links to="Home" text="Home" />
        <Links to="Marvel" text="Marvel" />
        <Links to="Password" text="PasswordGenerator" />
        <Links to="Weather" text="Weather" />
        <Links to="Movies" text="Movies" />
        <Links to="Dictionary" text="Dictionary" />
        <Links to="Recipe" text="Recipe" />
        <Links to="Contact" text="Contact Us" />
        {/* <Links to="Location" text="Location" /> */}
        {/* <Links to="Currency" text="Currency" /> */}
      </div>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="animate flex justify-center bg-opacity-60 bg-rose-500 hover:bg-rose-700 text-lg items-center text-white sm:text-lg font-semibold mt-2 py-2 sm:mt-0 w-24 h-6 sm:w-28 sm:h-8 rounded-lg sm:mr-10"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleRegister}
          className="animate flex justify-center bg-blue-500 hover:bg-blue-700 text-lg text-white sm:text-md mt-2 py-2 items-center sm:mt-0 w-24 h-6 sm:w-28 sm:h-8 rounded-md sm:mr-10"
        >
          Sign Up
        </button>
      )}
    </div>
  );
}

export default Header;