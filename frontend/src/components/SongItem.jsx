import React, { useEffect, useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";
import { SongData } from "../context/Song";

const SongItem = ({ image, name, desc, id }) => {
  // declare the state for the save or not
  const [saved, setSaved] = useState(false);

  // import necesary data from User Context
  const { addToPlaylist, user } = UserData();

  // import necesary data from Song Context
  const { setSelectedSong, isPlaying, setIsPlaying } = SongData();

  // save the user playlist for further future checking of playist
  const playlist = user.playlist;

  useEffect(() => {
    // if playlist id is included
    // that means song is present in playlist
    if (playlist && playlist.includes(id)) {
      setSaved(true);
    }
    // it always get call when user data or ativity is changed
  }, [user]);

  // create the saved handler to save and unsaved song in playlist
  const savedtoPlaylistHandler = () => {
    // set to opposite of saved
    // so that onclick it will work both saved and unsaved
    setSaved(!saved);

    // then call the function and send the id of song
    addToPlaylist(id);
  };

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

        // onclick event 
        onClick={()=> {
          // set the song which get from id
          setSelectedSong(id);
          // set is song playing true
          setIsPlaying(true)
        }}
        >
          <FaPlay />
        </button>

        {/* this is button of bookmark icon or save */}
        <button
          // onclick on the btn handler function will work
          onClick={savedtoPlaylistHandler}
          className="absolute bottom-2 right-2 bg-green-500
        text-black p-3 rounded-full opacity-0 group-hover:opacity-100 
        transition-opacity duration-300"
        >
          {/* then conditional rendering of icons based on saved or unsaved */}
          {saved ? <FaBookmark /> : <FaRegBookmark />}
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
