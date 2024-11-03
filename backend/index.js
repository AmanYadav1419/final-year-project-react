import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

dotenv.config();

// config of cloudinary
cloudinary.v2({
  Cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

// created server
const app = express();

// using middlewares
app.use(express.json());

// by this code we can read the token in cookie
app.use(cookieParser());

// created the server port , imported from .env file
const port = process.env.PORT;

// importing routes
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

// using routes
app.use("/api/user", userRoutes);

// using song routes 
app.use("/api/song", songRoutes)
// starting or checking running correctly or not
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // function of connection of database
  connectDb();
});
