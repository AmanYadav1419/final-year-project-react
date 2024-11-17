import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around ">
        {/* Home icon */}
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          // on click on this navigate to home route
          onClick={() => navigate("/")}
        >
          {/* uncomment below line when assets folder is present */}
          <img src={assets.home_icon} className="w-6" alt="" />
          <p className="font-bold">Home</p>
        </div>

        {/* Search icon */}
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          // on click of on this navigate to search route
          onClick={() => navigate("/search")}
        >
          {/* uncomment below line when assets folder is present */}
          <img src={assets.search_icon} className="w-6" alt="" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          {/* Your Library icon */}
          <div className="flex items-center gap-3">
            {/* uncomment below line when assets folder is present */}
            <img src={assets.stack_icon} className="w-8" alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          
          {/* Your Library icon */}
          <div className="flex items-center gap-3">
            {/* uncomment below line when assets folder is present */}
            <img src={assets.arrow_icon} className="w-8" alt="" />
            <img src={assets.plus_icon} className="w-8" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
