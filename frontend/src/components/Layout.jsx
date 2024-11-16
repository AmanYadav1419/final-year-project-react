// this page is act as a whole home page of spotify app
// it include sidebar , navbar, musics/albums section, music player section.

import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="h-[90%] flex">
        {/* import / show the sidebar */}
        <Sidebar />
      </div>
      {/* bg can be tryed #212121 */}
      <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
        {/* import / show the navbar */}
        <Navbar />
        {/* recieve the children prop which we will wrap the layout file */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
