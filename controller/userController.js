const UserModels = require('../models/User')


exports.getUser = async (req, res, next) => {
    // res.send('GET user');
    try {
        const user = await UserModels.find();
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
    //     const user = await UserModels.create(req.body);
    //     return res.send(201).json({
    //         success: true,
    //         data: user,
    //     })
    // } catch (error) {
    //     console.log(error);
    // }

    // form-data with image
    try {
        const { name } = req.body;
        const user = await UserModels.create({
            name: name,
            image: req.file.buffer, // Store the file buffer in the 'image' field
        });
        return res.status(201).json({
            success: true,
            data: user,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};
exports.deleteUser = async (req, res, next) => {
    res.send('DELETE user');
};