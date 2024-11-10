import React from "react";
import { UserData } from "../context/User";
import { Link, useNavigate } from "react-router-dom";
import { SongData } from "../context/Song";

const Admin = () => {
  // add a condition only who had admin acess can acess this admin page
  const { user } = UserData();

  // to get the albums and songs from Song.jsx
  const { albums, songs } = SongData();

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

      {/* to add song  */}
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Song</h2>

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

        {/* for Singer */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Singer</label>
          <input
            type="text"
            placeholder="Singer"
            className="auth-input"
            required
            // // value as password
            // value={password}
            // // on typing the password value should be print or written
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* map all the albums in this */}
        <select className="auth-input">
          {/* initially show the dummy option */}
          <option value="">Choose Album</option>
          {albums &&
            albums.map((e, i) => (
              <option value={e._id} key={i}>
                {e.title}
              </option>
            ))}
        </select>

        {/* for File i.e audio*/}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Audio</label>
          <input
            type="file"
            // it should only accept audio
            accept="audio/*"
            className="auth-input"
            required
          />
        </div>

        {/* button to add album */}
        <button className="auth-btn" style={{ width: "100px" }}>
          Add
        </button>
      </form>

      {/* to show all the added songs  */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
        <div
          className="flex justify-center md:justify-start gap-2 
          items-center flex-wrap"
        >
          {/* in that maps all the songs */}
          {songs &&
            songs.map((e, i) => (
              // render a div for each song
              <div className="bg-[#181818] p-4 rounded-lg shadow-md">
                {/* for showing thumbnail showing the condition, */}
                {/* if thumbnail then only show the image, if not show a div */}
                {e.thumbnail ? (
                  <img
                    src={e.thumbnail.url}
                    alt=""
                    className="mr-1 w-52 h-52"
                  />
                ) : (
                  // if thumbnail is not present then show this div
                  <div className="flex flex-col items-center justify-center gap-2">
                    <input type="file" />
                    <button className="bg-green-500 text-white px-2 py-1 rounded">
                      Add Thumbnail
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
