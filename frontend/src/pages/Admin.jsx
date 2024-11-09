import React from "react";
import { UserData } from "../context/User";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  // add a condition only who had admin acess can acess this admin page
  const { user } = UserData();

  // created a navigate function to navigate from one route to another route
  const navigate = useNavigate();

  // if user is not admin then return to home page
  if (user && user.role !== "admin") return navigate("/");
  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      {/* redirect or send to home page */}
      <Link
        to="/"
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Go to Home Page
      </Link>

      <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>

      <form className="bg-[#181818] p-6 rounded-lg shadow-lg">
        {/* for title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="auth-input"
            required
            // // value as password
            // value={password}
            // // on typing the password value should be print or written
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* for description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            placeholder="Description"
            className="auth-input"
            required
            // // value as password
            // value={password}
            // // on typing the password value should be print or written
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* for File */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Thumbnail</label>
          <input
            type="file"
            // it should only accept image
            accept="image/*"
            className="auth-input"
            required
          />
        </div>

        {/* button to add album */}
        <button className="auth-btn" style={{ width: "100px" }}>
          Add
        </button>
        
      </form>
    </div>
  );
};

export default Admin;
