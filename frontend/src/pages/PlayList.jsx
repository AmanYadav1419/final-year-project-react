import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";

const PlayList = ({ user }) => {
  // import all the neccessary data from Song context
  const { songs } = SongData();

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
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
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
    </Layout>
  );
};

export default PlayList;
