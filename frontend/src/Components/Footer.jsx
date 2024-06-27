import React from "react";
import Links from "./Links";
import insta from "../assets/icons/instagram.png";
import linkedin from "../assets/icons/linkedin.png";
import twitter from "../assets/icons/twitter.png";
import gmail from "../assets/icons/gmail.png";

function Footer() {
  return (
    <div className="bg-blue-950 flex justify-center items-center gap-4 fixed bottom-0 left-0 min-w-full h-auto p-4 md:p-8 lg:h-12 z-50 pt-1 tracking-wider">
      <div className="text-white text-md">
        <Links to="Home" text="Home" />
      </div>
      <div className="hidden sm:flex gap-6 items-center justify-center mr-5 md:mr-0">
        <a href="https://www.linkedin.com/" target="_blank">
          <img
            className="h-6 w-6 p-0.5 md:p-0 md:mt-0 mt-3 hover:border-2 rounded-full hover:border-white"
            src={linkedin}
            alt=""
          />
        </a>
        <a href="https://instagram.com/" target="_blank">
          <img
            className="h-6 w-6 p-0.5 md:p-0 md:mt-0 mt-3 hover:border-2 rounded-full hover:border-white"
            src={insta}
            alt=""
          />
        </a>
        <a href="https://twitter.com/" target="_blank">
          <img
            className="h-6 w-6 p-0.5 md:p-0 md:mt-0 mt-3 hover:border-2 rounded-full hover:border-white"
            src={twitter}
            alt=""
          />
        </a>
        <a href="mailto:your_email@example.com" target="_blank">
          <img
            className="h-6 w-6 p-0.5 md:p-0 md:mt-0 mt-3 hover:border-2 rounded-full hover:border-white"
            src={gmail}
            alt=""
          />
        </a>
      </div>
      <div className="text-white text-md">
        <Links to="Contact" text="Contact Us" />
      </div>
    </div>
  );
}

export default Footer;
