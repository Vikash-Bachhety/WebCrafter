import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Links from "./Links";
import favicon from "../assets/api.png";
import { useNavigate } from "react-router-dom";
import "./Components.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from '@mui/material/Button';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  const handleRegister = () => {
    navigate("/Signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successfully");
    setIsLoggedIn(false);
    navigate("/Home");
  };

  return (
    <div className="bg-black/70 flex flex-col md:flex md:flex-row text-white min-w-full h-28 md:h-16 text-md md:text-xl font-normal md:tracking-wider font-sans items-center justify-between md:px-5 fixed top-0 left-0 z-20">
      <Link
        to="/Home"
        className="bg-transparent flex flex-col w-12 h-12 md:w-40 md:h-40 md:mt-8 rounded-full relative z-10"
      >
        <div>
          <img
            className="drop w-12 h-12 mt-1 md:w-28 md:h-28 md:mt-8 md:ml-4 relative"
            src={favicon}
            alt=""
          />
        </div>
      </Link>

      <div className="flex flex-wrap text-md sm:text-xl md:text-lg justify-center gap-x-4">
        <Links to="Blog" text="Blog" />
        <Links to="Weather" text="Weather" />
        <Links to="Dictionary" text="Dictionary" />
        <Links to="Movies" text="Movies" />
        <Links to="Recipe" text="Recipe" />
      </div>
      {isLoggedIn ? (
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          className="animate flex justify-center text-lg text-white md:text-md py-4 items-center md:mt-0 w-24 h-6  md:h-10 rounded-md md:mr-10"
        >
          Logout
        </Button>
      ) : (
        <button
          onClick={handleRegister}
          className="animate flex justify-center bg-orange-500 hover:bg-orange-600 text-lg text-white md:text-md mt-6 py-4 items-center md:mt-0 w-24 h-6 md:h-10 rounded-md md:mr-4"
        >
          Sign Up
        </button>
      )}
    </div>
  );
}

export default Header;
