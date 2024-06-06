import React, { useEffect, useState } from "react";
import search from "../assets/search.png";
import StarRating from "./StarRating";

function Recipe() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [indian, setIndian] = useState([]);
  // const [american, setAmerican] = useState([]);
  // const [italian, setItalian] = useState([]);
  const [french, setFrench] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    const result = dataFetch(searchInput);
    if (!result) {
      setItemNotFound(true);
    } else {
      setItemNotFound(false);
    }
  };

  useEffect(() => {
    fetchData("indian", setIndian);
    fetchData("french", setFrench);
    // fetchData("american", setAmerican);
    // fetchData("italian", setItalian);
  }, []);

  const dataFetch = async (meal) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
      );
      if (!response.ok) {
        throw new Error("Server is busy, Please try again");
      }
      const result = await response.json();
      if (!result.meals) {
        setError("Recipe not found! Search another.");
        setData([]);
        setTimeout(() => {
          setError("");
        }, 800);
      } else {
        setData(result.meals);
        setError(null);
      }
    } catch (error) {
      console.log("Error in fetch : " + error);
    }
  };

  const fetchData = async (country, setData) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
      );
      const result = await response.json();

      switch (country) {
        case "indian":
          setIndian(result.meals);
          break;

        case "american":
          setAmerican(result.meals);
          break;

        case "italian":
          setItalian(result.meals);
          break;
        case "french":
          setFrench(result.meals);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("Error in fetching : " + error);
    }
  };

  return (
    <div className="bg-sky-950 min-h-screen flex flex-col items-center text-black text-shadow md:flex-wrap md:flex-row md:justify-center md:items-start md:text-white">
      <div className="animate flex items-center gap-x-4 justify-center w-full mt-28 md:mt-16">
        <input
          className="text-sm text-black md:text-lg font-medium py-1 px-5 w-56 md:w-72 border-2 border-gray-300 outline-none rounded-full"
          type="search"
          placeholder="search meal"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img
          className="h-20 w-20 filter invert"
          onClick={handleClick}
          src={search}
          alt=""
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap justify-center gap-5 md:py-5 md:mt-0 text-white">
        {data.map((item) => (
          <div key={item.idMeal}>
            <div className="flex justify-evenly items-center mb-4 text-white">
              <h3 className="font-semibold text-xl">{item.strArea}</h3>
              <h5>{item.strMeal}</h5>
            </div>
            <div className="flex justify-center mb-2">
              <StarRating />
            </div>

            <img
              className="w-72 h-72 mt-2 rounded-lg border-4 border-white object-cover"
              src={item.strMealThumb}
              alt=""
            />
          </div>
        ))}
      </div>
      

      <h1 className="text-center w-full text-white font-bold text-3xl md:text-4xl mt-3 md:mt-2 font-sans">
        Indian
      </h1>

      <div className="flex flex-wrap justify-center p-2 w-full md:w-94vw h-auto">
        {indian.map((meal) => (
          <div
            className="text-white w-80 h-96 flex flex-col items-center"
            key={meal.idMeal}
          >
            <h3 className="text-lg font-medium py-2">{meal.strMeal}</h3>
            <StarRating />
            <img
              className="w-72 h-72 mt-2 rounded-lg border-4 border-white object-cover"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        ))}
      </div>

      {/* <h1 className="text-center text-white  font-bold text-3xl md:text-4xl mt-3 md:mt-2 font-sans">
        American
      </h1>
      <div className="flex flex-wrap justify-center p-2 w-full md:w-94vw h-auto">
        {american.map((meal) => (
          <div
            className="text-white w-96 h-96 flex flex-col items-center"
            key={meal.idMeal}
          >
            <h3 className="text-lg font-medium py-2">{meal.strMeal}</h3>
            <StarRating />
            <img
              className="w-72 h-72 mt-2 rounded-lg border-4 border-white object-cover"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        ))}
      </div>

      <h1 className="text-center text-white  font-bold text-3xl md:text-4xl mt-3 md:mt-2 font-sans">
        Italian
      </h1>
      <div className="flex flex-wrap justify-center p-2 w-full md:w-94vw h-auto">
        {italian.map((meal) => (
          <div
            className="text-white w-96 h-96 flex flex-col items-center"
            key={meal.idMeal}
          >
            <h3 className="text-lg font-medium py-2">{meal.strMeal}</h3>
            <StarRating />
            <img
              className="w-72 h-72 mt-2 rounded-lg border-4 border-white object-cover"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        ))}
      </div> */}

      <h1 className="text-center text-white  font-bold text-3xl md:text-4xl mt-3 md:mt-2 font-sans">
        French
      </h1>
      <div className="flex flex-wrap justify-center p-2 w-full md:w-94vw mb-20 h-auto">
        {french.map((meal) => (
          <div
            className="text-white w-80 h-96 flex flex-col items-center"
            key={meal.idMeal}
          >
            <h3 className="text-lg font-medium py-2">{meal.strMeal}</h3>
            <StarRating />
            <img
              className="w-72 h-72 mt-2 rounded-lg border-4 border-white object-cover"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipe;
