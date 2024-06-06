import React, { useState, useRef } from "react";
import "./Components.css";
import Clear from "../assets/weather Images/clear.png";
import Mist from "../assets/weather Images/mist.png";
import Clouds from "../assets/weather Images/cloudy.png";
import Rain from "../assets/weather Images/rainy.png";
import Haze from "../assets/weather Images/haze.png";
import Fog from "../assets/weather Images/fog.png";
import Smoke from "../assets/weather Images/smoke.png";
import Button from "@mui/material/Button";

function Weather() {
  const weatherKey = import.meta.env.VITE_WEATHER_KEY;
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
      console.log(data);
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
    <div className="bg-gray-950 bg-center w-full bg-cover min-h-[95vh] pt-20 sm:pt-14 mx-auto sm:fixed z-10 left-0 font-serif tracking-wider">
      <div className="h-[500px] sm:h-[450px] w-[320px] sm:w-11/12 md:w-3/4 xl:w-1/2 md:h-[480px] xl:h-[500px] drop-shadow-md mx-auto flex flex-col mb-3 mt-16 sm:mt-20 md:mt-8 xl:mt-12 transition-all duration-1000 bg-white rounded-lg bg-opacity-5 pt-2 sm:py-6 border-x-2 border-y-4 border-white">
        <h1 className="font-bold mx-auto text-xl sm:text-2xl sm:mb-2 mt-5 sm:mt-0 font-sans text-white">
          Weather App
        </h1>
        <div className="flex flex-col w-full h-5/6 items-center">
          <div className="flex justify-center w-full sm:h-10 m-4 gap-5 sm:gap-10 px-2">
            <input
              className="w-1/2 sm:w-2/3 h-8 rounded-md text-md sm:text-lg pl-3 bg-white tracking-wide focus:outline-none"
              ref={inputRef}
              placeholder="Enter City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onBlur={(e) => setCity(e.target.value.trim())}
            />
            <Button
            variant="contained"
            color="secondary"
              className="w-20 sm:w-24 h-8 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <div
            id="result"
            className="flex flex-col h-40 sm:w-11/12 sm:h-5/6"
            ref={resultRef}
          >
            {weatherData && (
              <>
                <div className="flex justify-center w-full h-2/3 my-6 sm:my-0">
                  <img
                    className="h-20 w-20 md:h-24 md:w-24"
                    id="condition"
                    src={getWeatherIcon(weatherData.weather[0].main)}
                    alt="condition"
                  />
                </div>
                <div className="flex flex-wrap w-full mx-auto sm:gap-y-4 justify-center items-center sm:leading-relaxed font-sans tracking-wider text-lg sm:text-xl ">
                  <p className="text-justify w-60 h-1/4 text-gray-300">
                    <b>City</b> : {weatherData.name}
                  </p>
                  <p className="text-justify w-60 h-1/4 text-gray-300">
                    <b>Humidity</b> : {weatherData.main.humidity} %
                  </p>
                  <p className="text-justify w-60 h-1/4 text-gray-300">
                    <b>Weather</b> : {weatherData.weather[0].description}
                  </p>
                  <p className="text-justify w-60 h-1/4 text-gray-300">
                    <b>Temperature</b> : {weatherData.main.temp} °C
                  </p>
                  <p className="text-justify w-60 h-1/4 text-gray-300">
                    <b>Pressure</b> : {weatherData.main.pressure}
                  </p>
                  <p className="text-justify w-60 h-1/4 text-gray-300">
                    <b>Wind-Speed</b> : {weatherData.wind.speed} m/s
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
