// in this file written user controllers

import { User } from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from "bcrypt";

// async function of register user controller
// TryCatch is basically a try catch block written in the file
// for removing wrtting the same code again and again

export const registerUser = TryCatch(async (req, res) => {
  // check first that if the any user is present or not
  // via using email
  // get all the info from user
  const { name, email, password } = req.body;

  // find the user thorugh email as email is unique
  let user = await User.findOne({ email });

  //  if user already exits then return this
  if (user)
    return res.staus(400).json({
      message: "User Already Exists",
    });

  // if user not already exists that means we need to create user
  // then we firstly hash the password
  const hashPassword = await bcrypt.hash(password, 10);
  // const hashPassword = await bcrypt.hash(password, 10);

  // new User creation
  user = await User.create({
    name,
    email,
    // password as the hashPassword
    password: hashPassword,
  });

  // created the token / cookie
  generateToken(user._id, res);

  // at last return the status and sucess message
  // of user registerd sucessfully
  res.staus(201).json({
    user,
    message: "User Registerd Sucessfully",
  });
});

// video start from 39:30
