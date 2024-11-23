import React, { useEffect } from "react";
import { SongData } from "../context/Song";

const Player = () => {
  // import all essential data from Song Context
  const { song, fetchSingleSong, selectedSong } = SongData();
  // console.log(song);

  // every time song changes the fetchSong function will executes
  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);
  return <div>Player</div>;
};

export default Player;
