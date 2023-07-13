const UserModel = require('../models/User')
const multer = require('multer');

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
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};
exports.addUser = async (req, res, next) => {
    // res.send('POST user');

    // JSON
    // try {
    //     console.log(req.body)
    //     const {name, image} = req.body;
    //     const user = await UserModel.create(req.body);
    //     return res.send(201).json({
    //         success: true,
    //         data: user,
    //     })
    // } catch (error) {
    //     console.log(error);
    // }

    // // form-data with image
    // try {
    //     const { name } = req.body;
    //     const user = await UserModel.create({
    //         name: name,
    //         image: req.file.buffer, // Store the file buffer in the 'image' field
    //     });
    //     return res.status(201).json({
    //         success: true,
    //         data: user,
    //     });

    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).json({
    //         success: false,
    //         error: 'Server Error',
    //     });
    // }

    upload(req,res,(err)=>{
        if (err) {
            console.log('hihi')
          console.log(err)
        } else {
          const newUser = new UserModel({
            name: req.body.name,
            image: {
              data: req.file.filename,
              contentType: 'image/png',
            }
          })
          newUser.save()
            .then(() => res.send("successfully uploaded"))
            .catch((err) => console.log(err));
        }
      })
};
exports.deleteUser = async (req, res, next) => {
    res.send('DELETE user');
};