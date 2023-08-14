// const userModel = require('../models/User')
// const multer = require('multer');
// const fs = require('fs');

import userModel from "../models/User.js";
import multer from "multer";
import fs from "fs";

const Storage = multer.diskStorage({
  destination: "../frontend/public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

// export const addUser = async (req, res, next) => {
//   try {
//     await new Promise((resolve, reject) => {
//       upload(req, res, async (err) => {
//         if (err) {
//           return reject(err);
//         }
//         // Save the user data after image is uploaded
//         const newUser = new userModel({
//           customId: req.body.customId,
//           name: req.body.name,
//           imageName: req.file.filename,
//           image: {
//             data: fs.readFileSync(
//               "frontend/public/uploads/" + req.file.filename
//             ),
//             contentType: "image/png",
//           },
//         });
//         await newUser.save();
//         resolve();
//       });
//     });
//     res.send("(addUser) successfully uploaded");
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: "Server Error",
//     });
//   }
// };

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

export const checkDeleteLocalUserImage = async (req, res, next) => {
  try {
    const imageFilePath = "../frontend/public/uploads/" + req.body.imageName;
    // console.log("req.body");
    // console.log(req.body);
    // console.log("imageFilePath");
    // console.log(imageFilePath);
    if (fs.existsSync(imageFilePath)) {
      fs.unlinkSync(imageFilePath);
      console.log(`Deleted existing file: ${imageFilePath}`);
      return res.status(200).json({
        success: true,
        message: `Deleted existing file: ${imageFilePath}`,
      });
    } else {
      // return res.status(404).json({
      //   success: false,
      //   message: `File not found: ${imageFilePath}`,
      // });
      console.log(`${imageFilePath} does not exist yet`);
      // next();
      return res.status(200).json({
        success: true,
        message: `${imageFilePath} does not exist yet`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const addUser = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      const imageFilePath = "../frontend/public/uploads/" + req.file.filename;
      console.log("req.body.registrantId");
      console.log(req.body.registrantId);
      const newUser = new userModel({
        customId: req.body.customId,
        registrantId: req.body.registrantId,
        name: req.body.name,
        imageName: req.file.filename,
        image: {
          data: fs.readFileSync(imageFilePath),
          contentType: "image/png",
        },
      });
      await newUser.save();
      console.log(`successfully uploaded ${req.file.filename}`);
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
    const deleteUser = await userModel.findOneAndDelete({
      customId: req.params.idFromFrontEnd,
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
      const { image, imageName } = req.body;
      // console.log('updateUserPhoto upload')
      // console.log('req.body')
      // console.log(req.body)
      // console.log('image')
      // console.log(image)
      // console.log('req.file')
      // console.log(req.file)

      const updatedUser = await userModel.findOneAndUpdate(
        { customId: idFromFrontEnd },
        { image, imageName: req.file.filename },
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
