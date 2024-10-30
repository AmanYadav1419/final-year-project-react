// To define and store all the user states globally

import axios from "axios";
import { useContext, useState } from "react";
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

  return (
    <UserContext.Provider value={{}}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => {
  useContext(UserContext);
};
