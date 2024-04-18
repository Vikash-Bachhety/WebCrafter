import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const BASE_URL = "https://galaxy-backend-one.vercel.app";
// const BASE_URL = "https://galaxy-backend-49wa.onrender.com"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });
      const token = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setSuccessMessage("Successfully Logged In");
      setTimeout(() => {
        navigate("/Home");
      }, 100);
    } catch (error) {
      setErrorMessage("Login failed !!!");
      setTimeout(()=>{
        setErrorMessage("")
      },1000)
      console.error(error);
    }
  };

  return (
    <div className="container flex flex-col w-80 md:w-96 mx-auto">
       {successMessage && (
          <div className=" bg-green-200 text-green-950 border-2 border-green-300 rounded-md w-52 p-1 mx-auto">{successMessage}</div>
        )}
       {errorMessage && (
          <div className=" bg-red-200 text-red-950 border-2 border-red-300 rounded-md w-52 p-1 mx-auto">{errorMessage}</div>
        )}
      <div className="form-container mt-10">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="input"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Log In
          </button>
          <Link to="/register" className="link">
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
