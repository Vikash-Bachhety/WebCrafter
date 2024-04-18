import React from "react";
import Links from "./Links";
import insta from "../assets/icons/instagram.png";
import linkedin from "../assets/icons/linkedin.png";
import twitter from "../assets/icons/twitter.png";
import gmail from "../assets/icons/gmail.png";

function Footer() {
  return (
    <div className="backGroundAnimate bg-black flex flex-col md:flex md:justify-center md:items-center flex-wrap fixed bottom-0 left-0 min-w-full h-auto p-4 md:p-8 lg:h-12 z-50 items-center pt-1 tracking-wider">
      <div className="flex flex-wrap text-white md:mx-0 mx-2 gap-x-4 sm:gap-x-2 lg:gap-x-10 text-xs sm:text-md md:text-lg lg:text-xl justify-center">
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
      <div className="flex gap-6 items-center justify-center mr-5 md:mr-0">
        <a href="https://www.linkedin.com/" target="_blank">
          <img
            className="h-6 w-6 lg:w-8 lg:h-8 p-0.5 md:p-0 md:mt-0 mt-3 hover:border-2 rounded-full hover:border-white"
            src={linkedin}
            alt=""
          />
        </a>
        <a href="https://instagram.com/" target="_blank">
          <img
            className="h-6 w-6 lg:w-8 lg:h-8 p-0.5 md:p-0 md:mt-0 mt-3 hover:border-2 rounded-full hover:border-white"
            src={insta}
            alt=""
          />
        </a>
        <a href="https://twitter.com/" target="_blank">
          <img
            className="h-6 w-6 lg:w-8 lg:h-8 p-0.5 md:p-0 md:mt-0 mt-3 hover:border-2 rounded-full hover:border-white"
            src={twitter}
            alt=""
          />
        </a>
        <a href="mailto:your_email@example.com" target="_blank">
          <img
            className="h-6 w-6 lg:w-8 lg:h-8 p-0.5 md:p-0 md:mt-0 mt-3 hover:border-2 rounded-full hover:border-white"
            src={gmail}
            alt=""
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
