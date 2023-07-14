// https://youtu.be/GyzC-30Bqfc
// https://youtu.be/NzROCbkvIE0 
// app.js or server.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');

const connectDB = require('./config/db');
const User = require('./routes/user');

const app = express();

// Connect to MongoDB
connectDB();

// app.use(express.json());

// app.get('/',(req,res) => res.send('Hellooo'));
app.use('/api/v1/User', User);
// app.use('/api/v1/User', upload.single('image'), User);;


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
