import React from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";

const Navbar = () => {
  //  navigate to navigate to different route
  const navigate = useNavigate();

  // fetch the essential data's from useUser context
  const { logoutUser } = UserData();

  return (
    <div className="w-full flex justify-between items-center font-semibold">
      {/* in this div arrow images of navbar */}
      <div className="flex items-center">
        <img
          src={assets.arrow_left}
          className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          alt=""
          // on click navigate to back
          onClick={() => navigate(-1)}
        />

        <img
          src={assets.arrow_right}
          className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          alt=""
          // on click navigate to next
          onClick={() => navigate(+1)}
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Explore premium text */}
        <p
          className="bg-white text-black text-[15px] px-4 py-1 
        rounded-2xl hidden md:block cursor-pointer"
        >
          Explore Premium
        </p>

        {/* Install app text */}
        <p
          className="bg-white text-black text-[15px] px-4 py-1 
        rounded-2xl hidden md:block cursor-pointer"
        >
          Install App
        </p>

        {/* Logout text and onclick handler */}
        <p
          className="bg-white text-black text-[15px] px-4 py-1 
        rounded-2xl cursor-pointer"
          // onclick of the text logout handler function will work
          onClick={logoutUser}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default Navbar;
