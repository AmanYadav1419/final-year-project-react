// to upload the songs and thumbnails to cloudinary multer is used 

import multer from "multer";

// created a storage i.e memory storage 
const storage = multer.memoryStorage();

// upload file function which will upload or store a single entity i.e file
const uploadFile = multer({ storage }).single("file");

// exporting the function
export default uploadFile;
