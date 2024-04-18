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
        minHeight:"100vh",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        width: "auto",
        color: "black",
        textShadow: "10px",
        paddingBottom: "18vh",
      }}
    >
      <div
        className="animate"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
          width: "100%",
          marginTop: "100px",
        }}
      >
        <input
          style={{
            fontSize: "14px",
            fontWeight: "500 ",
            color: "black",
            padding: "5px 20px",
            width: "300px",
            border: "2px solid #90a4ad",
            outline: "none",
            borderRadius: "25px",
            alignItems: "center",
          }}
          type="search"
          placeholder="search meal"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img
          style={{ height: "40px", width: "40px" }}
          onClick={handleClick}
          src={search}
          alt=""
        />
      </div>

      <div
        style={{
          display: "flex",
          width: "full",
          height: "auto",
          padding: "5px",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
          marginBottom: "20px",
          justifyContent: "space-evenly",
        }}
      >
        {data.map((item) => (
          <div key={item.idMeal}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
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
            <div style={{display:"flex", justifyContent:"center", marginBottom:"5px"}}><StarRating /></div>
            
            <img
              style={{
                height: "300px",
                width: "300px",
                borderRadius: "20px",
                border: "4px solid",
              }}
              src={item.strMealThumb}
              alt=""
            />
          </div>
        ))}
      </div>

      <h1
        style={{
          color:"white",
          textAlign: "center",
          fontWeight: "800",
          fontSize: "32px",
          fontFamily: "sans-serif",
        }}
      >
        Indian
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "10px",
          width: "94vw",
          height: "auto",
        }}
      >
        {indian.map((meal) => (
          <div
            style={{
              color:"white",
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
                boxShadow: "20px",
              }}
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        ))}
      </div>
      <h1
        style={{
          color:"white",
          textAlign: "center",
          fontWeight: "800",
          fontSize: "32px",
          fontFamily: "sans-serif",
        }}
      >
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
              color:"white",
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
      <h1
        style={{
          color:"white",
          textAlign: "center",
          fontWeight: "800",
          fontSize: "32px",
          fontFamily: "sans-serif",
        }}
      >
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
              color:"white",
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
      <h1
        style={{
          color:"white",
          textAlign: "center",
          fontWeight: "800",
          fontSize: "32px",
          fontFamily: "sans-serif",
        }}
      >
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
              color:"white",
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
