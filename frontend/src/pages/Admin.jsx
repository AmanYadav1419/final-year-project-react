import React, { useState } from "react";
import { UserData } from "../context/User";
import { Link, useNavigate } from "react-router-dom";
import { SongData } from "../context/Song";
import { MdDelete } from "react-icons/md";

const Admin = () => {
  // add a condition only who had admin acess can acess this admin page
  const { user } = UserData();

  // to get the respected data from Song.jsx
  const { albums, songs, addAlbum, loading, addSong, addThumbnail } =
    SongData();

  // created a navigate function to navigate from one route to another route
  const navigate = useNavigate();

  // if user is not admin then return to home page
  if (user && user.role !== "admin") return navigate("/");

  // for title
  const [title, setTitle] = useState("");
  // for description
  const [description, setDescription] = useState("");
  // for singer
  const [singer, setSinger] = useState("");
  // for album
  const [album, setAlbum] = useState("");
  // for file
  const [file, setFile] = useState(null);

  // on change handler for file
  const fileChangeHandler = (e) => {
    // get the very first file
    const file = e.target.files[0];
    // send or setted the file to the state
    setFile(file);
  };

  // on submit of form handler
  const addAlbumHandler = (e) => {
    // firstly prevent the default behavoiur of form i.e page reload
    e.preventDefault();

    // get the form data
    const formData = new FormData();

    // append all data
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    // call the add album function, and send formData to function with that all state functions
    addAlbum(formData, setTitle, setDescription, setFile);
  };

  // on submit of form handler for song
  const addSongHandler = (e) => {
    // firstly prevent the default behavoiur of form i.e page reload
    e.preventDefault();

    // get the form data
    const formData = new FormData();

    // append all data
    formData.append("title", title);
    formData.append("description", description);
    formData.append("singer", singer);
    formData.append("album", album);
    formData.append("file", file);

    // call the add Song function, and send formData to function with that all state functions
    addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum);
  };

  // on submit of form handler for song thumbnail
  const addThumbnailHandler = (id) => {
    // get the form data
    const formData = new FormData();

    // append all the data
    formData.append("file", file);

    // call the add Song thumbnail function, and send formData to function with that all state functions
    addThumbnail(id, formData, setFile);
  };

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

      <form
        // on submit of form handler
        onSubmit={addAlbumHandler}
        className="bg-[#181818] p-6 rounded-lg shadow-lg"
      >
        {/* for title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="auth-input"
            required
            // value as title
            value={title}
            // on typing the title value should be print or written
            onChange={(e) => setTitle(e.target.value)}
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
            // value as description
            value={description}
            // on typing the description value should be print or written
            onChange={(e) => setDescription(e.target.value)}
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
            // added onchnage event file handler
            onChange={fileChangeHandler}
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

      <form
        // added on submit handler
        onSubmit={addSongHandler}
        className="bg-[#181818] p-6 rounded-lg shadow-lg"
      >
        {/* for title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="auth-input"
            required
            // value as title
            value={title}
            // on typing the title value should be print or written
            onChange={(e) => setTitle(e.target.value)}
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
            // value as description
            value={description}
            // on typing the description value should be print or written
            onChange={(e) => setDescription(e.target.value)}
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
            // value as singer
            value={singer}
            // on typing the singer value should be print or written
            onChange={(e) => setSinger(e.target.value)}
          />
        </div>

        {/* map all the albums in this */}
        <select
          className="auth-input"
          // value as album
          value={album}
          // onchange event handler
          onChange={(e) => setAlbum(e.target.value)}
        >
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
            // added onchnage event file handler
            onChange={fileChangeHandler}
            required
          />
        </div>

        {/* button to add album */}
        <button
          // until loading is there for adding album disabled the button
          disabled={loading}
          className="auth-btn"
          style={{ width: "100px" }}
        >
          {/* based on condition change the button text */}
          {loading ? "Please Wait!" : "Add"}
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
              <div key={i} className="bg-[#181818] p-4 rounded-lg shadow-md">
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
                    <input
                      type="file"
                      // added onchnage event file handler
                      onChange={fileChangeHandler}
                    />
                    <button
                      // add on click submit handler for adding thumbnail
                      // _id is the song id
                      onClick={() => addThumbnail(e._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Add Thumbnail
                    </button>
                  </div>
                )}

                {/* song title */}
                <h4 className="text-lg font-bold">{e.title}</h4>

                {/* song singer */}
                <h4 className="text-sm text-gray-500">{e.singer}</h4>

                {/* song description */}
                <h4 className="text-sm text-gray-500">{e.description}</h4>

                {/* btn for delete */}
                <button className="px-3 py-1 bg-red-500 text-white rounded">
                  <MdDelete />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
