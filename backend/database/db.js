// this is the data base file
import mongoose from "mongoose";

// async function to connect databse
const connectDb = async () => {
  try {
    // connection
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "Spotify Clone MERN Project",
    });

    // if succesfully connected
    console.log("MongoDB Connected Sucessfully");
  } catch (error) {
    console.log(error);
  }
};

// export the function
export default connectDb;
