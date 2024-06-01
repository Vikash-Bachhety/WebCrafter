import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://webcrafter-production.up.railway.app/api/signup",
        // "http://localhost:3000/api/signup",
        input
      );

      if (response && response.status === 201) {
        const token = response.data;
        axios.defaults.headers.common["Authorization"] = token;
        localStorage.setItem("token", token);
        toast.success("Registered successfully");
        navigate("/Home");
      } else {
        console.log("Unexpected response during signup:", response);
        toast.error("Unexpected error during signup. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("User already registered. Please login.");
        } else if (error.response.status === 422) {
          toast.warning("Password not matched.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
      console.log("Error during signup:", error);
    }
  };

  const handleGenderChange = (e) => {
    setInput({ ...input, gender: e.target.value });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-900 py-12 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-11/12 sm:w-auto px-3 sm:px-6 py-4 bg-slate-950 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 flex flex-col items-center">
        <h2 className="text-2xl text-gray-100 font-semibold">Sign Up</h2>
        <form className="w-full mx-auto flex flex-col gap-1" onSubmit={handleSubmit}>
          <label
            htmlFor="fullName"
            className="text-gray-100 text-left tracking-wide"
          >
            Fullname
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="fullName"
            required
            className="w-full sm:w-96 p-2 mb-2 text-black rounded-md outline-none focus:outline-blue-900"
            placeholder="Full Name"
            value={input.fullName}
            onChange={(e) => setInput({ ...input, fullName: e.target.value })}
          />

          <label
            htmlFor="email"
            className="text-gray-100 text-left tracking-wide"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full sm:w-96 p-2 mb-2 text-black rounded-md outline-none focus:outline-blue-900"
            placeholder="Email Address"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />

          <label
            htmlFor="password"
            className="text-gray-100 text-left tracking-wide"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="w-full sm:w-96 p-2 mb-2 text-black rounded-md outline-none focus:outline-blue-900"
            placeholder="Password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />

          <label
            htmlFor="confirm_password"
            className="text-gray-100 text-left tracking-wide"
          >
            Confirm password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete=""
            required
            className="w-full sm:w-96 p-2 mb-2 text-black rounded-md outline-none focus:outline-blue-900"
            placeholder="confirm password"
            value={input.confirm_password}
            onChange={(e) =>
              setInput({ ...input, confirm_password: e.target.value })
            }
          />

          <div className="flex justify-center items-center gap-x-4 text-gray-100">
            <input
              id="male"
              name="gender"
              type="radio"
              value="male"
              required
              className="mr-2"
              checked={input.gender === "male"}
              onChange={handleGenderChange}
            />
            <label className="text-lg" htmlFor="male">
              Male
            </label>
            <input
              id="female"
              name="gender"
              type="radio"
              value="female"
              className="ml-4 mr-2"
              checked={input.gender === "female"}
              onChange={handleGenderChange}
            />
            <label className="text-lg" htmlFor="female">
              Female
            </label>
          </div>

          <input
            type="submit"
            value="Sign Up"
            className="w-36 py-1 mx-auto mt-5 bg-blue-600 hover:bg-blue-500 text-gray-100 text-lg rounded-md tracking-wider"
          />

          <div className="flex justify-center w-full gap-1 mt-2">
            <span className="text-gray-500">Already have an account?</span>
            <Link to="/Login" className="text-sky-700 hover:text-sky-500">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
