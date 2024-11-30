import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// created a context
const SongContext = createContext();

// created a song provider
export const SongProvider = ({ children }) => {
  // after fetching all store it in
  const [songs, setSongs] = useState([]);
  // when fetched the songs the loading bar we can show for that this is state
  const [songloading, setSongLoading] = useState(true);
  // for button loading
  const [loading, setLoading] = useState(false);
  // to store the albums
  const [albums, setAlbums] = useState([]);

  // to get a single song and then store it in state
  const [selectedSong, setSelectedSong] = useState(null);

  // this state for music is playing or not
  const [isPlaying, setIsPlaying] = useState(false);

  // to fetch all the songs
  async function fetchSongs() {
    try {
      // get all the songs
      const { data } = await axios.get("/api/song/all");

      // send the songs data value to the song state
      setSongs(data);

      // after fetching and setting the song data,
      // then the first song of fetched song should be played and visible
      // data[0]._id i.e from data first song
      setSelectedSong(data[0]._id);
      setIsPlaying(false);
    } catch (error) {
      console.log(error);
    }
  }

  // to store the fetched songs
  const [song, setSong] = useState([]);

  // function to get the selected song
  async function fetchSingleSong() {
    try {
      // get the song from the route
      const { data } = await axios.get("/api/song/single/" + selectedSong);

      // set the songData to data
      setSong(data);
    } catch (error) {
      toast.error(error);
    }
  }

  //  function to add albums
  // and receive all the new data get from Admin.jsx
  // to make all the states empty after album is added
  async function addAlbum(formData, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      // to add an album
      const { data } = await axios.post("/api/song/album/new", formData);
      // then send the success message in toastify UI format
      toast.success(data.message);
      setLoading(false);
      // call the fetch album function
      fetchAlbums();

      // empty all the received states after fetching all albums,
      // after successfully executing the function
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      // show the error in toastify UI format
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  //  function to add songs
  // and receive all the new data get from Admin.jsx
  // to make all the states empty after song is added
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
      // then send the success message in toastify UI format
      toast.success(data.message);
      setLoading(false);
      // call the fetch songs function
      fetchSongs();

      // empty all the received states after fetching all songs,
      // after successfully executing the function
      setTitle("");
      setDescription("");
      setFile(null);
      setAlbum("");
      setSinger("");
    } catch (error) {
      // show the error in toastify UI format
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  // function to add thumbnail
  // and receive all the new data get from Admin.jsx
  // to make all the states empty after thumbnail is added
  async function addThumbnail(
    // receive a song id for identifying the correct song
    id,
    formData,
    setFile
  ) {
    setLoading(true);
    try {
      // to add a song thumbnail
      const { data } = await axios.post("/api/song/" + id, formData);
      // then send the success message in toastify UI format
      toast.success(data.message);
      setLoading(false);
      // call the fetch songs function
      fetchSongs();

      // at the end make the state variable to default previous state
      setFile(null);
    } catch (error) {
      // show the error in toastify UI format
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
      const { data } = await axios.delete("/api/song/" + id);

      // after that return toast success message
      toast.success(data.message);

      // after deleting the song execute the fetch function
      fetchSongs();
    } catch (error) {
      // after catching error return the toast message as error
      toast.error(error.response.data.message);
    }
  }

  //  useEffect to make the fetch function call and for rendering of songs
  //  and albums
  useEffect(() => {
    // call the fetch function, so when page load/reload the fetch function calls
    fetchSongs();

    // call the fetch function, so when page load/reload the fetch function calls
    fetchAlbums();
  }, []);

  // to get and store the song index, with initially 0
  // i.e the first song will show
  const [index, setIndex] = useState(0);

  // function for next music controls
  function nextMusic() {
    // first check the condition
    if (index === songs.length - 1) {
      // then set the index to 0
      setIndex(0);
      // and the set the selected song with the help of songs id
      setSelectedSong(songs[0]._id);
    }
    // else condition
    else {
      // else set index + 1
      setIndex(index + 1);
      // and set the selected song with the help of songs id
      // with songs index + 1
      setSelectedSong(songs[index + 1]._id);
    }
  }

  // function for previous music controls
  function prevMusic() {
    // first check the condition
    if (index === 0) {
      // simply return null
      return null;
    }
    // else condition
    else {
      // else set index - 1
      setIndex(index - 1);
      // and set the selected song with the help of songs id
      // with songs index - 1
      setSelectedSong(songs[index - 1]._id);
    }
  }

  // set the state for albumSong
  const [albumSong, setAlbumSong] = useState([]);

  // set the albumData
  const [albumData, setAlbumData] = useState([]);

  // async function for fetch album song
  async function fetchAlbumSong(id) {
    try {
      // get the required data
      const { data } = await axios.get("/api/song/album/" + id);

      // setting the data to albumSong
      setAlbumSong(data.songs);

      // setting the album data
      setAlbumData(data.album);
    } catch (error) {
      console.log(error);
    }
  }

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
        fetchSingleSong,
        song,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        selectedSong,
        nextMusic,
        prevMusic,
        fetchAlbumSong,
        albumSong,
        albumData,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

// export songData to use further in different files
export const SongData = () => {
  return useContext(SongContext);
};
