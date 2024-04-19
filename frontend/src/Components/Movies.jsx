import React, { useEffect, useState } from "react";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movieKey = import.meta.env.VITE_MOVIE_KEY

  const handleSearch = async () => {
    const url = `https://www.omdbapi.com/?apikey=${movieKey}&s=${searchTerm}`;
    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const showDetails = async (movie) => {
    const url = `https://www.omdbapi.com/?apikey=${movieKey}&t=${movie.Title}`;
    const response = await fetch(url);
    const data = await response.json();
    setSelectedMovie(data);
  };

  const closeDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="bg-slate-950 flex flex-col items-center w-full min-h-screen font-serif tracking-wider">
      <div className="flex sm:flex-row flex-col w-full sm:w-1/2 mt-32 gap-x-4 sm:mt-20 h-24 items-center justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie name"
          className="border border-gray-400 rounded-md text-xl py-1 px-4 w-2/3 sm:w-2/3 mb-4 sm:mb-10 focus:outline-none"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white border border-gray-400 rounded-md text-xl py-1 px-4 w-32 sm:w-40 mb-10"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="w-full h-auto flex flex-wrap justify-center gap-10 pb-32 md:pb-20">
        {movies.map((movie, index) => (
          <div
            onClick={() => showDetails(movie)}
            key={index}
            className="cursor-pointer font-sans text-left border w-80 sm:w-72 h-96 border-gray-400 rounded-md p-4"
          >
            {movie.Poster && (
              <img
                src={movie.Poster}
                alt={`${movie.Title} Poster`}
                className="h-72 w-full sm:w-80"
              />
            )}
            <h1 className="text-md text-white mt-4 text-center">{movie.Title}</h1>
            <div className="flex justify-between text-sm mt-2 text-gray-300">
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-slate-100 mt-8 sm:mt-0 rounded-lg text-justify p-4 sm:p-8 w-4/5 sm:w-1/2 h-auto flex flex-col text-sm sm:text-lg gap-y-1 sm:gap-y-2 font-sans">
            <h2 className="text-xl sm:text-3xl text-center font-bold sm:mb-4">{selectedMovie.Title}</h2>
            <p><b>Year:</b> {selectedMovie.Year}</p>
            <p><b>Rating:</b> {selectedMovie.imdbRating}</p>
            <p><b>Type:</b> {selectedMovie.Type}</p>
            <p><b>Genre:</b> {selectedMovie.Genre}</p>
            <p><b>IMDB:</b> {selectedMovie.imdbID}</p>
            <p><b>Director:</b> {selectedMovie.Director}</p>
            <p><b>Actors:</b> {selectedMovie.Actors}</p>
            <p><b>Awards:</b> {selectedMovie.Awards}</p>
            <p><b>Plot:</b> {selectedMovie.Plot}</p>
            <button className="sm:mt-4 sm:w-40 mx-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
