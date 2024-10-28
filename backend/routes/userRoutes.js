// all user routes are written in here

import express from "express";
import {
  loginUser,
  logoutUser,
  myProfile,
  registerUser,
} from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/isAuth.js";

// create a router
const router = express.Router();

// route for the register user
router.post("/register", registerUser);

// route for the login user
router.post("/login", loginUser);

// Auth route to authenticate and then my profile
router.get("/me", isAuth, myProfile);

// Auth route to check that user is authenticated and then logout route
router.get("/logout", isAuth, logoutUser);

// export the router
export default router;
