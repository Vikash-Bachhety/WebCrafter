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
    <div className="backGroundAnimate bg-black flex flex-col md:flex md:flex-row text-white min-w-full h-28 md:h-16 text-md md:text-xl font-normal md:tracking-wider font-sans items-center justify-between fixed top-0 left-0 z-20">
      <Link
        to="/Home"
        className="backGroundAnimate bg-transparent flex flex-col w-12 h-12 md:w-40 md:h-40 md:mt-8 rounded-full relative z-10"
      >
       <div className="dot-animation-container">
  <img
    className="w-10 h-10 mt-1 md:w-28 md:h-28 md:mt-8 md:ml-4 relative"
    src={favicon}
    alt=""
  />
</div>

      </Link>

      <div className="flex flex-wrap text-xs sm:text-sm md:text-lg justify-center gap-x-4 mx-2 md:gap-x-8">
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
          className="animate flex justify-center bg-opacity-60 bg-rose-500 hover:bg-rose-700 text-lg items-center text-white md:text-lg font-semibold mt-2 py-2 md:mt-0 w-24 h-6 md:w-28 md:h-8 rounded-lg md:mr-10"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleRegister}
          className="animate flex justify-center bg-blue-500 hover:bg-blue-700 text-lg text-white md:text-md mt-2 py-2 items-center md:mt-0 w-24 h-6 md:w-28 md:h-8 rounded-md md:mr-10"
        >
          Sign Up
        </button>
      )}
    </div>
  );
}

export default Header;