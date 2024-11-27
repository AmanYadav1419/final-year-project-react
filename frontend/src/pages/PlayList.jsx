import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";

const PlayList = ({ user }) => {
  // import all the neccessary data from Song context
  const { songs } = SongData();

  // state for myplaylist initilise with empty array
  const [myplaylist, setMyPlaylist] = useState([]);

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
  return <Layout>
    
  </Layout>;
};

export default PlayList;
