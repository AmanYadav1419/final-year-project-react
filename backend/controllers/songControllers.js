import TryCatch from "../utils/TryCatch.js";
import getDataurl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import { Album } from "../models/Album.js";

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
  await Album({
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
