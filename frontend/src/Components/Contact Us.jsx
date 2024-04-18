import React from "react";
import { useState } from "react";
import "./Components.css";
import axios from "axios";

const BASE_URL = "https://galaxy-backend-one.vercel.app";
// const BASE_URL = "https://galaxy-backend-49wa.onrender.com";


function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/contact`, {
        name,
        email,
        subject,
        message,
      },
      { withCredentials: true });
      setSuccessMessage("message successful!y sent");
    } catch (error) {
      console.error(error.message);
      setErrorMessage("message sending failed", error);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 1000);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="bg-slate-950 flex justify-center bg-center border border-black w-full bg-cover h-[85vh] sm:mt-4 relative z-10 left-0 font-serif tracking-wider">
      <div className="animate w-3/4 h-3/5 mt-36 sm:w-1/3 sm:h-4/5 bg-white bg-opacity-10 flex justify-center items-center shadow-black shadow-xl rounded-lg sm:mt-14">
        <form
          onSubmit={handleSubmit}
          className="mt-8 sm:mt-0 p-6 sm:p-0 w-full max-w-md"
        >
          <h1 className="sm:text-3xl text-lg font-extrabold mb-3 sm:mb-2 sm:mt-6 text-white">
            Contact Us
          </h1>
          {successMessage && (
            <div className="sm:w-3/4 bg-green-900 bg-opacity-90 text-green-100 rounded-md mx-auto sm:py-1 mb-2">
              {successMessage}
            </div>
          )}
          {errorMessage && <div className="sm:w-3/4 bg-red-900 bg-opacity-90 text-red-100 rounded-md mx-auto sm:py-1 mb-2">{errorMessage}</div>}
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm sm:text-md font-normal sm:font-bold sm:mb-2 text-white text-left"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm sm:text-md font-normal sm:font-bold sm:mb-2 text-white text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="subject"
              className="block text-sm sm:text-md font-normal sm:font-bold sm:mb-2 text-white text-left"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="shadow appearance-none border rounded w-full sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="message"
              className="block text-sm sm:text-md font-normal sm:font-bold sm:mb-2 text-white text-left"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows = "4"
              className="shadow appearance-none border rounded w-full sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="flex items-center mb-6 justify-between">
            <button
              type="submit"
              className="bg-red-500 hover:bg-green-500 text-white font-bold sm:py-2 px-2 sm:px-4 rounded focus:outline-none focus:shadow-outline mb-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
