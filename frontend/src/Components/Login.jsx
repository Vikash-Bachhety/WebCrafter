import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { InputBase } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const BASE_URL =
  "https://webcrafter-production.up.railway.app" || "http://localhost:3000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 mx-auto px-2 sm:px-5 lg:px-8">
      <Paper
        elevation={24}
        className="w-11/12 sm:w-auto xl:w-1/3 px-3 sm:px-6 py-4 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 flex flex-col items-center"
        sx={{ backgroundColor: "rgb(15 23 42)" }}
      >
        <h2 className="text-2xl text-gray-100 font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 w-auto text-left">
            <label htmlFor="fullName" className="text-gray-100 tracking-wide">
              Email
            </label>
            <InputBase
              type="email"
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
              value={email.toLowerCase().trim()}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="h-10 bg-white outline-none focus:border-none input mt-2 tracking-wide"
            />
            <label htmlFor="fullName" className="text-gray-100 tracking-wide">
              Password
            </label>
            <InputBase
              type={showPassword ? "text" : "password"}
              startAdornment={
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              }
              value={password.trim()}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="h-10 bg-white input mt-2 tracking-wide"
            />
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <VisibilityOffIcon className="fixed top-44 right-6 md:right-10" />
              ) : (
                <VisibilityIcon className="fixed top-44 right-6 md:right-10" />
              )}
            </div>
          </div>
          <div className="w-full flex justify-center mt-2">
            <Button variant="contained" type="submit">
              log in
            </Button>
          </div>
          <div className="flex justify-center w-full gap-4 px-0 mt-4">
            <span className="text-gray-500">Already have an account?</span>
            <Link to="/Signup" className="text-sky-700 hover:text-sky-500">
              Create an account
            </Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
