// const mongoose = require('mongoose');
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  registrantId: {
    type: String,
  },
  customId: {
    type: String,
  },
  name: {
    type: String,
  },
  imageName: {
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model("userModel", userSchema);
