import React, { useState, useEffect } from "react";
import md5 from "md5";

const marvelpublicKey = import.meta.env.VITE_PUBLIC_KEY
const marvelprivateKey = import.meta.env.VITE_PRIVATE_KEY

const timestamp = new Date().getTime().toString();
const hash = md5(timestamp + marvelprivateKey + marvelpublicKey);

const baseUrl = "https://gateway.marvel.com/v1/public/";
const endpoint = "characters";

function Marvel() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const fetchCharacters = async () => {
    const searchUrl = `${baseUrl}${endpoint}?apikey=${marvelpublicKey}&ts=${timestamp}&hash=${hash}&name=${search}`;
    try {
      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error("Character not found! Search again");
      }
      const data = await response.json();
      setCharacters(data.data.results);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = async () => {
    fetchCharacters();
  };

  return (
    <div className="w-full h-auto text-black">
      <input
        className="border border-gray-400 rounded-md text-xl mt-28 sm:mt-20 py-1 px-4 w-2/3 sm:w-1/3 mb-4 sm:mb-10 focus:outline-none"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Marvel Character"
      />
      <button
        className="bg-red-600 hover:bg-green-700 text-white text-xl ml-4 py-1 px-4 w-32 sm:w-40 mb-2"
        onClick={handleSearch}
      >
        Search
      </button>
      {error && <p className="text-red-500 mb-5">{error}</p>}
      {characters.length > 0 && (
        <div className="mx-auto w-4/5 sm:w-1/2 h-auto flex flex-col bg-red-600 rounded-3xl text-white mb-36 md:mb-20 p-5 gap-y-4">
          {characters.map((character) => (
            <div key={character.id}>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="w-48 h-48 md:w-72 md:h-72 border-4 border-yellow-300 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-center mb-2">
                {character.name}
              </h1>
              {character.description && (
                <p>
                  <strong>Description:</strong> {character.description}
                </p>
              )}
              <p>
                <strong>Comics:</strong> {character.comics.available}
              </p>
              <p>
                <strong>Series:</strong> {character.series.available}
              </p>
              <p>
                <strong>Stories:</strong> {character.stories.available}
              </p>
              <p>
                <strong>Events:</strong> {character.events.available}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Marvel;
