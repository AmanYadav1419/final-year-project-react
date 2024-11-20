// this file for rendering each album present in the data or in user data

import React from "react";
import { useNavigate } from "react-router-dom";

// recive some props from parent component i.e Home.jsx
const AlbumItem = ({ image, name, desc, id }) => {
  // navigate function to navigate through different routes
  const navigate = useNavigate();
  return (
    // applied on click event to navigate to respective album page
    // concaniate id with plus , so that it should go to respective album only
    <div
      onClick={() => navigate("/album/" + id)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
        
      {/* image of playlist */}
      <img src={image} className="rounded w-[160px]" alt="" />

      {/* name of playlist */}
      {/* only show first 12 alphabets thats's why slice method */}
      <p className="font-bold mt-2 mb-1">{name.slice(0, 12)}..</p>

      {/* description i.e desc of playlist */}
      {/* only show first 18 alphabets thats's why slice method */}
      <p className="text-slate-200 text-sm">{desc.slice(0, 18)}..</p>
    </div>
  );
};

export default AlbumItem;
