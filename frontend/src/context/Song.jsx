import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// created a context
const SongContext = createContext();

// created a song provider
export const SongProvider = ({ children }) => {
  // after fetching all store it in
  const [songs, setSongs] = useState([]);
  // when fetched the songs the loading bar we can sho for that this is state
  const [songloading, setSongLoading] = useState(true);
  // for button loading
  const [loading, setLoading] = useState(false);
  // to store the albums
  const [albums, setAlbums] = useState([]);

  // to fetch all the songs
  async function fetchSongs() {
    try {
      // get all the songs
      const { data } = await axios.get("/api/song/all");

      // send the songs data value to the song state
      setSongs(data);
    } catch (error) {
      console.log(error);
    }
  }

  //  function to add albums
  // and recieve all the new data geted from Admin.jsx
  // to make all the states empty after album is get added
  async function addAlbum(formData, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      // to add a album
      const { data } = await axios.post("/api/song/album/new", formData);
      // then send the success message in toastify ui ui format
      toast.success(data.message);
      setLoading(false);
      // call the fetch album function
      fetchAlbums();

      // empty all the recived states after fetching all albums,
      // after successfully executing the function
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      // show the error in toastify ui format
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  //  function to add songs
  // and recieve all the new data geted from Admin.jsx
  // to make all the states empty after album is get added
  async function addSong(
    formData,
    setTitle,
    setDescription,
    setFile,
    setSinger,
    setAlbum
  ) {
    setLoading(true);
    try {
      // to add a song
      const { data } = await axios.post("/api/song/new", formData);
      // then send the success message in toastify ui ui format
      toast.success(data.message);
      setLoading(false);
      // call the fetch songs function
      fetchSongs();

      // empty all the recived states after fetching all songs,
      // after successfully executing the function
      setTitle("");
      setDescription("");
      setFile(null);
      setAlbum("");
      setSinger("");
    } catch (error) {
      // show the error in toastify ui format
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  // function to add thumbnail
  // and recieve all the new data geted from Admin.jsx
  // to make all the states empty after album is get added
  async function addThumbnail(
    // recive a song id for identify the correct song
    id,
    formData,
    setFile
  ) {
    setLoading(true);
    try {
      // to add a song thumbnail
      const { data } = await axios.post("/api/song/" + id, formData);
      // then send the success message in toastify ui ui format
      toast.success(data.message);
      setLoading(false);
      // call the fetch songs function
      fetchSongs();

      // at the end make the state variable to default previous state
      setFile(null);
    } catch (error) {
      // show the error in toastify ui format
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  // to fetch all the albums
  async function fetchAlbums() {
    try {
      // to fetch the albums
      const { data } = await axios.get("/api/song/album/all");

      // set the fetched albums to state
      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }

  // function to delete song
  async function deleteSong(id) {
    try {
      // get the correct song to delete the song
      const { data } = await axios.delete("/api/song" + id);

      // after that return toast sucess message
      toast.success(data.message);

      // after deleting the songs execute the fetch function
      fetchSongs();
    } catch (error) {
      // after catching error return the toasr message as error
      toast.error(error.response.data.message);
    }
  }

  //  useeffect to make the fetch function call and for rendering of songs
  //  and albums
  useEffect(() => {
    // call the fetch function, so when page load/reload the fetch function calls
    fetchSongs();

    // call the fetch function, so when page load/reload the fetch function calls
    fetchAlbums();
  }, []);

  return (
    <SongContext.Provider
      value={{
        songs,
        addAlbum,
        loading,
        songloading,
        albums,
        addSong,
        addThumbnail,
        deleteSong,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

// export songData to use further in different files
export const SongData = () => {
  useContext(SongContext);
};
