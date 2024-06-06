import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { InputBase } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AbcIcon from '@mui/icons-material/Abc';

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
    <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 mx-auto px-4 sm:px-6 lg:px-8">
      <Paper
        elevation={24}
        className="w-11/12 md:w-1/2 xl:w-1/3 px-3 sm:px-6 py-4 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 flex flex-col items-center"
        sx={{ backgroundColor: "rgb(15 23 42)" }}
      >
        {" "}
        <h2 className="text-2xl text-gray-100 font-semibold">Sign Up</h2>
        <form
          className="w-full mx-auto flex flex-col gap-1"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="fullName"
            className="text-gray-100 text-left tracking-wide"
          >
            Fullname
          </label>
          <InputBase
            type="text"
            startAdornment={
              <InputAdornment position="start">
                <AbcIcon />
              </InputAdornment>
            }
            id="fullName"
            name="fullName"
            autoComplete="fullName"
            required
            className="h-10 bg-white outline-none focus:border-none input tracking-wide"
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
          <InputBase
            type="email"
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
            id="email"
            name="email"
            autoComplete="email"
            required
            className="h-10 bg-white outline-none focus:border-none input tracking-wide"
            placeholder="Email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />

          <label
            htmlFor="password"
            className="text-gray-100 text-left tracking-wide"
          >
            Password
          </label>
          <InputBase
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            }
            id="password"
            name="password"
            autoComplete="new-password"
            required
            className="h-10 bg-white outline-none focus:border-none input tracking-wide"
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
          <InputBase
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            }
            id="confirm_password"
            name="confirm_password"
            autoComplete=""
            required
            className="h-10 bg-white outline-none focus:border-none input tracking-wide"
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
          <div className="w-full flex justify-center mt-2">
            <Button variant="contained" type="submit">
              {" "}
              Sign up
            </Button>
          </div>
          <div className="flex justify-center w-full gap-1 mt-2">
            <span className="text-gray-500">Already have an account?</span>
            <Link to="/Login" className="text-sky-700 hover:text-sky-500">
              Login here
            </Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default Signup;
