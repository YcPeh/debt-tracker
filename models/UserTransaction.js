const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userNameCustomId:{
        type: String,
        // required:[true, 'Mongoose backend require name of user']
    },
    userName:{
        type: String,
        // required:[true, 'Mongoose backend require name of user']
    },
    title:{
        type:String,
    },
    category:{
        type:String,
    },
    type:{
        type:String,
    },
    currency:{
        type:String,
    },
    amount:{
        type:Number,
    },
    description:{
        type:String,
    },
})

module.exports = mongoose.model('UserTransactionModel', UserSchema);