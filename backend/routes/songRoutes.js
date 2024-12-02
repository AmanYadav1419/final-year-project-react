// added a route for song

import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
import { addSong, addThumbnail, createAlbum, deleteSong, getAllAlbums, getAllSongs, getAllSongsByAlbum, getSingleSong } from "../controllers/songControllers.js";

// declare router
const router = express.Router();

// add a new router to add new album but for that authenticated is mandtory
// then for adding file uploadFile is there
// then add the controller value i.e createAlbum

router.post("/album/new", isAuth, uploadFile, createAlbum);

// to find the album below is the route
router.get("/album/all", isAuth, getAllAlbums);

// to add a song below is the route
router.post("/new", isAuth, uploadFile, addSong);

// to add a thumbnail below is the route
router.post("/:id", isAuth, uploadFile, addThumbnail);

// to get all songs below is the route
router.get("/all", isAuth, getAllSongs);

// to get all songs by albums below is the route
router.get("/album/:id", isAuth, getAllSongsByAlbum);

// to delete the song below is the route
router.delete("/:id", isAuth, deleteSong);

// to get the single song below is the route
router.get("/single/:id", isAuth, getSingleSong);

// exporting the router
export default router;
