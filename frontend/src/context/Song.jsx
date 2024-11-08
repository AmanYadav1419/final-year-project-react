import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

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

  //  useeffect to make the fetch function call and for rendering of songs
  useEffect(() => {
    // call the fetch function, so when page load/reload the fetch function calls
    fetchSongs();
  }, []);

  return (
    <SongContext.Provider value={{ songs }}>{children}</SongContext.Provider>
  );
};

// export songData to use further in different files
export const SongData = () => {
  useContext(SongContext);
};
