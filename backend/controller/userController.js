// const userModel = require('../models/User')
// const multer = require('multer');
// const fs = require('fs');

import userModel from "../models/User.js";
import multer from "multer";
import fs from "fs";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import * as dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    "." +
    today.getMilliseconds();
  const dateTime = date + "_" + time;
  return dateTime;
};

const uploadImageAndGetUrl = async (imageName, req) => {
  const dateTime = giveCurrentDateTime();
  const baseImageName = imageName.split(".")[0];
  const imageExtension = imageName.split(".")[1];
  const uniqueImageName = `${baseImageName}_${dateTime}.${imageExtension}`;

  const mimetype = req.file.mimetype;
  const imageBuffer = req.file.buffer;

  const storageRef = ref(storage, `Users/${uniqueImageName}`);
  const metadata = {
    contentType: mimetype,
  };

  const snapshot = await uploadBytesResumable(
    storageRef,
    imageBuffer,
    metadata
  );
  const imageUrl = await getDownloadURL(snapshot.ref);

  return {
    imageUrl,
    imageBuffer,
    uniqueImageName,
    mimetype,
  };
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

// const Storage = multer.diskStorage({
//   destination: "../frontend/public/uploads",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const Storage = multer.memoryStorage();

const upload = multer({
  storage: Storage,
}).single("image");

export const getUser = async (req, res, next) => {
  try {
    const user = await userModel.find();
    return res.status(200).json({
      success: true,
      count: user.length,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// export const checkDeleteLocalUserImage = async (req, res, next) => {
//   try {
//     const imageFilePath = "../frontend/public/uploads/" + req.body.imageName;
//     // console.log("req.body");
//     // console.log(req.body);
//     // console.log("imageFilePath");
//     // console.log(imageFilePath);
//     if (fs.existsSync(imageFilePath)) {
//       fs.unlinkSync(imageFilePath);
//       console.log(`Deleted existing file: ${imageFilePath}`);
//       return res.status(200).json({
//         success: true,
//         message: `Deleted existing file: ${imageFilePath}`,
//       });
//     } else {
//       // return res.status(404).json({
//       //   success: false,
//       //   message: `File not found: ${imageFilePath}`,
//       // });
//       console.log(`${imageFilePath} does not exist yet`);
//       // next();
//       return res.status(200).json({
//         success: true,
//         message: `${imageFilePath} does not exist yet`,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: "Server Error",
//     });
//   }
// };

export const addUser = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      const { customId, registrantId, name, imageName } = req.body;

      const { imageUrl, imageBuffer, uniqueImageName, mimetype } =
        await uploadImageAndGetUrl(imageName, req);

      // console.log("uniqueImageName");
      // console.log(uniqueImageName);
      // console.log("imageUrl");
      // console.log(imageUrl);

      // const dateTime = giveCurrentDateTime();
      // const baseImageName = imageName.split(".")[0];
      // const imageExtension = imageName.split(".")[1];
      // const uniqueImageName = `${baseImageName}_${dateTime}.${imageExtension}`;
      // const mimetype = req.file.mimetype;
      // const imageBuffer = req.file.buffer;

      // const storageRef = ref(storage, `Users/${uniqueImageName}`);
      // const metadata = {
      //   contentType: mimetype,
      // };

      // const snapshot = await uploadBytesResumable(
      //   storageRef,
      //   imageBuffer,
      //   metadata
      // );
      // const imageUrl = await getDownloadURL(snapshot.ref);

      // const imageFilePath = "../frontend/public/uploads/" + req.file.filename;
      const newUser = new userModel({
        customId: customId,
        registrantId: registrantId,
        name: name,
        imageName: uniqueImageName,
        image: {
          // data: fs.readFileSync(imageFilePath),
          data: imageBuffer,
          // contentType: "image/png",
          contentType: mimetype,
        },
        imageUrl: imageUrl,
      });
      await newUser.save();
      console.log(`successfully uploaded ${uniqueImageName}`);
      res.send("(addUser) successfully uploaded");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { imageName } = req.body;

    const desertRef = ref(storage, `Users/${imageName}`);
    await deleteObject(desertRef);

    const deleteUser = await userModel.findOneAndDelete({
      customId: req.params.idFromFrontEnd,
      // customId: customId,
    });
    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// exports.updateUserName = async (req, res, next) => {
export const updateUserName = async (req, res, next) => {
  try {
    const { idFromFrontEnd } = req.params;
    const { name } = req.body;
    // const updatedUser = await userModel.findByIdAndUpdate(idFromFrontEnd, { name }, { new: true });
    const updatedUser = await userModel.findOneAndUpdate(
      { customId: idFromFrontEnd },
      { name },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// exports.updateUserPhoto = async (req, res, next) => {
export const updateUserPhoto = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      const { idFromFrontEnd } = req.params;
      const { imageNameToDelete } = req.body;

      const desertRef = ref(storage, `Users/${imageNameToDelete}`);

      await deleteObject(desertRef);

      const imageName = req.file.originalname;
      const { imageUrl, uniqueImageName } = await uploadImageAndGetUrl(
        imageName,
        req
      );
      // console.log("uniqueImageName after function");
      // console.log(uniqueImageName);
      // const dateTime = giveCurrentDateTime();
      // const baseImageName = imageName.split(".")[0];
      // const imageExtension = imageName.split(".")[1];
      // const uniqueImageName = `${baseImageName}_${dateTime}.${imageExtension}`;
      // const mimetype = req.file.mimetype;
      // const imageBuffer = req.file.buffer;

      // const storageRef = ref(storage, `Users/${uniqueImageName}`);
      // const metadata = {
      //   contentType: mimetype,
      // };

      // const snapshot = await uploadBytesResumable(
      //   storageRef,
      //   imageBuffer,
      //   metadata
      // );
      // const imageUrl = await getDownloadURL(snapshot.ref);

      const updatedUser = await userModel.findOneAndUpdate(
        { customId: idFromFrontEnd },
        {
          // image: {
          //   // data: fs.readFileSync(imageFilePath),
          //   data: imageBuffer,
          //   // contentType: "image/png",
          //   contentType: mimetype,
          // },
          imageName: uniqueImageName,
          imageUrl: imageUrl,
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: updatedUser,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
