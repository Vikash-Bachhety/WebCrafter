import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home.jsx";
import Weather from "./Components/Weather.jsx";
import Recipe from "./Components/Recipe.jsx";
import Dictionary from "./Components/Dictionary.jsx";
import Contact from "./Components/Contact Us.jsx";
import Password from "./Components/PasswordGenerator.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Movies from "./Components/Movies.jsx";
import Marvel from "./Components/Marvel.jsx";
import Authenticate from "./Components/Authenticate.jsx";
// import Location from "./Components/Location.jsx";
// import Currency from "./Components/Currency.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/Home" replace />,
      },
      {
        path: "/Marvel",
        element: <Marvel />,
      },
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/PasswordGenerator",
        element: <Password />,
      },
      {
        path: "/Weather",
        element: <Authenticate Component={Weather} />,
      },
      {
        path: "/Movies",
        element: <Authenticate Component={Movies} />,
      },
      {
        path: "/Dictionary",
        element: <Authenticate Component={Dictionary} />,
      },
      {
        path: "/Recipe",
        element: <Authenticate Component={Recipe} />,
      },
      {
        path: "/Contact Us",
        element: <Authenticate Component={Contact} />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      // {
        //   path: "/Location",
        //   element: <Authenticate Component={Location} />,
        // },
        // {
          //   path: "/Currency",
          //   element: <Authenticate Component={Currency} />,
          // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
