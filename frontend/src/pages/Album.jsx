import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { useParams } from "react-router-dom";
import { UserData } from "../context/User";
import { FaBookmark, FaPlay } from "react-icons/fa";

const Album = () => {
  // get all the essential data from Song.jsx context
  const {
    fetchAlbumSong,
    albumSong,
    albumData,
    setIsPlaying,
    setSelectedSong,
  } = SongData();

  // import all the neccessarry data from User context
  const { addToPlaylist } = UserData();

  // use the useParams hook from react-router-dom
  const params = useParams();

  // use effect to call the fetchAlbumSong function
  useEffect(
    () => {
      // and send the params id to the function
      fetchAlbumSong(params.id);
    },
    // and it always called when changes happen in params.id
    [params.id]
  );

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
      {/* checkpoint to check if we had album data or not */}
      {/* if we have albumData then only show the div */}
      {albumData && (
        <>
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
            {/* firstly show the album data thumbnail */}
            {/* if we have album data thumbnail then only show the thumbnail */}
            {albumData.thumbnail && (
              <img
                // get the src from thumbnail url
                src={albumData.thumbnail.url}
                className="w-48 rounded"
                alt=""
              />
            )}

            {/* to show the album name/title with user name */}
            <div className="flex flex-col">
              <p>Playlist</p>
              <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                {albumData.title} Playlist
              </h2>

              {/* to show album description with spotify logo img */}
              <h4>{albumData.description}</h4>
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

          {/* if we had albumSong then map the albumSong */}
          {albumSong &&
            albumSong.map((e, i) => (
              <div
                className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 
                  pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] 
                  cursor-pointer"
                // pass key as i i.e index
                key={i}
              >
                <p className="text-white">
                  <b className="mr-4 text-[#a7a7a7]">
                    {/* i + 1 i.e means the first song from album */}
                    {i + 1}
                  </b>
                  {/* also add img as the thumbnail to show the album and song */}
                  <img
                    src={e.thumbnail.url}
                    className="inline w-10 mr-5"
                    alt=""
                  />
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
        </>
      )}
    </Layout>
  );
};

export default Album;
