import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const BASE_URL = "https://web-crafter-backend.vercel.app";
// const BASE_URL = "https://galaxy-backend-49wa.onrender.com"

function Register() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, {
        username,
        fullname,
        email,
        password,
        dob,
      });
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        navigate("/Home");
      }, 600);
    } catch (error) {
      console.error(error.message);
      setTimeout(() => {
        setErrorMessage("Registration Failed");
      }, 600);
    }
  };

  return (
    <div className="container w-80 md:w-2/3 mx-auto">
      <div className="form-container mt-24 md:mt-14">
        <h2 className="title">Registration</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={username.toLowerCase().trim()}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="input"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={fullname.trim()}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Full Name"
              required
              className="input"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email.toLowerCase().trim()}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="input"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password.trim()}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="input"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Date of Birth"
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
