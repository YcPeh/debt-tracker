// const express = require('express');
// const router = express.Router();
// const {getUser, addUser, deleteUser, updateUserName, updateUserPhoto} = require('../controller/userController');
// const { addTransaction, deleteTransaction, getTransaction, updateTransaction } = require('../controller/transactionController');

import express from "express";
const router = express.Router();
import {
  getUser,
  addUser,
  deleteUser,
  updateUserName,
  updateUserPhoto,
  // checkDeleteLocalUserImage,
} from "../controller/userController.js";

router.route("/").get(getUser).post(addUser);
// router.route("/deleteImage").post(checkDeleteLocalUserImage);
router.route("/:idFromFrontEnd").delete(deleteUser).put(updateUserName);
router.route("/:idFromFrontEnd").put(updateUserName);
router.route("/:idFromFrontEnd/userPhoto").put(updateUserPhoto);
// router.route("/").delete(deleteUser);

// module.exports = router;
export default router;
