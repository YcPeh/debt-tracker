import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import registrantModel from "../models/Registrant.js";
import * as dotenv from "dotenv";
dotenv.config();

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded");
      console.log(decoded);
      // req.registrant = await registrantModel.findById(decoded.registrantId).select('-password');
      req.registrant = await registrantModel.findById(decoded.registrantId);
      console.log("req.registrant");
      console.log(req.registrant);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
