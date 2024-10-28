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

// login of already existed user
export const loginUser = TryCatch(async (req, res) => {
  // check first that if the any user is present or not
  // via using email
  // get all the info from user
  const { email, password } = req.body;

  // find the user thorugh email as email is unique
  const user = await User.findOne({ email });

  // if user not found then show the message
  if (!user)
    return res.staus(400).json({
      message: "No User Exists",
    });

  // if user exits then check the password
  // compare the user password with the typed one to correctly identify the user
  // compare the password which receives from body and compare with user.password
  const comparePassword = await bcrypt.compare(password, user.password);

  // if comapre password is not equal to password, that mean wrong password
  if (!comparePassword)
    return res.status(400).json({
      // we write credentials
      message: "Wrong Credentials",
    });

  // created the token / cookie
  generateToken(user._id, res);

  // at last return the status and sucess message
  // of user registerd sucessfully
  res.staus(200).json({
    user,
    message: "User LoggedIn Sucessfully",
  });
});

// to fetch the user profile and details
export const myProfile = TryCatch(async (req, res) => {
  // find the user by the req id which get from the isAuth middleware
  const user = await User.findById(req.user._id);

  // send the res of user
  res.json(user);
});

// to Logout the user
export const logoutUser = TryCatch(async (req, res) => {
  // make the token to empty , & maxAge is 0 , it instatly removes
  res.cookie("token", "", { maxAge: 0 });

  // return the message of logged out 
  res.json({
    message: "Logged Out Successfully",
  });
});
