const UserModel = require('../models/User')
const multer = require('multer');
const fs = require('fs');

// const timeForCustomId = new Date().getTime().toString();

const Storage = multer.diskStorage({
  destination: 'client/public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage
}).single('image');

exports.getUser = async (req, res, next) => {
  // res.send('GET user');
  try {
    const user = await UserModel.find();
    return res.status(200).json({
      success: true,
      count: user.length,
      data: user,
    });
  } catch (error) {
    console.log("hihi get error")
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
exports.addUser = async (req, res, next) => {
  // res.send('POST user');
  // console.log('addUser')
  // console.log('req.body')
  // console.log(req.body)
  // console.log('req.file')
  // console.log(req.file)
  try {
    upload(req, res, (err) => {
      console.log('addUser upload')
      console.log('req.body')
      console.log(req.body)
      console.log('req.file')
      console.log(req.file)
      const newUser = new UserModel({
        customId: req.body.customId,
        name: req.body.name,
        imageName: req.file.filename,
        image: {
          // data: req.file.filename,
          data: fs.readFileSync("client/public/uploads/" + req.file.filename),
          contentType: 'image/png',
          // contentType: req.file.mimetype,
        }
        // image: {
        //   data: fs.readFileSync("uploads/" + req.file.filename)
        // }
      })

      newUser.save()
        .then(() => res.send("successfully uploaded"))
        .catch((err) => console.log(err));
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  // res.send('DELETE user');
  try {
    // const deleteUser = await UserModel.findByIdAndRemove(req.params.idFromFrontEnd)
    const deleteUser = await UserModel.findOneAndDelete({ customId: req.params.idFromFrontEnd });
    console.log('req.params.idFromFrontEnd')
    console.log(req.params.idFromFrontEnd)
    console.log('req.params')
    console.log(req.params)
    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }
    // await deleteUser.remove();
    return res.status(200).json({
      success: true,
      data: {}
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

exports.updateUserName = async (req, res, next) => {
  try {
    const { idFromFrontEnd } = req.params;
    const { name } = req.body;
    // const updatedUser = await UserModel.findByIdAndUpdate(idFromFrontEnd, { name }, { new: true });
    const updatedUser = await UserModel.findOneAndUpdate({ customId: idFromFrontEnd }, { name }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// exports.updateUserPhoto = async (req, res, next) => {
//   try {
//     const { idFromFrontEnd } = req.params;
//     const { image, imageName } = req.body;
//     console.log('updateUserPhoto')
//     // console.log('req')
//     // console.log(req)
//     console.log('req.file')
//     console.log(req.file)
//     console.log('req.body')
//     console.log(req.body)
//     console.log('idFromFrontEnd')
//     console.log(idFromFrontEnd)
//     console.log('image')
//     console.log(image)
//     console.log('imageName')
//     console.log(imageName)
//     // const updatedUser = await UserModel.findByIdAndUpdate(idFromFrontEnd, { name }, { new: true });
//     const updatedUser = await UserModel.findOneAndUpdate({ customId: idFromFrontEnd }, { image, imageName }, { new: true });
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
// };

exports.updateUserPhoto = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      const { idFromFrontEnd } = req.params;
      const { image, imageName } = req.body;
      console.log('updateUserPhoto upload')
      console.log('req.body')
      console.log(req.body)
      console.log('image')
      console.log(image)
      console.log('req.file')
      console.log(req.file)
      
      // const imageData = {
      //   data: fs.readFileSync("client/public/uploads/" + req.file.filename),
      //   contentType: 'image/png', // Update the contentType based on your image type
      // };

      // console.log('imageData')
      // console.log(imageData)

      const updatedUser = await UserModel.findOneAndUpdate({ customId: idFromFrontEnd }, { image, imageName }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
      return res.status(200).json({
        success: true,
        data: updatedUser,
      });

    })
    // const { idFromFrontEnd } = req.params;
    // const { image, imageName } = req.body;
    // console.log('updateUserPhoto')
    // console.log('req.file')
    // console.log(req.file)
    // console.log('req.body')
    // console.log(req.body)
    // console.log('idFromFrontEnd')
    // console.log(idFromFrontEnd)
    // console.log('image')
    // console.log(image)
    // console.log('imageName')
    // console.log(imageName)
    // const updatedUser = await UserModel.findByIdAndUpdate(idFromFrontEnd, { name }, { new: true });
    // const updatedUser = await UserModel.findOneAndUpdate({ customId: idFromFrontEnd }, { image, imageName }, { new: true });
    // if (!updatedUser) {
    //   return res.status(404).json({
    //     success: false,
    //     error: 'User not found',
    //   });
    // }
    // return res.status(200).json({
    //   success: true,
    //   data: updatedUser,
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
