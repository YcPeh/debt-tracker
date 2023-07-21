// https://youtu.be/GyzC-30Bqfc
// https://youtu.be/NzROCbkvIE0 
// app.js or server.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const UserModel = require('./models/User')
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

// app.post('/', upload.single('image'), async (req, res) => {
//   try {
//     console.log('addUser upload')
//     console.log('req.body')
//     console.log(req.body)
//     console.log('req.file')
//     console.log(req.file)
//     const newUser = new UserModel({
//       customId: req.body.customId,
//       name: req.body.name,
//       imageName: req.file.filename,
//       image: {
//         data: fs.readFileSync("client/public/uploads/" + req.file.filename),
//         contentType: 'image/png',
//       }
//     })
//     await newUser.save();
//     res.send("(addUser) successfully uploaded");

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: "Server Error",
//     });
//   }
// });


// app.put('/:idFromFrontEnd/userPhoto', upload.single('image'), async (req, res) => {
//   try {
//     const { idFromFrontEnd } = req.params;
//     const { image, imageName } = req.body;
//     console.log('updateUserPhoto upload')
//     console.log('req.body')
//     console.log(req.body)
//     console.log('image')
//     console.log(image)
//     console.log('req.file')
//     console.log(req.file)

//     const updatedUser = await UserModel.findOneAndUpdate({ customId: idFromFrontEnd }, { image, imageName: req.file.filename }, { new: true });
//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         error: 'User not found',
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: updatedUser,
//     });


//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: 'Server Error',
//     });
//   }
// });

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
