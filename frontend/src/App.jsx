import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { UserData } from "./context/User";
import Loading from "./components/Loading";
import Admin from "./pages/Admin";
import PlayList from "./pages/PlayList";

const App = () => {
  // import essential data from context
  const { loading, user, isAuth } = UserData();
  return (
    <>
      {/* add conditon of loading */}
      {/* if loading is true then show loading icon */}
      {loading ? (
        <Loading />
      ) : (
        // if loading is false then show the information of realted page or show data
        <BrowserRouter>
          <Routes>
            {/* defines the routes for different pages  */}
            {/* if user is authenticatd then only go to home page else go to login page */}
            <Route path="/" element={isAuth ? <Home /> : <Login />} />

            {/* if user is authenticatd then only go to Playlist page else go to login page */}
            <Route
              path="/playlist"
              element={isAuth ? <PlayList /> : <Login />}
            />

            {/* if user is authenticatd then only go to Admin page else go to login page */}
            <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />

            {/* if user is authenticatd then only go to home page else go to login page */}
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            {/* if user is authenticatd then only go to home page else go to register page */}
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
