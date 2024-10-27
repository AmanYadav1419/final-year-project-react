// for generating the token of user ,
// so that if any user register then don't need to logi again

import jwt from "jsonwebtoken";

// function to generate token
const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.jwt_secret, {
    // time in days of expiry
    expiresIn: "15d",
  });

  // now this token saved in cookie
  res.cookie("token", token, {
    // the max age is will be 15days wriiten in this format
    maxAge: 15 * 24 * 60 * 60 * 1000,
    // enabled http for security purpose
    httpOnly: true,
    // to prevent the csrf attacks from hackers , we use strict
    sameSite: "strict",
  });
};

// exporting the generateToken
export default generateToken;
