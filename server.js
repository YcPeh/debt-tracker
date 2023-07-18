// https://youtu.be/GyzC-30Bqfc
// https://youtu.be/NzROCbkvIE0 
// app.js or server.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');
const path = require('path');


const connectDB = require('./config/db');
const User = require('./routes/user');

const app = express();

app.use(cors());

// Connect to MongoDB
connectDB();

app.use(express.json());

// // Configure a route for serving the images
// app.use('/uploadsFromBackEnd', express.static(path.join(__dirname, 'uploads')));
// // Serve the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
// // Handle other routes and return the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// app.get('/',(req,res) => res.send('Hellooo'));
// app.use('/api/v1/User', User);
app.use(User);
// app.use('/api/v1/User', upload.single('image'), User);;


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
