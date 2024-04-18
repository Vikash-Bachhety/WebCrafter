import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Authenticate(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Not Authoried, Please Login !");
      setTimeout(() => {
        navigate("/Login");
      }, 800);
    }
  }, [navigate]);

  return (
    <div>
      {errorMessage && <div className=" bg-rose-200 text-red-950 border-2 tracking-wide border-rose-300 rounded-xl w-64  p-1 mt-10 mx-auto">{errorMessage}</div>}
      {!errorMessage && <Component />}
    </div>
  );
}

export default Authenticate;
