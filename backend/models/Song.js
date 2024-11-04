// created a model to add songs / music
// this is file for the creation of song / music
import mongoose from "mongoose";

// created a schema for the music / songs
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    singer: {
      type: String,
      required: true,
    },
    thumbnail: {
      id: String,
      url: String,
    },
    audio: {
      id: String,
      url: String,
    },
    album: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// export the song model to use in other files to
export const Song = mongoose.model("Song", schema);
