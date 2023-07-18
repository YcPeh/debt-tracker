const UserModel = require('../models/User')
const multer = require('multer');
const fs = require('fs');

const Storage = multer.diskStorage({
  destination: 'uploads',
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
  try {
    upload(req, res, (err) => {
      const newUser = new UserModel({
        name: req.body.name,
        image: {
          // data: req.file.filename,
          data: fs.readFileSync("uploads/" + req.file.filename),
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
    const deleteUser = await UserModel.findByIdAndRemove(req.params.id)
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

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, { name }, { new: true });
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
