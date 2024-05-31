import { useState, useRef } from "react";
import "./Components.css";

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
    <div className="bg-gray-950 bg-center w-full bg-cover min-h-[90vh] pt-20 sm:pt-14 px-5 sm:fixed z-10 left-0 font-serif tracking-wider">
      <div className="h-1/3 sm:h-96 w-11/12 md:w-2/3 xl:w-1/2 md:h-1/4 xl:h-1/3 drop-shadow-md mx-auto flex flex-col mb-3 mt-20 sm:mt-24 md:mt-0 xl:mt-6 transition-all duration-1000 bg-white rounded-lg bg-opacity-5 pt-2 sm:py-6 border-x-2 border-y-4 border-white">
        <h1 className="font-bold text-lg sm:text-2xl sm:mb-2 font-sans text-white">
          Dictionary
        </h1>
        <div className="flex flex-col w-full h-5/6 items-center">
          <div className="flex gap-x-2 sm:w-11/12 sm:h-10 m-4">
            <input
              className="sm:w-2/3 mx-auto w-4/5 h-6 sm:h-8 rounded-xl text-sm sm:text-lg pl-5 bg-white tracking-wide focus:outline-none"
              ref={inputRef}
              placeholder="Search meaning"
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <button
              className="w-28 h-6 sm:h-8 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div
            id="result"
            className="flex flex-col h-80 sm:w-11/12 sm:h-4/5 overflow-y-auto"
            ref={outputRef}
          >
            {meaning && (
              <div className="flex flex-col items-left text-sm sm:text-md p-2 leading-relaxed h-80 w-7/8 font-medium">
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
