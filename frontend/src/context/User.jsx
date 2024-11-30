// To define and store all the user states globally

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// created a usercontext
const UserContext = createContext();

// created a provider
export const UserProvider = ({ children }) => {
  // all states for storing
  // if user logged in, we put the value of user in this state
  const [user, setUser] = useState([]);

  // to check if user is authenticated or not
  const [isAuth, setIsAuth] = useState(false);

  // to check the button loading means currently any background process is present or not
  const [btnLoading, setBtnLoading] = useState(false);

  // loading state which will be used when we need to fetch the user, loading state will be shown
  const [loading, setLoading] = useState(true);

  // function to register the user
  async function registerUser(
    name,
    email,
    password,
    navigate,
    fetchSongs,
    fetchAlbums
  ) {
    // set BtnLoading true, that means process is started
    setBtnLoading(true);
    try {
      // API call to register the user
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      // if successful, show this toast message
      toast.success(data.message);
      // set user as the user which we get from data
      setUser(data.user);

      // set authentication true, as user is successfully logged in
      setIsAuth(true);

      // set BtnLoading false, as user is successfully logged in
      setBtnLoading(false);

      // at the end, if process is successfully completed, navigate to the home page
      navigate("/");

      // after registering, fetch all songs and albums
      fetchSongs();
      fetchAlbums();
    } catch (error) {
      // to show the error message in toastify format
      toast.error(error.response.data.message);

      // if any error occurred, still set BtnLoading false
      setBtnLoading(false);
    }
  }

  // function to login the user
  async function loginUser(email, password, navigate, fetchSongs, fetchAlbums) {
    // set BtnLoading true, that means process is started
    setBtnLoading(true);
    try {
      // API call to log in the user
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });

      // if successful, show this toast message
      toast.success(data.message);
      // set user as the user which we get from data
      setUser(data.user);

      // set authentication true, as user is successfully logged in
      setIsAuth(true);

      // set BtnLoading false, as user is successfully logged in
      setBtnLoading(false);

      // at the end, if process is successfully completed, navigate to the home page
      navigate("/");

      // after logging in, fetch all songs and albums
      fetchSongs();
      fetchAlbums();
    } catch (error) {
      // to show the error message in toastify format
      toast.error(error.response.data.message);

      // if any error occurred, still set BtnLoading false
      setBtnLoading(false);
    }
  }

  // function to fetch the user
  async function fetchUser() {
    try {
      // we get the user from data
      const { data } = await axios.get("/api/user/me");

      // set the user state to data
      setUser(data);

      // set isAuth as true, as the user is authenticated
      setIsAuth(true);

      // then set loading false, as the user is fetched successfully
      setLoading(false);
    } catch (error) {
      console.log(error);

      // set isAuth as false, as an error occurred
      setIsAuth(false);

      // then set loading false, as an error occurred
      setLoading(false);
    }
  }

  // function to logout the user
  async function logoutUser() {
    // try-catch block
    try {
      // API call to log out the user
      const { data } = await axios.get("/api/user/logout");

      // then reload the page
      // to remove the user data
      window.location.reload();
    } catch (error) {
      // if an error occurred, show the error in toastify format
      toast.error(error.response.data.message);
    }
  }

  // function to add a song to the playlist
  async function addToPlaylist(id) {
    try {
      // API call to add the song to the playlist
      const { data } = await axios.post("/api/user/song/" + id);

      // success message in toastify format
      toast.success(data.message);

      // then call fetchUser to update the user
      fetchUser();
    } catch (error) {
      // if an error occurred, show the error in toastify format
      toast.error(error.response.data.message);
    }
  }

  // to fetch the user on side effect, or on loading the page
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    // value is for providing all the data which will be passed through globally
    <UserContext.Provider
      value={{
        registerUser,
        user,
        isAuth,
        btnLoading,
        loading,
        loginUser,
        logoutUser,
        addToPlaylist,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

// export UserData for usage in other components
export const UserData = () => useContext(UserContext);
