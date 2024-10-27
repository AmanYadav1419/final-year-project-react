// all the user schema is wriiten in this file
import mongoose from "mongoose";

// design the new schema for the user
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // if user is created their account for first time then it will by defaulty user
      default: "user",
    },
    // playlist should be the array of objects
    playlist: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    // enabled timestamps so that we can see CreatedAt , UpdatedAt
    timestamps: true,
  }
);

// exporting the user schema model
export const User = mongoose.model("User", schema)