import React from "react";
import { Link } from "react-router-dom";
import "./Components.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Home() {
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center md:flex md:flex-col md:items-center mt-20 md:mt-10 py-8 md:pt-16 px-4 lg:px-16">
        <h1 className="animate text-4xl text-white lg:text-6xl hover:tracking-wide duration-200 font-bold mb-4 md:mb-16 hover:text-white">
          Welcome to WebCrafter
        </h1>
        <p className="animate text-gray-100 text-md md:w-2/3 lg:text-xl mb-0 md:mb-8 hover:scale-105 duration-200">
          WebCrafter is a celestial hub where data constellations converge to
          illuminate your digital ventures. Our website provides access to a
          variety of APIs, empowering users to explore and utilize data in
          innovative ways.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-6 sm:gap-y-10 justify-center w-full py-3 md:py-6 px-4 mb-28 md:mb-20 lg:px-20 z-1">
        <Link to="/Weather">
          <Box className="scrollLeft content-box relative">
            <Card>
              <span className="badge">Log In</span>
              <CardContent className="bg-slate-950">
                <h2 className="text-2xl text-gray-100 lg:text-3xl font-bold mb-4">
                  Weather Forecast
                </h2>
                <p className="text-base text-gray-100 lg:text-lg">
                  Get real-time weather updates and forecasts for any location
                  worldwide.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Link>
        <Link to="/Movies">
          <Box className="scrollLeft content-box relative">
            <Card>
              <span className="badge">Log In</span>
              <CardContent className="bg-slate-950">
                <h2 className="text-2xl text-gray-100 lg:text-3xl font-bold mb-4">
                  Movie Mania
                </h2>
                <p className="text-base text-gray-100 lg:text-lg">
                  Search for movies and get details like IMDb ratings, posters,
                  years, plots, and more.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Link>
        <Link to="/Dictionary">
          <Box className="scrollLeft content-box relative">
            <Card>
              <span className="badge">Log In</span>
              <CardContent className="bg-slate-950">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-100">
                  Explore Words
                </h2>
                <p className="text-base lg:text-lg text-gray-100">
                  Access a comprehensive dictionary to look up definitions and
                  translations.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Link>
        <Link to="/Recipe">
          <Box className="scrollLeft content-box relative">
            <Card>
              <span className="badge">Log In</span>
              <CardContent className="bg-slate-950">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-100">
                  Recipe Finder
                </h2>
                <p className="text-base lg:text-lg text-gray-100">
                  Discover a wide range of recipes from various cuisines and
                  dietary preferences.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Link>
        <Link to="/Contact Us">
          <Box className="scrollLeft content-box relative">
            <Card>
              <span className="badge">Log In</span>
              <CardContent className="bg-slate-950">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-100">
                  Contact Us
                </h2>
                <p className="text-base lg:text-lg text-gray-100">
                  Reach out to us for any inquiries or feedback.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Link>
        {/* <Link to="/Location">
          <div className="scrollLeft content-box relative">
            <span className="badge">Log In</span>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-100">
              Location Tracker
            </h2>
            <p className="text-base lg:text-lg text-gray-100">
              Track locations and get detailed information about geographical
              coordinates.
            </p>
          </div>
        </Link> */}
      </div>
    </div>
  );
}

export default Home;
