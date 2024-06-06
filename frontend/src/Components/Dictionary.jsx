import { useState, useRef } from "react";
import "./Components.css";
import Button from "@mui/material/Button";

function Dictionary() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState(null);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const handleSearch = async function () {
    try {
      setWord("");
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data. Please try again.");
      } else {
        const data = await response.json();
        setMeaning(data);
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-950 bg-center w-full bg-cover min-h-[95vh] pt-20 sm:pt-14 mx-auto sm:fixed z-10 left-0 font-serif tracking-wider">
      <div className="h-[460px] sm:h-[450px] w-[320px] sm:w-11/12 md:w-3/4 xl:w-1/2 md:h-[480px] xl:h-[500px] drop-shadow-md mx-auto flex flex-col mt-16 sm:mt-20 md:mt-8 xl:mt-12 bg-white rounded-lg bg-opacity-5 pt-4 sm:py-6 border-x-2 border-y-4 border-white">
        <h1 className="font-bold mx-auto text-lg sm:text-2xl sm:mb-2 font-sans text-white">
          Dictionary
        </h1>
        <div className="flex flex-col w-full h-5/6 items-center">
        <div className="flex justify-center w-full sm:h-10 m-4 gap-5 sm:gap-10 px-2">
            <input
              className="w-1/2 sm:w-2/3 h-8 rounded-md text-md sm:text-lg pl-3 bg-white tracking-wide focus:outline-none"
              ref={inputRef}
              placeholder="Search meaning"
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <Button
            variant="contained"
            color="warning"
              className="w-20 sm:w-24 h-8 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <div
            id="result"
            className="flex flex-col h-80 sm:w-11/12 sm:h-4/5 overflow-y-auto"
            ref={outputRef}
          >
            {meaning && (
              <div className="flex flex-col items-left text-sm sm:text-md px-3 leading-relaxed h-80 w-7/8 font-medium">
                <div className="flex flex-wrap justify-between">
                  <p className="text-left text-white text-lg sm:text-xl">
                    <b>Word:</b> {meaning[0].word}
                  </p>
                </div>
                <br />
                <p className="text-left leading-tight sm:leading-loose sm:text-justify text-white text-lg">
                  <b>Meanings:</b>{" "}
                  {meaning[0].meanings[0].definitions[0].definition}
                </p>
                <br />
                {meaning[0].meanings[0].definitions[1] && (
                  <p className="text-left leading-tight sm:leading-loose sm:text-justify text-white text-lg">
                    <b>Other:</b>{" "}
                    {meaning[0].meanings[0].definitions[1].definition}
                  </p>
                )}
                <br />
                {meaning[0].meanings[0].definitions[2] && (
                  <p className="text-left leading-tight sm:leading-loose sm:text-justify text-white text-lg">
                    <b>Other:</b>{" "}
                    {meaning[0].meanings[0].definitions[2].definition}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dictionary;
