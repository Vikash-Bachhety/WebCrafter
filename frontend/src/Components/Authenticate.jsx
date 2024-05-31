import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Authenticate({ Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Not Authoried, Please Login !");
      navigate("/Login")
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
}

export default Authenticate;
