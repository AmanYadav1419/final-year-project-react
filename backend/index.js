import express from "express";
import dotenv from "dotenv";

dotenv.config();

// created server
const app = express();

// created the server port , imported from .env file
const port = process.env.PORT;

// starting or checking running correctly or not
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
