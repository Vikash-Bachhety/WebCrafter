import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit() {
  const { blogId } = useParams();
  // console.log("Edit component Edit ID: ", blogId);
  const [userData, setUserData] = useState({});
  const [blogID, setBlogID] = useState({});
  const [blogPic, setBlogPic] = useState("");
  const [title, setTitle] = useState("");
  const [city, setcity] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        if (blogId) {
          const response = await axios.get(
            // `https://blog-cards.up.railway.app/edit/${blogId}` || 
            `http://localhost:3000/edit/${blogId}`
          );
          const data = response.data;
          setUserData(data);
          setBlogID(blogId);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleupdate = async () => {
    try {
      const formData = new FormData();
      formData.append("blogFile", blogPic);
      formData.append("title", title);
      formData.append("city", city);
      formData.append("content", content);
      
      if (title === "" && city === "" && content === "") {
        toast.info("No changes made");
        return;
      } else if(blogPic === ""){
        toast.info("Upload Blog pic first")
      } 
      
      const response = await axios.patch(
        `https://web-crafter-backend.vercel.app/update/${blogID}`,
        // `http://localhost:3000/update/${blogID}`,
        formData
      );
      const data = response.data;
      // console.log(data);
      toast.success("Blog Successfully Updated");
      // console.log(data);
      navigate("/Blog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center w-full items-center gap-10 py-10 min-h-screen bg-gray-900">
      {userData && (
        <div className="w-96 sm:w-1/2 lg:w-1/3 h-auto mt-8 mb-14 mx-4 bg-slate-100 shadow-lg rounded-lg hover:shadow-xl transition duration-500">
          
          <div className="flex flex-col gap-2 px-4 justify-center">
          <img
            className="w-full h-60 mt-3 object-cover object-center border border-black rounded-t-lg"
            // src={`https://blog-cards.up.railway.app/images/${userData.blogPic}`}
            src={`http://localhost:3000/images/${userData.blogPic}`}
            alt="User Profile"
          />
          <span className="text-sm font-semibold">Blog pic</span>
          <input 
          type="file" 
          name="blogFile"
          onChange={(e)=> {
          setBlogPic(e.target.files[0])
          }}/>
          </div>
          <div className="flex flex-col gap-1 px-4 justify-center">
            <div className="font-medium text-xl mt-2">{userData.title}</div>
            <input
              type="text"
              className="w-full px-3 py-1 mb-1 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="New title"
              name="newTitle"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <p className="text-gray-700 text-md">{userData.city}</p>
            <input
              type="text"
              className="w-full px-3 py-1 mb-1 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="New city"
              name="newCity"
              value={city}
              onChange={(e) => {
                setcity(e.target.value);
              }}
            />
            <p className="text-gray-700 text-md">{userData.content}</p>
            <textarea
            id="main"
              type="text"
              className="w-full px-3 py-1 mb-2 border rounded-md focus:outline-none focus:border-blue-500"
              rows={5}
              placeholder="New content"
              name="newContent"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <div className="flex justify-between">
              <Link
                to="/Blog"
                type="button"
                className="text-center mb-2 w-20 px-2 py-1 text-md font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                Back
              </Link>

              <input
                onClick={handleupdate}
                type="button"
                value="Update"
                className="mb-2 w-20 px-2 py-1 text-md font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Edit;
