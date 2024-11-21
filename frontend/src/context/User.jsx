// To define and store all the user states globally

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import toast, { Toaster } from "react-hot-toast";

// created a usercontext
const UserContext = createContext();

// created a provider
export const UserProvider = ({ children }) => {
  // all states for storing
  // if user logged in , we put the value of user in this state
  const [user, setUser] = useState([]);

  // to check if user is authenticated or not
  const [isAuth, setIsAuth] = useState(false);

  // to check the button loading means currently any background process is present or not
  const [btnLoading, setBtnLoading] = useState(false);

  // loading state which will be used when we need to fetch the user, loading state will be shown
  const [loading, setLoading] = useState(true);

  async function registerUser(name, email, password, navigate) {
    // set BtnLoading true , that means process is started
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      // if succes then show this toast message
      toast.success(data.message);
      // set user as the user which will get from data
      setUser(data.user);

      // set authenctication true,as user is succesfully logged in
      setIsAuth(true);

      // set BtnLoading false ,as user is succesfully logged in
      setBtnLoading(false);

      // at the end if process is successfully got then navigate to home page
      navigate("/");
    } catch (error) {
      // to show the error message in toastify format
      toast.error(error.response.data.message);

      // if any error occured then still set BtnLoading false
      setBtnLoading(false);
    }
  }

  async function loginUser(email, password, navigate) {
    // set BtnLoading true , that means process is started
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });

      // if succes then show this toast message
      toast.success(data.message);
      // set user as the user which will get from data
      setUser(data.user);

      // set authenctication true,as user is succesfully logged in
      setIsAuth(true);

      // set BtnLoading false ,as user is succesfully logged in
      setBtnLoading(false);

      // at the end if process is successfully got then navigate to home page
      navigate("/");
    } catch (error) {
      // to show the error message in toastify format
      toast.error(error.response.data.message);

      // if any error occured then still set BtnLoading false
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

      // set is auth as true as the user is authenticated
      setIsAuth(true);

      // then set loading false , as the user is fethced succesfully
      setLoading(false);
    } catch (error) {
      console.log(error);

      // set is auth as false as got an error
      setIsAuth(false);

      // then set loading false , as got an error
      setLoading(false);
    }
  }

  // logout user function
  async function logoutUser() {
    // try catch block
    try {
      // get the data from the route
      const { data } = await axios.get("/api/user/logout");

      // then reload the page
      // to remove the user data
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // to add the song to playlist
  async function addToPlaylist(id) {
    try {
      // first get the song
      const { data } = await axios.post("/api/user/song" + id);

      // succes message in toastify format
      toast.success(data.message);

      // then call the fetchUser to upadte the user
      fetchUser();
    } catch (error) {
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
        addToPlaylist
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => {
  useContext(UserContext);
};
