import React from "react";
import { Link } from "react-router-dom";
import "./Components.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Home() {
  return (
    <div className="bg-sky-500 md:h-[95vh] flex flex-col items-center justify-center">
      <div className="text-center md:flex md:flex-col md:items-center mt-32 md:mt-14 py-8 md:pt-16 px-4 lg:px-16">
        <h1 className="animate text-3xl text-slate-100 lg:text-6xl hover:tracking-wide duration-200 font-bold hover:text-blue-50">
          Welcome to WebCrafter
        </h1>
        {/* <p className="animate text-yellow-200 text-md md:w-1/2 lg:text-xl mb-0 md:mb-8 hover:scale-110 duration-300">
          WebCrafter is a celestial hub where data constellations converge to
          illuminate your digital ventures. Our website provides access to a
          variety of APIs, empowering users to explore and utilize data in
          innovative ways.
        </p> */}
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-6 sm:gap-y-10 justify-center w-full py-3 md:py-6 px-4 mb-28 md:mb-20 lg:px-20 z-1">
        <Link to="/Blog">
          <Box className="scrollLeft content-box relative">
            <Card>
              <span className="badge">Log In</span>
              <CardContent className="bg-sky-800 hover:bg-sky-900 h-52 flex flex-col justify-center">
                <h2 className="text-2xl text-blue-100 lg:text-3xl font-bold mb-4 text-center">
                Create your Blogs
                </h2>
                <p className="text-base text-blue-100 lg:text-lg text-center">
                start creating, editing your blogs today. 
                Express your ideas & experiences.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Link>
        <Link to="/Weather">
          <Box className="scrollLeft content-box relative">
            <Card>
              <span className="badge">Log In</span>
              <CardContent className="bg-sky-800 hover:bg-sky-900 h-52 flex flex-col justify-center">
                <h2 className="text-2xl text-blue-100 lg:text-3xl font-bold mb-4 text-center">
                  Weather Forecast
                </h2>
                <p className="text-base text-blue-100 lg:text-lg text-center">
                  Get real-time weather updates and forecasts for any location
                  worldwide.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Link>
        <Link to="/Dictionary">
          <Box className="scrollLeft content-box relative">
            <Card>
              <span className="badge">Log In</span>
            <CardContent className="bg-sky-800 hover:bg-sky-900 h-52 flex flex-col justify-center">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-blue-100 text-center">
                  Explore Words
                </h2>
                <p className="text-base lg:text-lg text-blue-100 text-center">
                  Access a comprehensive dictionary to look up definitions and
                  translations.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Link>
        <Link to="/Movies">
          <Box className="scrollLeft content-box relative">
            <Card>
              <span className="badge">Log In</span>
              <CardContent className="bg-sky-800 hover:bg-sky-900 h-52 flex flex-col justify-center">
                <h2 className="text-2xl text-blue-100 lg:text-3xl font-bold mb-4 text-center">
                  Movie Mania
                </h2>
                <p className="text-base text-blue-100 lg:text-lg text-center">
                  Search for movies and get details like IMDb ratings, posters,
                  years, plots, and more.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Link>
        <Link to="/Recipe">
          <Box className="scrollLeft content-box relative">
            <Card>
              <span className="badge">Log In</span>
              <CardContent className="bg-sky-800 hover:bg-sky-900 h-52 flex flex-col justify-center">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-blue-100 text-center">
                  Recipe Finder
                </h2>
                <p className="text-base lg:text-lg text-blue-100 text-center">
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
              <CardContent className="bg-sky-800 hover:bg-sky-900 h-52 flex flex-col justify-center">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-blue-100 text-center">
                  Contact Us
                </h2>
                <p className="text-base lg:text-lg text-blue-100 text-center">
                  Reach out to us for any inquiries or feedback.
                </p>
              </CardContent>
            </Card>
          </Box>
        </Link>
      </div>
    </div>
  );
}

export default Home;
