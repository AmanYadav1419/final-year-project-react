// this middleware is for checking for authentication
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// async function for checking authenticaton
export const isAuth = async (req, res, next) => {
  try {
    // get & store the token from cookies
    const token = req.cookies.token;

    // if we didn't get any cookie, return message of please login
    // i.e unauthorised attempt
    if (!token)
      return res.status(43).json({
        message: "Please Login First",
      });

    // for decoding the data via token and jwt seceret key
    const decodedData = jwt.verify(token, process.env.jwt_secret);

    // if any issue in decoded data, i.e token is expired
    if (!decodedData)
      return res.status(403).json({
        message: "token expired",
      });

    // if the decoded data is correct then find the specific user by id
    res.user = await User.findById(decodedData.id);

    // is function se nikalne ke liye next function ko call kiya
    next();
  } catch (error) {
    res.status(500).json({
      message: "Please Login First",
    });
  }
};
