import React from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";

const Home = () => {
  // import necesary data from Song Context
  const { songs, albums } = SongData();

  return (
    // wrap home page with layout
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        {/* this div to map all the albums and data  */}
        {/* then show the data or albums */}
        {/* overflow auto means only scrollable to x-direction */}
        <div className="flex overflow-auto">
          {albums &&
            albums.map((e, i) => (
              // render or display the albumItem for each album
              <AlbumItem
                key={i}
                // send all respective the data to the AlbumItem component
                image={e.thumbnail.url}
                name={e.title}
                desc={e.description}
                id={e._id}
              />
            ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits.!</h1>

        {/* this div to map all the songs  */}
        {/* then show the data or songs */}
        {/* overflow auto means only scrollable to x-direction */}
        <div className="flex overflow-auto">
          {albums &&
            albums.map((e, i) => (
              // render or display the albumItem for each album
              <SongItem
                key={i}
                // send all respective the data to the AlbumItem component
                image={e.thumbnail.url}
                name={e.title}
                desc={e.description}
                id={e._id}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
