import React, { useEffect, useState, useCallback, useRef } from 'react'

function Password() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);

  
  const passRef = useRef(null);

  const click = useCallback(() => {
    passRef.current?.select(password);
    window.navigator.clipboard.writeText(password);
  });

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) {
      str += "0123456789";
    }
    if (characters) {
      str += "!@#$%&*";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }

    setPassword(pass);
  },
    [length, numbers, characters, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, numbers, characters])

  return (
    <div className='bg-sky-950 h-[90vh] flex justify-center mt-9 sm:mt-0'>
      <div className='animate flex flex-col shadow-black shadow-xl sm:w-1/3 w-80 h-60 sm:h-60 mt-36 sm:mt-40 gap-10 bg-opacity-15 sm:bg-opacity-10 items-center sm:hover:scale-105 transition-all duration-1000 bg-white rounded-lg border-x-4 border-y-8 border-white'>
      <div className='flex items-center mt-10 sm:mt-20'>
        <input
        className='bg-white w-52 sm:w-96 pl-2 sm:h-10 h-6 rounded-l-lg focus:outline-none'
          type="text"
          placeholder='Password'
          value={password}
          ref={passRef}
          readOnly
        />

        <button
        className='w-20 h-6 sm:h-10 rounded-r-lg bg-blue-700 text-white'
          id='btn'
          onClick={click}
        >Copy</button>
      </div>

      <div className='flex flex-col sm:flex-row sm:gap-x-6 sm:items-center justify-center text-lg text-white font-semibold'>
      <div className='flex gap-2'>
        <input type="range"
          min={6}
          max={20}
          value={length}
          onChange={(e) => { setLength(e.target.value) }}
        />
        <label htmlFor="length">length: {length}</label>
        </div>
        <div className='flex gap-2'>
        <input
          type="checkbox"
          defaultChecked={numbers}
          onChange={() => {
            setNumbers((prev) => !prev)
          }} 
          />
        <label htmlFor="Numbers">Numbers</label>
        </div>
        <div className='flex gap-2'>
        <input
          type="checkbox"
          defaultChecked={characters}
          onChange={() => {
            setCharacters((prev) => !prev)
          }}
        />
        <label htmlFor="Characters">Characters</label>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Password