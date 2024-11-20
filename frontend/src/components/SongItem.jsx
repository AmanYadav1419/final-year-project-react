import React from "react";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SongItem = ({ image, name, desc, id }) => {
  // navigate function to navigate through different routes
  const navigate = useNavigate();
  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <div className="relative group">
        <img src={image} className="w-[160px]" alt="" />
      </div>
      {/* on hover on song this button will show */}
      <div className="flex gap-2">
        {/* this is button of play icon or play music */}
        <button
          className="absolute bottom-2 right-14 bg-green-500
        text-black p-3 rounded-full opacity-0 group-hover:opacity-100 
        transition-opacity duration-300"
        >
          <FaPlay />
        </button>

        {/* this is button of bookmark icon or save */}
        <button
          className="absolute bottom-2 right-2 bg-green-500
        text-black p-3 rounded-full opacity-0 group-hover:opacity-100 
        transition-opacity duration-300"
        >
          <FaBookmark />
        </button>
      </div>

      {/* to show name */}
      <p className="font-bold mt-2 mb-1 ">{name}</p>
      {/* to show description */}
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
