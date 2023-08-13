// const mongoose = require('mongoose');
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  registrantId: {
    type: String,
  },
  userNameCustomId: {
    type: String,
  },
  userName: {
    type: String,
  },
  customId: {
    type: String,
  },
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
  },
  currency: {
    type: String,
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("transactionModel", transactionSchema);
