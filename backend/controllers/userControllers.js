import { User } from "../models/User.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// async function of register user controller
// TryCatch is basically a try-catch block written in the file
// for removing writing the same code again and again
export const registerUser = TryCatch(async (req, res) => {
  // check first that if any user is present or not via using email
  // get all the info from user
  const { name, email, password } = req.body;

  // find the user through email as email is unique
  let user = await User.findOne({ email });

  // if user already exists then return this
  if (user)
    return res.status(400).json({
      message: "User Already Exists",
    });

  // if user not already exists, that means we need to create the user
  // then we firstly hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  // new User creation
  user = await User.create({
    name,
    email,
    // password as the hashPassword
    password: hashPassword,
  });

  // created the token/cookie
  generateToken(user._id, res);

  // at last, return the status and success message
  // of user registered successfully
  res.status(201).json({
    user,
    message: "User Registered",
  });
});

// login of an already existing user
export const loginUser = TryCatch(async (req, res) => {
  // check first that if any user is present or not via using email
  // get all the info from user
  const { email, password } = req.body;

  // find the user through email as email is unique
  const user = await User.findOne({ email });

  // if user not found then show the message
  if (!user)
    return res.status(400).json({
      message: "No User Exist",
    });

  // if user exists then check the password
  // compare the user password with the typed one to correctly identify the user
  // compare the password which receives from body and compare with user.password
  const comparePassword = await bcrypt.compare(password, user.password);

  // if compare password is not equal to password, that means wrong password
  if (!comparePassword)
    return res.status(400).json({
      // we write credentials
      message: "Wrong Password",
    });

  // created the token/cookie
  generateToken(user._id, res);

  // at last, return the status and success message
  // of user logged in successfully
  res.status(200).json({
    user,
    message: "User Logged In",
  });
});

// to fetch the user profile and details
export const myProfile = TryCatch(async (req, res) => {
  // find the user by the req id which gets from the isAuth middleware
  const user = await User.findById(req.user._id);

  // send the res of user
  res.json(user);
});

// to logout the user
export const logoutUser = TryCatch(async (req, res) => {
  // make the token empty & maxAge is 0, it instantly removes
  res.cookie("token", "", { maxAge: 0 });

  // return the message of logged out
  res.json({
    message: "Logged Out Successfully",
  });
});

// to save the song in playlist
export const saveToPlaylist = TryCatch(async (req, res) => {
  // first find the user
  const user = await User.findById(req.user._id);

  // if we got the user, then find the user playlists array
  // if the requested id is present
  if (user.playlist.includes(req.params.id)) {
    // then remove the song from playlist
    // for that, find the index of song
    const index = user.playlist.indexOf(req.params.id);

    // then simply remove the song by using splice
    user.playlist.splice(index, 1);

    // then at the end, save the user
    await user.save();

    // then send the response message of playlist removed successfully
    return res.json({
      message: "Removed from playlist",
    });
  }

  // if the song is not in the playlist, then simply push the song to array
  user.playlist.push(req.params.id);

  // then at the end, save the user
  await user.save();

  // then send the response message of playlist added successfully
  return res.json({
    message: "added to playlist",
  });
});
