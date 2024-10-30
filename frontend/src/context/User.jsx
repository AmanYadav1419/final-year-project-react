// To define and store all the user states globally

import { useContext } from "react";
import { createContext } from "react";

// created a usercontext
const UserContext = createContext();

// created a provider
export const UserProvider = ({ children }) => {
  return <UserContext.Provider value={{}}>
        {children}
    </UserContext.Provider>;
};

export const UserData = () => {
  useContext(UserContext);
};
