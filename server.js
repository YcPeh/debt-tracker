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

// multer
const UserModel = require('./models/User');
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req,file,cb) => {
    cb(null, file.originalname);
  },
});
// const upload = multer({
//   storage: Storage
// }).single('image');
// app.post('/api/v1/User',(req,res)=>{
//   upload(req,res,(err)=>{
//     if (err) {
//       console.log(err)
//     } else {
//       const newUser = new UserModel({
//         name: req.body.name,
//         image: {
//           data: req.file.filename,
//           contentType: 'image/png',
//         }
//       })
//       newUser.save()
//         .then(() => res.send("successfully uploaded"))
//         .catch((err) => console.log(err));
//     }
//   })
// })

// // Create storage configuration for multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Create storage configuration for multer
const upload = multer({ storage: Storage }).single('image');

// app.use(express.json());

// app.get('/',(req,res) => res.send('Hellooo'));
app.use('/api/v1/User', User);
// app.use('/api/v1/User', upload.single('image'), User);;

// Your other server configurations and routes

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
