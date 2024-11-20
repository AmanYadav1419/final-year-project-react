import React from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import AlbumItem from "../components/AlbumItem";

const Home = () => {
  // import necesary data from Song Context
  const { songs, albums } = SongData();

  // const navigate =

  return (
    // wrap home page with layout
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        {/* this div to map all the songs and data  */}
        {/* then show the data or songs or albums */}
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
    </Layout>
  );
};

export default Home;
