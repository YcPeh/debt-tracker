// db.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error Message: ${err.message}`);
    process.exit(1);
  }
};

// module.exports = connectDB;
export default connectDB;
