// all user routes are written in here

import express from "express";
import { registerUser } from "../controllers/userControllers.js";

// create a router
const router = express.Router();

// route for the register user
router.post("/register", registerUser);

// export the router
export default router;
