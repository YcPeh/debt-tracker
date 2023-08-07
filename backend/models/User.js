// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    customId:{
        type: String,
        // required:[true, 'Mongoose backend require name of user']
    },
    name:{
        type: String,
        // required:[true, 'Mongoose backend require name of user']
    },
    // image:{
    //     type: String,
    //     required:[true, 'Mongoose backend require name of user']
    // },
    imageName:{
        type:String
    },
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

// module.exports = mongoose.model('UserModel', UserSchema);
export default mongoose.model('userModel', userSchema);