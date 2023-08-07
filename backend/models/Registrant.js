import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const registrantSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{
    timestamps: true
});

registrantSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    } 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);    
});

registrantSchema.methods.matchPassword = async function (enteredPassword) {
    // console.log('enteredPassword')
    // console.log(enteredPassword)
    // console.log('this.password')
    // console.log(this.password)
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model('registrantModel', registrantSchema);