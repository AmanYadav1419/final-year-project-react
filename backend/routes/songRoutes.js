// added a route for song

import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
import { createAlbum, getAllAlbums } from "../controllers/songControllers.js";

// declare router
const router = express.Router();

// add a new router to add new album but for that authenticated is mandtory
// then for adding file uploadFile is there
// then add the controller value i.e createAlbum

router.post("/album/new", isAuth, uploadFile, createAlbum);

// to find the album below is the route
router.get("/album/all", isAuth, getAllAlbums)

// exporting the router
export default router;
