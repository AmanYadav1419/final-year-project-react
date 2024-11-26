import React, { useEffect, useRef, useState } from "react";
import { SongData } from "../context/Song";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";
const Player = () => {
  // import all essential data from Song Context
  const { song, fetchSingleSong, selectedSong, isPlaying, setIsPlaying } =
    SongData();
  // console.log(song);

  // every time song changes the fetchSong function will executes
  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  // created an audio ref to show the song range in input range section
  const auidoRef = useRef(null);

  // onClick functionality handle play pasue functionality of song
  const handlePlayPause = () => {
    // if isPlaying is true then on click it will pause the song
    if (isPlaying) {
      auidoRef.current.pause();
    }
    // else ispPlaying is false then on click it will play the song
    else {
      auidoRef.current.play();
    }

    // and at last setIsPlaying state is opposite of it state
    setIsPlaying(!isPlaying);
  };

  // state variable for volume initially it is 1
  // i.e it is start on full volume
  const [volume, setVolume] = useState(1);

  // function to handle volume change
  const handleVolumeChange = (e) => {
    // get the volume status from e.target.value
    const newVolume = e.target.value;
    // save the user geted to value to state
    setVolume(newVolume);

    // use the user geted value in audioRef volume ,
    // update with the newVolume
    auidoRef.current.volume = newVolume;
  };

  // state for progress of song or range slider
  const [progress, setProgress] = useState(0);
  // state for song duration
  const [duration, setDuration] = useState(0);

  // use Effect for matching range slider with audio duration or timestamp
  useEffect(() => {
    // first get the audio from audio ref
    const audio = auidoRef.current;

    // if audio not found then return back
    if (!audio) {
      return;
    }

    // handler for duration update
    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
    };

    // handle for time update
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    // add event listener for metadata with provided function as well
    audio.addEventListener("loadedmetadata", handleLoadedMetaData);

    // add event listener for metadata with provided function as well
    audio.addEventListener("timeupdate", handleTimeUpdate);

    // return cleanup function
    return () => {
      // remove all the event listener
      // remove event listener for metadata with provided function as well
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);

      // remove event listener for metadata with provided function as well
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
    // it everytime call or render when changes are in song
  }, [song]);

  // function handler for progress change
  const handleProgressChange = (e) => {
    // save the targetd value into duration to newTime
    const newTime = (e.target.value / 100) * duration;
    // then store the newTime in audioRef for further use too
    auidoRef.current.currentTime = newTime;

    // store the newTime to progress state
    setProgress(newTime);
  };

  return (
    <div>
      {
        // first check if there is song playing or not
        // if playing then map it and exceute the task
        song && (
          <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="lg:flex items-center gap-4">
              {/* showing song thumbnail */}
              <img
                src={
                  // if song thumbnail is there show song thumbnail
                  song.thumbnail
                    ? song.thumbnail.url
                    : // else show the dummy image of song
                      "https://via.placeholder.com/50"
                }
                className="w-12"
                alt=""
              />

              {/* showing song title and description  */}
              <div className="hidden md:block">
                {/* first show the song title */}
                <p>{song.title}</p>
                {/* then show the description of song  */}
                {/* if song has description then slice it and show only first 30 alphabets */}
                <p>{song.description && song.description.slice(0, 30)}..</p>
              </div>
            </div>

            <div
              className="flex flex-col items-center gap-1
            m-auto"
            >
              {/* first check if song is present or not */}
              {/* then check song has audio or not */}
              {/* after that do the further task */}
              {song && song.audio && (
                <>
                  {/* then check that if isPlaying is true or not */}
                  {/* if true then in audio tag set the url of the song and it will autoplay */}
                  {isPlaying ? (
                    <audio
                      // pass the ref of audio
                      ref={auidoRef}
                      src={song.audio.url}
                      autoPlay
                    />
                  ) : (
                    {
                      /* else it is false then in audio tag set the url of the song and autoplay will be off */
                    }(
                      <audio
                        // pass the ref of audio
                        ref={auidoRef}
                        src={song.audio.url}
                      />
                    )
                  )}
                </>
              )}

              {/* in this div we give play , pause features */}
              <div className="w-full flex items-center font-thin text-green-400">
                {/* input to show the song range, so that we can maximise or minimise */}
                <input
                  type="range"
                  min={"0"}
                  max={"100"}
                  className="progress-bar w-[120px] md:-[300px]"
                  // in value pass for range input for song
                  value={(progress / duration) * 100}
                  // onchange event handler i.e for progress change
                  onChange={handleProgressChange}
                />
              </div>

              {/* div for next and previous icons and play pause btn */}
              <div className="flex justify-center items-center gap-4">
                <span className="cursor-pointer">
                  {/* icon for previous */}
                  <GrChapterPrevious />
                </span>

                {/* button for play and pause  */}

                <button
                  // onclick of button handlePlayPause will work
                  onClick={handlePlayPause}
                  className="bg-white text-black rounded-full p-2"
                >
                  {/* check if isPlaying true */}
                  {/* then show Pause icon */}
                  {/* if false then show play icon */}
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>

                <span className="cursor-pointer">
                  {/* icon for next */}
                  <GrChapterNext />
                </span>
              </div>
            </div>

            {/* for volume slider */}
            <div className="flex items-center">
              <input
                type="range"
                className="w-16 md:w-32"
                min={"0"}
                max={"1"}
                // in which steps it should be increase
                steps={"0.01"}
                // value is given as volume
                value={volume}
                // on change handler for volume change
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Player;
