// https://youtu.be/GyzC-30Bqfc
// https://youtu.be/NzROCbkvIE0 
// app.js or server.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
// const UserModel = require('./models/User')
const fs = require('fs');
// const fs = require('fs').promises; // Use fs.promises for async file operations



const connectDB = require('./config/db');
const User = require('./routes/user');

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
