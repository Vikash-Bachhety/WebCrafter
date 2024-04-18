import React, { useState, useRef } from "react";
import "./Components.css";
import Clear from "../assets/weather Images/clear.png";
import Mist from "../assets/weather Images/mist.png";
import Clouds from "../assets/weather Images/cloudy.png";
import Rain from "../assets/weather Images/rainy.png";
import Haze from "../assets/weather Images/haze.png";
import Fog from "../assets/weather Images/fog.png";
import Smoke from "../assets/weather Images/smoke.png";


function Weather() {
  const weatherKey = import.meta.env.VITE_WEATHER_KEY
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const inputRef = useRef(null);
  const resultRef = useRef(null);

  const handleSearch = async () => {
    try {
      setCity("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return Clear;
      case "Clouds":
        return Clouds;
      case "Rain":
        return Rain;
      case "Haze":
        return Haze;
      case "Fog":
        return Fog;
      case "Mist":
        return Mist;
      case "Smoke":
        return Smoke;
      default:
        return null;
    }
  };

  return (
    <div className="bg-black flex flex-col sm:flex-row bg-center w-full bg-cover sm:h-screen mt-8 sm:pt-20 sm:fixed z-10 left-0 font-serif tracking-wider">
      <div className="scrollLeft sm:w-1/4 w-11/12 h-32 sm:h-72 sm:p-4 mt-16 sm:mt-24 mb-3 sm:mb-28 flex flex-col sm:gap-y-4 mx-4 sm:m-24 bg-white rounded-lg bg-opacity-5 text-white border-black border-2 drop-shadow-sm">
        <h2 className="text-sm sm:text-2xl font-bold">Weather</h2>
        <p className="text-sm sm:text-lg sm:leading-relaxed sm:tracking-wider">
          Stay Ahead of the Elements Stay informed and prepared with real-time
          weather updates from API Galaxy. Whether you're planning outdoor
          activities, traveling, or simply curious about the forecast, we've got
          you covered.
        </p>
      </div>

      <div className="animate h-52 w-5/6 sm:w-1/4 sm:h-3/4 drop-shadow-md ml-8 sm:ml-0 flex flex-col mb-3 sm:mb-0 sm:mt-0 sm:hover:scale-95 transition-all duration-1000 bg-white rounded-lg bg-opacity-5 pt-2 sm:py-6 border-x-2 border-y-4 border-white">
        <h1 className="font-bold text-sm sm:text-2xl sm:mb-2 font-sans text-white">
          Weather App
        </h1>
        <div className="flex flex-col w-full h-5/6 items-center">
          <div className="flex gap-x-2 sm:w-11/12 sm:h-10 m-4">
            <input
              className="sm:w-4/5 w-2/3 h-6 sm:h-8 rounded-xl text-md sm:text-lg pl-5 bg-white tracking-wide focus:outline-none"
              ref={inputRef}
              placeholder="Enter City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onBlur={(e) => setCity(e.target.value.trim())}
            />
            <button
              className="w-28 h-6 sm:h-8 rounded-xl bg-red-500 text-white border border-white font-semibold"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div
            id="result"
            className="flex flex-col h-40 sm:w-11/12 sm:h-5/6"
            ref={resultRef}
          >
            {weatherData && (
              <>
                <div className="flex justify-center w-full h-2/3">
                  <img
                    className="h-6 w-6 sm:h-24 sm:w-24"
                    id="condition"
                    src={getWeatherIcon(weatherData.weather[0].main)}
                    alt="condition"
                  />
                </div>
                <div className="flex flex-wrap sm:w-[350px] sm:h-[450px] sm:gap-y-4 sm:mt-5 pl-2 justify-around items-center sm:leading-relaxed font-sans tracking-wider text-sm sm:text-lg ">
                  <p className="text-justify w-36 h-1/4 text-white">
                    City: {weatherData.name}
                  </p>
                  <p className="text-justify w-36 h-1/4 text-white">
                    Humidity: {weatherData.main.humidity}
                  </p>
                  <p className="text-justify w-36 h-1/4 text-white">
                    Weather: {weatherData.weather[0].description}
                  </p>
                  <p className="text-justify w-36 h-1/4 text-white">
                    Temperature: {weatherData.main.temp} °C
                  </p>
                  <p className="text-justify w-36 h-1/4 mt-3 text-white">
                    Wind-Speed: {weatherData.wind.speed}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="scrollRight sm:w-1/4 w-11/12 h-28 sm:h-72 sm:p-4  mb-28 flex flex-col sm:gap-y-4 mx-4 sm:m-24 bg-white rounded-lg bg-opacity-5 text-white border-black border-2 drop-shadow-sm">
        <h2 className="text-sm sm:text-2xl font-bold">
          Location-Based Weather
        </h2>
        <p className="text-sm sm:text-lg sm:leading-relaxed sm:tracking-wider">
          Whether you're at home or exploring a new destination, our
          location-based weather feature provides you with accurate forecasts
          tailored to your current location.
        </p>
      </div>
    </div>
  );
}

export default Weather;
