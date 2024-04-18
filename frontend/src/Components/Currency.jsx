import React, { useState, useEffect, useRef } from 'react';
import './Components.css'

function Currency() {
  const inputRef = useRef(null);
  const resultRef = useRef(null);

  const [currencyFrom, setCurrencyFrom] = useState("usd");
  const [currencyTo, setCurrencyTo] = useState("inr");
  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    fetchExchangeRate();
  }, [currencyFrom, currencyTo]);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyFrom}.json`);
      if (!response.ok) {
        throw new Error("Unable to fetch exchange rate. Please try again.");
      }
      const data = await response.json();

      const exchangeRate = data[currencyFrom][currencyTo];
      setExchangeRate(exchangeRate);

    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  const handleConversion = () => {
    const convertedAmount = parseFloat(amount) * parseFloat(exchangeRate);
    resultRef.current.value = convertedAmount.toFixed(2);
  };
  
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col sm:flex-row bg-center w-full bg-cover sm:h-[90vh] mt-8 sm:fixed -z-10 left-0 font-serif tracking-wider">
      <div className='scrollLeft sm:w-1/4 w-11/12 h-32 sm:h-72 sm:p-4 flex flex-col sm:gap-y-4 mx-4 mt-12 sm:m-24 bg-black rounded-lg bg-opacity-80 text-white border-black border-2 drop-shadow-sm'>
        <h2 className='text-md sm:text-2xl font-bold'>Currency Converter</h2>
        <p className='text-sm sm:text-lg sm:leading-relaxed tracking-wider'>Experience seamless currency conversions with the currency converter feature of API Galaxy. Whether you're traveling, shopping internationally, our tool makes currency conversion effortless.</p>
      </div>

      <div className='animate h-52 w-5/6 sm:w-1/4 sm:h-2/3 drop-shadow-md ml-8 sm:ml-0 flex flex-col  mt-2 mb-3 sm:mb-0 sm:mt-10 sm:hover:scale-105 transition-all duration-1000 bg-black rounded-lg bg-opacity-60 pt-2 sm:py-6 border-x-2 border-y-4 border-white'>
        <h1 className="font-bold text-sm sm:text-2xl sm:mb-2 font-serif text-white">Currency Converter</h1>
        <div className="flex flex-col gap-y-1 sm:gap-y-5 w-full h-5/6 items-center">
            <label className='text-white font-medium font-serif text-sm sm:text-xl' htmlFor="amount">From</label>
            <input
              className="sm:w-4/5 w-2/3 h-5 sm:h-10 rounded-2xl sm:font-bold tracking-widest text-lg text-center pl-5 bg-white focus:outline-none"
              ref={inputRef}
              placeholder="Enter Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />

            <select
              className="w-1/3 sm:w-2/5 h-5 sm:h-10 rounded-xl sm:font-bold tracking-widest text-center text-lg bg-white focus:outline-none"
              value={currencyFrom}
              onChange={(e) => setCurrencyFrom(e.target.value)}
            >
              <option value="usd">usd</option>
              <option value="eur">eur</option>
              <option value="inr">inr</option>
              <option value="cny">cny</option>
              <option value="jpy">jpy</option>
              <option value="gbp">gbp</option>
              <option value="aud">aud</option>
              <option value="cad">cad</option>
            </select>



            <label className='text-white font-medium font-serif text-sm sm:text-xl sm:mt-5' htmlFor="result">To</label>

            <select
              className="w-2/5 sm:h-10 rounded-2xl sm:font-bold text-center text-lg bg-white tracking-widest focus:outline-none"
              value={currencyTo}
              onChange={(e) => setCurrencyTo(e.target.value)}
            >
              <option value="usd">usd</option>
              <option value="eur">eur</option>
              <option value="inr">inr</option>
              <option value="cny">cny</option>
              <option value="jpy">jpy</option>
              <option value="gbp">gbp</option>
              <option value="aud">aud</option>
              <option value="cad">cad</option>
            </select>
            <input
              className="sm:w-3/4 w-2/3 h-5 sm:h-10 rounded-2xl sm:font-bold tracking-widest text-lg text-center pl-5 bg-white focus:outline-none"
              ref={resultRef}
              placeholder=""
              type="number"
              disabled
            />

            <button
              className=" w-20 sm:w-28 h-6 sm:h-10 rounded-xl bg-green-500 text-white border border-white font-semibold"
              onClick={handleConversion}
            >
              Convert
            </button>
        </div>
      </div>

      <div className='scrollRight sm:w-1/4 w-11/12 h-28 sm:h-72 sm:p-4  mb-28 flex flex-col sm:gap-y-4 mx-4 sm:m-24 bg-black rounded-lg bg-opacity-80 text-white border-black border-2 drop-shadow-sm'>
        <h2 className='text-md sm:text-2xl mt-2 font-bold'>Real-Time Exchange Rates</h2>
        <p className='text-sm sm:text-lg sm:leading-relaxed tracking-wider'>Access real-time exchange rates for a wide range of currencies from around the world. Stay informed about currency fluctuations and make informed decisions.</p>
      </div>
    </div>
  )
}

export default Currency;
