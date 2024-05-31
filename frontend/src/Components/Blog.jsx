import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdAdd } from "react-icons/io";
import "./index.css";
import FadeLoader from "react-spinners/FadeLoader";

function Blog() {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userID);
      // console.log(decodedToken);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        // console.log(token);
        const headers = {
          Authorization: `${token}`,
        };
        const response = await axios.get(
          `https://webcrafter-production.up.railway.app/profile/${userId}`,
          // `http://localhost:3000/profile/${userId}`,
          { headers }
        );
        const data = response.data;
        console.log(data);
        setIsLoading(false);
        setUserData(data);
      } catch (error) {
        console.log("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized access. Please log in again.");
          navigate("/login");
        } else {
          toast.error("Error fetching user data.");
        }
      }
    }

    if (userId) {
      fetchData();
    }
  }, [userId, navigate]);

  const handleDelete = async (blogId) => {
    try {
      console.log(blogId);
      const confirmDelete = window.confirm("Are you want to delete this blog?");
      if (confirmDelete) {
        const response = await axios.delete(
          `https://webcrafter-production.up.railway.app/delete/${blogId}`
          // `http://localhost:3000/delete/${blogId}`
        );
        setUserData((prevUserData) => ({
          ...prevUserData,
          blogs: prevUserData.blogs.filter((blog) => blog._id !== blogId),
        }));

        toast.success("Your blog has been deleted");
      }
    } catch (error) {
      console.log("Error deleting blog:", error);
      toast.error("Error deleting blog.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center w-full gap-y-10 gap-x-20 py-10 min-h-[90vh] bg-gray-900 border">
      <div className="w-3/4 h-16 flex justify-between items-center mt-16 xl:mt-0 pb-4 border-b border-slate-600">
        <div className="light flex items-end gap-4 w-auto py-2 mt-2 px-2 rounded-lg bg-slate-900 cursor-pointer">
          <img
            src={userData.profilePic}
            className="w-10 h-10 rounded-full object-cover"
            alt="profilePic"
          />
          <span className="hidden sm:block text-gray-300 tracking-wider text-xl">
            {userData.fullName}
          </span>
        </div>
        <div className="flex gap-6">
          <Link to="/createBlog">
            <input
              type="button"
              value="Create"
              className="w-auto px-3 py-1 cursor-pointer text-md font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 mb-14 justify-center w-full h-auto">
        {isLoading ? (
          <FadeLoader color="#36d7b7" size={40} />
        ) : (
          <>
            {userData && userData.blogs && userData.blogs.length > 0 ? (
              userData.blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="relative w-3/4 lg:w-2/3 xl:w-1/3 h-auto mx-4 my-auto bg-slate-100 shadow-lg rounded-lg hover:shadow-xl"
                >
                  <img
                    className="w-full h-60 p-1 object-cover object-center rounded-lg"
                    src={`https://webcrafter-production.up.railway.app/images/${blog.blogPic}`}
                    // src={`http://localhost:3000/images/${blog.blogPic}`}
                    alt="Blog"
                  />
                  <div className="flex flex-col items-start justify-center px-6 py-4">
                    <div className="flex justify-between w-full items-center mb-2">
                      <div className="font-medium text-gray-500 text-sm">
                        Created: {blog.createdAt.split("T")[0]}
                      </div>
                      <Link
                        to={`/edit/${blog._id}`}
                        className="w-auto px-3 py-1 cursor-pointer text-sm tracking-wider text-white bg-teal-600 rounded-md hover:bg-teal-700"
                        >
                        Edit
                      </Link>
                    </div>
                    <div className="xl:flex xl:flex-row flex-col justify-between">
                      <div className="font-bold text-lg xl:text-2xl">
                        {blog.title}
                      </div>
                    </div>
                    <p className=" mb-2 text-sm text-gray-500 mt-2 font-medium">
                      City: {blog.city}
                    </p>
                    <p className="text-gray-700 mb-2 text-md overflow-auto">
                      {blog.content}
                    </p>
                  </div>
                  <div className="w-full flex justify-center pb-4">
                    <input
                      onClick={() => {
                        handleDelete(blog._id);
                      }}
                      type="button"
                      value="Delete"
                      className="w-20 px-4 py-1 cursor-pointer text-md font-bold text-white bg-rose-500 rounded-md hover:bg-rose-700 focus:outline-none"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-80 w-80 rounded-lg shadow-md bg-slate-300">
                <Link to="/createBlog">
                  <IoMdAdd className="text-gray-400 h-52 w-52" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Blog;
