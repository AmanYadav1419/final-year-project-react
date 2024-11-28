import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { UserData } from "../context/User";

const PlayList = ({ user }) => {
  // import all the neccessary data from Song context
  const { songs, setSelectedSong, setIsPlaying } = SongData();

  // import all the neccessarry data from User context
  const { addToPlaylist } = UserData();

  // state for myplaylist initilise with empty array
  const [myPlaylist, setMyPlaylist] = useState([]);

  // use effect
  useEffect(() => {
    // first check the condition
    if (songs && user && Array.isArray(user.playlist)) {
      // then filter the songs based on id
      // id convert it into string
      const filterSongs = songs.filter((e) =>
        user.playlist.includes(e._id.toString())
      );
      setMyPlaylist(filterSongs);
    }
    // when change in songs or in user then re excutes
  }, [songs, user]);

  // on click handler for selected song and set playing,
  // to play/pause the song
  const onClickHandler = (id) => {
    // set song via its id to the selected song
    setSelectedSong(id);

    // and make the set is playing to start the song playing
    setIsPlaying(true);
  };

  // on click handler for saving/remoing the song to playlist
  const savePlayListHandler = (id) => {
    // send the id value to the context function
    addToPlaylist(id);
  };

  return (
    <Layout>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
        {/* map the playlist  */}
        {
          // firstly show the thumbnail of the first song of playlist
          // first check had myPlaylist or not
          // if had then the first song of the playlist
          myPlaylist && myPlaylist[0] ? (
            // then show the first song thumbnail of playlist
            <img src={myPlaylist[0].thumbnail.url} alt="" />
          ) : (
            // if we dont have any playlist or song and thumbnail
            // then show the dummy image
            <img src="https://via.placeholder.com/250" alt="" />
          )
        }

        {/* to show the playlist name with user name */}
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-3xl font-bold mb-4 md:text-5xl">
            {user.name} Playlist
          </h2>

          {/* to show fav song with spotify logo img */}
          <h4>Your Favourate Songs</h4>
          <p className="mt-1">
            <img
              src={assets.spotify_logo}
              className="inline-block w-6"
              alt=""
            />
          </p>
        </div>
      </div>

      {/* to show the playlist in table format */}
      <div
        className="grid grid-cols-3 sm:grid-cols-4 
      mt-10 mb-4 pl-2 text-[#a7a7a7]"
      >
        <p>
          <b className="mr-4">#</b>
        </p>
        {/* to show the artist name */}
        <p>Artist</p>
        {/* to show the descrption  */}
        <p className="hidden sm:block">Description</p>
        <p className="text-center">Actions</p>
      </div>

      {/* horizontal line */}
      <hr />

      {/* if we had myplaylist then map the myplaylist */}
      {myPlaylist &&
        myPlaylist.map((e, i) => (
          <div
            className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 
            pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            // pass key as i i.e index
            key={i}
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">
                {/* i + 1 i.e means the first song */}
                {i + 1}
              </b>
              {/* also add img as the thumbnail to show the song */}
              <img src={e.thumbnail.url} className="inline w-10 mr-5" alt="" />
              // to show the title of the song
              {e.title}
            </p>

            {/* to show the singer name */}
            <p className="text-[15px]">{e.singer}</p>
            {/* to show the song description and only show the first 20 words */}
            <p className="text-[15px] hidden sm:block">
              {e.description.slice(0, 20)}...
            </p>
            {/* to show the bookmark and play icons/buttons */}
            <p className="flex justify-center items-center gap-5">
              <p
                className="text-[15px] text-center"
                // on click handler for save song to playlist
                // it will send the element id to the handler
                // to set and save the corrected song
                onClick={() => savePlayListHandler(e._id)}
              >
                {/* show the bookmark icon */}
                <FaBookmark />
              </p>

              <p
                className="text-[15px] text-center"
                // onclick handler and it will send the element id to the handler
                // to set and played the corrected song
                onClick={() => onClickHandler(e._id)}
              >
                {/* show the play icon */}
                <FaPlay />
              </p>
            </p>
          </div>
        ))}
    </Layout>
  );
};

export default PlayList;
