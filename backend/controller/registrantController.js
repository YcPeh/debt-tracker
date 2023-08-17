import asyncHandler from "express-async-handler";
import registrantModel from "../models/Registrant.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import emailValidator from "deep-email-validator";
import * as dotenv from "dotenv";
dotenv.config();

export const sendEmail = asyncHandler(async (req, res) => {
  console.log("sendEmail backend");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const { email } = req.body;
  console.log("email");
  console.log(email);

  const isEmailValid = async (email) => {
    return emailValidator.validate(email);
  };

  const { valid, reason, validators } = await isEmailValid(email);
  // console.log("valid");
  // console.log(valid);
  // console.log("reason");
  // console.log(reason);
  // console.log("validators");
  // console.log(validators);

  if (valid) {
    const registrant = await registrantModel.findOne({ email });
    // console.log("registrant");
    // console.log(registrant);

    const randomPassword = Math.random().toString(36).slice(-8);

    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(randomPassword, salt);
    registrant.password = randomPassword;
    await registrant.save();

    console.log("randomPassword");
    console.log(randomPassword);
    // console.log("hashPassword");
    // console.log(hashPassword);

    // console.log("registrant");
    // console.log(registrant);

    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Debt Tracker App Password Recovery",
      html: `
    <p>Your temporary password is:</p>
    <p><strong>${randomPassword}</strong></p>
    <p>Please delete this email once you reset your password.</p>
  `,
      // text: `Here is your password: \n${randomPassword} \n\nPlease delete this Email once you reset your password`,
    });
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } else {
    return res.status(200).json({
      success: false,
      message: validators[reason].reason,
      email,
      valid,
      reason,
      validators,
    });
  }
});

export const authRegistrant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("password");
  console.log(password);
  console.log("email");
  console.log(email);
  const registrant = await registrantModel.findOne({ email });
  console.log("registrant");
  console.log(registrant);
  const matchPassword = await registrant.matchPassword(password);
  if (registrant && matchPassword) {
    generateToken(res, registrant._id);
    res.status(201).json({
      _id: registrant._id,
      name: registrant.name,
      email: registrant.email,
      // token:generateToken(res,registrant._id)
    });
  } else {
    // res.status(401);
    // throw new Error("Invalid email or password");
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    error.email = email;
    error.password = password;
    error.registrant = registrant;
    error.matchPassword = matchPassword;
    throw error;
  }
});

export const registerRegistrant = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const registrantExists = await registrantModel.findOne({ email });

  if (registrantExists) {
    res.status(400);
    throw new Error("Registrant already exists");
  }

  const registrant = await registrantModel.create({
    name,
    email,
    password,
  });

  if (registrant) {
    generateToken(res, registrant._id);
    res.status(201).json({
      _id: registrant._id,
      name: registrant.name,
      email: registrant.email,
      // password:registrant.password,
      // token:generateToken(registrant._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid registrant data");
  }
});

export const logOutRegistrant = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Registrant logged out" });
});

export const getRegistrantProfile = asyncHandler(async (req, res) => {
  // console.log('req.registrant')
  // console.log(req.registrant)
  const registrant = {
    _id: req.registrant._id,
    name: req.registrant.name,
    email: req.registrant.email,
    password: req.registrant.password,
  };
  res.status(200).json(registrant);
});

export const updateRegistrantProfile = asyncHandler(async (req, res) => {
  console.log("req.registrant");
  console.log(req.registrant);
  const registrant = await registrantModel.findById(req.registrant._id);
  if (registrant) {
    registrant.name = req.body.name || registrant.name;
    registrant.email = req.body.email || registrant.email;
    registrant.password = req.body.password || registrant.password;
    const updatedRegistrant = await registrant.save();
    res.status(200).json({
      _id: updatedRegistrant._id,
      name: updatedRegistrant.name,
      email: updatedRegistrant.email,
      // password:updatedRegistrant.password,
    });
  } else {
    res.status(404);
    throw new Error("Registrant not found");
  }
});
