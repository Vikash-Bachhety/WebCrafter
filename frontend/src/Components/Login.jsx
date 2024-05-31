import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "https://webcrafter-production.up.railway.app";
// const BASE_URL = "http://localhost:3000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      if (response && response.status === 200) {
        const token = response.data;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success("Login successful");
        navigate("/Home");
      } else {
        toast.error("Unexpected error during login. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not found, Please register");
        } else if (error.response.status === 401) {
          toast.warning("Wrong password, Try again");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-black py-12 mx-auto sm:px-6 lg:px-8">
      <div className="w-11/12 sm:w-auto px-2 sm:px-6 py-4 bg-slate-200 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 flex flex-col items-center">
        <h2 className="text-2xl text-gray-100 font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 w-auto text-left">
            <label
              htmlFor="fullName"
              className="text-gray-100 tracking-wide"
            >
              Email
            </label>
            <input
              type="email"
              value={email.toLowerCase().trim()}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="input mt-2"
            />
            <label
              htmlFor="fullName"
              className="text-gray-100 tracking-wide"
            >
              Password
            </label>
            <input
              type="password"
              value={password.trim()}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="input mt-2 tracking-wide"
            />
          </div>
          <button
            type="submit"
            className="w-36 py-1 mx-auto bg-blue-600 hover:bg-blue-500 text-gray-100 text-lg rounded-md tracking-wider"
          >
            Log In
          </button>
          <div className="flex justify-center w-full gap-1 mt-4">
            <span className="text-gray-500">Already have an account?</span>
            <Link to="/Signup" className="text-sky-700 hover:text-sky-500">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
