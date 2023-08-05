// db.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://YCPeh:asdf@cluster0.ckolafm.mongodb.net/Cluster0?retryWrites=true&w=majority');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error Message: ${err.message}`);
    process.exit(1);
  }
};

// module.exports = connectDB;
export default connectDB;
