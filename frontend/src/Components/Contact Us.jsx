import React from "react";
import { useState } from "react";
import "./Components.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const BASE_URL = "https://webcrafter-production.up.railway.app";
// const BASE_URL = "http://localhost:3000";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/contact`,
        {
          name,
          email,
          subject,
          message,
        },
        { withCredentials: true }
      );
      toast.success("Message successful!y sent");
    } catch (error) {
      console.error(error.message);
      toast.error("Message sending failed");
    }
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="bg-gray-950 flex justify-center bg-center border border-black w-full bg-cover h-screen sm:mt-4 relative z-10 left-0 font-serif tracking-wider">
      <div className="animate w-3/4 h-2/3 mt-36 sm:w-2/3 lg:w-1/3 sm:h-3/4 bg-white bg-opacity-10 flex justify-center items-center shadow-black shadow-xl rounded-lg sm:mt-24 md:mt-20">
        <form
          onSubmit={handleSubmit}
          className="mt-8 sm:mt-0 p-6 sm:px-8 xl:px-0 w-full max-w-md"
        >
          <h1 className="sm:text-3xl text-lg font-extrabold mb-3 sm:mb-2 sm:mt-6 text-white">
            Contact Us
          </h1>
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
              onBlur={(e)=> setName(e.target.value.trim())}
              required
              className="shadow appearance-none border rounded w-full py-1 sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              onBlur={(e)=> setEmail(e.target.value.trim())}
              required
              className="shadow appearance-none border rounded w-full py-1 sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              onBlur={(e)=> setSubject(e.target.value.trim())}
              required
              className="shadow appearance-none border rounded w-full py-1 sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              onBlur={(e)=> setMessage(e.target.value.trim())}
              rows="4"
              required
              className="shadow appearance-none border rounded w-full sm:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
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
