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
  async function addAlbum(formData) {
    setLoading(true);
    try {
      // to add a abum
      const { data } = await axios.post("/api/song/album/new", formData);
      // then send the success message in toastify ui ui format
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      // show the error in toastify ui format
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  //  useeffect to make the fetch function call and for rendering of songs
  useEffect(() => {
    // call the fetch function, so when page load/reload the fetch function calls
    fetchSongs();
  }, []);

  return (
    <SongContext.Provider value={{ songs, addAlbum, loading, songloading }}>
      {children}
    </SongContext.Provider>
  );
};

// export songData to use further in different files
export const SongData = () => {
  useContext(SongContext);
};
