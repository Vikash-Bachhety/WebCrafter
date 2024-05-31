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
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import Movies from "./Components/Movies.jsx";
import Authenticate from "./Components/Authenticate.jsx";
import Blog from "./Components/Blog.jsx";
import CreateBlog from "./Components/CreateBlog.jsx";
import Edit from "./Components/Edit.jsx";

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
        path: "/Home",
        element: <Home />,
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
        path: "/Blog",
        element: <Authenticate Component={Blog} />,
      },
      {
        path: "/createBlog",
        element: <CreateBlog />,
      },
      {
        path: "/edit/:blogId",
        element: <Edit />,
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
        path: "/Signup",
        element: <Signup />,
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
