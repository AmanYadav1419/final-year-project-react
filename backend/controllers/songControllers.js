import TryCatch from "../utils/TryCatch.js";
import getDataurl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import { Album } from "../models/Album.js";
import { Song } from "../models/Song.js";

// fist function is create album
export const createAlbum = TryCatch(async (req, res) => {
  // firstly check that user role is admin or not
  // if user role is not admin return error of not an admin / unauthorised
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not an admin",
    });

  // get the title and description from request body
  const { title, description } = req.body;

  // get the file from request
  const file = req.file;

  // get the file url from getDataurl fn
  const fileUrl = getDataurl(file);

  // get the value from cloduinary
  // fileUrl.content is thumbnail
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  // in that created an album
  await Album.create({
    title,
    description,
    thumbnail: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
  });

  // after that album is added response with a message
  res.json({
    message: "Album Added Sucessfully",
  });
});

// created a controller for getting all albums
export const getAllAlbums = TryCatch(async (req, res) => {
  // in that find all albums
  const albums = await Album.find();

  // then send the response of finded albums
  res.json(albums);
});

// created a controller to add a song / music
export const addSong = TryCatch(async (req, res) => {
  // firstly check that user role is admin or not
  // if user role is not admin return error of not an admin / unauthorised
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not an admin",
    });

  // get the all required info from request body
  const { title, description, singer, album } = req.body;

  // get the file from request
  const file = req.file;

  // get the file url from getDataurl fn
  const fileUrl = getDataurl(file);

  // get the value from cloduinary
  // fileUrl.content is thumbnail
  // to add only audio file thats why written resource type
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
    // write the resource type as video as
    // in cloudinary for audio we write type as video
    resource_type: "video",
  });

  // in that created a Song
  await Song.create({
    title,
    description,
    singer,
    audio: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    album,
  });

  // after that song is added response with a message
  res.json({
    message: "Song Added Sucessfully",
  });
});

// created a controller to add thumbnail
export const addThumbnail = TryCatch(async (req, res) => {
  // firstly check that user role is admin or not
  // if user role is not admin return error of not an admin / unauthorised
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not an admin",
    });

  // get the file from request
  const file = req.file;

  // get the file url from getDataurl fn
  const fileUrl = getDataurl(file);

  // get the value from cloduinary
  // fileUrl.content is thumbnail
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  // to updated the music / song
  await Song.findOneAndUpdate(
    req.params.id,
    {
      thumbnail: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
    },
    { new: true }
  );

  // after that thumbnail is added response with a message
  res.json({
    message: "Thumbnail Added Sucessfully",
  });
});