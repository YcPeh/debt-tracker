const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        // required:[true, 'Mongoose backend require name of user']
    },
    // image:{
    //     type: String,
    //     required:[true, 'Mongoose backend require name of user']
    // },
    image:{
        data: Buffer,
        contentType: String,
        // required:[true, 'Mongoose backend require name of user']
    },
    // image: {
    //     data: {
    //         type: Buffer,
    //         required: [true, 'Mongoose backend requires the image data']
    //     },
    //     contentType: String
    // },
})

module.exports = mongoose.model('UserModel', UserSchema);