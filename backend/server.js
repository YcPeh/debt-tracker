// https://youtu.be/GyzC-30Bqfc
// https://youtu.be/NzROCbkvIE0 
// app.js or server.js
// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const User = require('./routes/user');

import express from 'express';
import multer from 'multer';
import cors from 'cors';
import connectDB from './config/db.js';
import User from './routes/user.js';


const app = express();

const Storage = multer.diskStorage({
  destination: 'client/public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage
});

app.use(cors());

// Connect to MongoDB
connectDB();

app.use(express.json());

app.use(User);


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
