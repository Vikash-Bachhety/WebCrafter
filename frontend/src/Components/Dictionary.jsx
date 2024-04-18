import { useState, useRef } from 'react';
import './Components.css'
import sound from '../assets/audio.png';

function Dictionary() {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState(null);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const handleSearch = async function () {
    try {
      setWord('')
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data. Please try again.");
      } else {
        const data = await response.json();
        setMeaning(data);
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-950 flex flex-col sm:flex-row bg-center w-full bg-cover sm:h-[90vh] mt-8 sm:pt-14 sm:fixed z-10 left-0 font-serif tracking-wider">
      <div className='scrollLeft sm:w-1/4 w-11/12 h-32 sm:h-72 sm:p-4 flex flex-col sm:gap-y-4 mx-4 mt-16 sm:m-24 bg-white rounded-lg bg-opacity-5 text-white border-black border-2 drop-shadow-sm'>
        <h2 className='text-md sm:text-2xl font-bold'>Dictionary</h2>
        <p className='text-sm sm:text-lg sm:leading-relaxed tracking-wider'>Explore the vast world of language with the dictionary feature of API Galaxy. Whether you're a word enthusiast, or simply curious about meanings and definitions, dive into our comprehensive dictionary.</p>
      </div>
      <div className='animate h-52 w-5/6 sm:w-1/4 sm:h-3/4 drop-shadow-md ml-8 sm:ml-0 flex flex-col mt-2 mb-3 sm:mb-0 sm:mt-6 sm:hover:scale-95 transition-all duration-1000 bg-white rounded-lg bg-opacity-5 pt-2 sm:py-6 border-x-2 border-y-4 border-white'>
        <h1 className="font-bold text-sm sm:text-2xl sm:mb-2 font-sans text-white">Dictionary App</h1>
        <div className="flex flex-col w-full h-5/6 items-center">
        <div className="flex gap-x-2 sm:w-11/12 sm:h-10 m-4">
            <input
              className="sm:w-4/5 w-2/3 h-6 sm:h-8 rounded-xl text-sm sm:text-lg pl-5 bg-white tracking-wide focus:outline-none"
              ref={inputRef}
              placeholder="Enter Word"
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <button
              className="w-28 h-6 sm:h-8 rounded-xl bg-green-500 text-white border border-white font-semibold"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div id="result" className='scroll flex flex-col h-80 sm:w-11/12 sm:h-4/5 overflow-y-auto' ref={outputRef}>

            {meaning && (
              <div className="flex flex-col sm:gap-y-2 items-left flex-wrap text-sm sm:text-md p-2 leading-relaxed h-80 w-7/8 font-medium">
                <div className='flex flex-wrap justify-between'>
                  <p className="text-left text-white text-md sm:text-xl">Word: {meaning[0].word}</p>
                  {meaning[0].phonetics.length > 0 && (
                    <img
                      className='sm:h-8 sm:w-8 h-5 w-5 invert cursor-pointer'
                      src={sound}
                      alt="pronounce"
                      onClick={() => {
                        const audio = new Audio(meaning[0].phonetics[0].audio);
                        audio.play();
                      }}
                    />
                  )}
                </div>
                <p className="text-left leading-tight sm:leading-loose sm:text-justify text-white">
                  <b>Meanings:</b> {meaning[0].meanings[0].definitions[0].definition}
                </p>
                {meaning[0].meanings[0].definitions[1] && (
                <p className="text-left leading-tight sm:leading-loose sm:text-justify text-white">
                <b>Other:</b> {meaning[0].meanings[0].definitions[1].definition}
                  </p>
                )}
                {meaning[0].meanings[0].definitions[2] && (
                <p className="text-left leading-tight sm:leading-loose sm:text-justify text-white">
                <b>Other:</b> {meaning[0].meanings[0].definitions[2].definition}
                  </p>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      <div className='scrollRight sm:w-1/4 w-11/12 h-28 sm:h-72 sm:p-4 mb-28 flex flex-col sm:gap-y-4 mx-4 sm:m-24 bg-white rounded-lg bg-opacity-5 text-white border-black border-2 drop-shadow-sm'>
        <h2 className='text-sm sm:text-2xl font-bold'>Start Exploring Words</h2>
        <p className='text-sm sm:text-lg sm:leading-relaxed sm:tracking-wider'>Ready to embark on a journey through the world of words? Click below to start exploring definitions, synonyms, pronunciations, and more with API Galaxy's dictionary feature.</p>
      </div>
    </div >

  );
}

export default Dictionary;
