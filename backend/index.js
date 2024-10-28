import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

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

// using routes
app.use("/api/user", userRoutes);

// starting or checking running correctly or not
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // function of connection of database
  connectDb();
});
