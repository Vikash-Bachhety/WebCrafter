import React, { useEffect, useState } from "react";
import search from "../assets/search.png";
import StarRating from "./StarRating";

function Content() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [indian, setIndian] = useState([]);
  const [american, setAmerican] = useState([]);
  const [italian, setItalian] = useState([]);
  const [french, setFrench] = useState([]);

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
    fetchData("american", setAmerican);
    fetchData("italian", setItalian);
    fetchData("french", setFrench);
  }, []);

  const dataFetch = async (meal) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
      );
      const result = await response.json();
      setData(result.meals);
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
    <div
      className="bg-sky-950"
      style={{
        display: "flex",
        minHeight: "100vh",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        width: "auto",
        color: "black",
        textShadow: "10px",
        paddingBottom: "18vh",
      }}
    >
      <div className="animate flex wrap items-center md:gap-x-4 justify-center w-full mt-24 md:mt-16">
        <input
          className="text-black text-sm md:text-lg font-medium py-1 px-5 w-56 md:w-72 border-2 border-gray-300 outline-none rounded-full"
          type="search"
          placeholder="search meal"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img
          style={{ height: "80px", width: "80px", filter: "invert(1)" }}
          onClick={handleClick}
          src={search}
          alt=""
        />
      </div>

      <div className="flex flex-wrap justify-center gap-5 md:py-5 md:mt-0 text-white">
        {data.map((item) => (
          <div key={item.idMeal}>
            <div className="flex justify-evenly center mb-4 text-white">
              <h3
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  color: "white",
                }}
              >
                {item.strArea}
              </h3>
              <h5>{item.strMeal}</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              <StarRating />
            </div>

            <img
              style={{
                height: "290px",
                width: "290px",
                borderRadius: "20px",
                border: "4px solid",
              }}
              src={item.strMealThumb}
              alt=""
            />
          </div>
        ))}
      </div>

      <h1 className="text-white text-center font-bold text-3xl md:text-4xl -mt-2 md:mt-2 font-sans">
        Indian
      </h1>
      <div className="flex flex-wrap justify-center p-2 w-94vw h-auto">
        {indian.map((meal) => (
          <div
            style={{
              color: "white",
              width: "350px",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            key={meal.idMeal}
          >
            <h3
              style={{ fontSize: "18px", fontWeight: "400", padding: "10px" }}
            >
              {meal.strMeal}
            </h3>
            <StarRating />
            <img
              style={{
                width: "290px",
                height: "290px",
                marginTop: "5px",
                borderRadius: "20px",
                objectFit: "cover",
                border: "4px solid",
                boxShadow: "20px",
              }}
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        ))}
      </div>
      <h1 className="text-white text-center font-bold text-3xl md:text-4xl -mt-2 md:mt-2 font-sans">
        American
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          padding: "10px",
          width: "auto",
          height: "auto",
        }}
      >
        {american.map((meal) => (
          <div
            style={{
              color: "white",
              width: "350px",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            key={meal.idMeal}
          >
            <h3
              style={{ fontSize: "18px", fontWeight: "400", padding: "10px" }}
            >
              {meal.strMeal}
            </h3>
            <StarRating />
            <img
              style={{
                width: "300px",
                height: "300px",
                marginTop: "5px",
                borderRadius: "20px",
                objectFit: "cover",
                border: "4px solid",
              }}
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        ))}
      </div>
      <h1 className="text-white text-center font-bold text-3xl md:text-4xl -mt-2 md:mt-2 font-sans">
        Italian
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          padding: "10px",
          width: "auto",
          height: "auto",
        }}
      >
        {italian.map((meal) => (
          <div
            style={{
              color: "white",
              width: "350px",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            key={meal.idMeal}
          >
            <h3
              style={{ fontSize: "18px", fontWeight: "400", padding: "10px" }}
            >
              {meal.strMeal}
            </h3>
            <StarRating />
            <img
              style={{
                width: "300px",
                height: "300px",
                marginTop: "5px",
                borderRadius: "20px",
                objectFit: "cover",
                border: "4px solid",
              }}
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        ))}
      </div>
      <h1 className="text-white text-center font-bold text-3xl md:text-4xl -mt-2 md:mt-2 font-sans">
        French
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          padding: "10px",
          width: "auto",
          height: "auto",
        }}
      >
        {french.map((meal) => (
          <div
            style={{
              color: "white",
              width: "350px",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            key={meal.idMeal}
          >
            <h3
              style={{ fontSize: "18px", fontWeight: "400", padding: "10px" }}
            >
              {meal.strMeal}
            </h3>
            <StarRating />
            <img
              style={{
                width: "300px",
                height: "300px",
                marginTop: "5px",
                borderRadius: "20px",
                objectFit: "cover",
                border: "4px solid",
              }}
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
