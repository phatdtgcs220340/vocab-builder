import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const UserSchema = new Schema({
    fullName : {
        type: String,
        required : 'Full name cannot be blank'
    },
    username : {
        type: String,
        required : 'Username cannot be blank'
    },
    password : {
        type: String,
        required : 'Password cannot be blank'
    }
},{
    collection : 'user'
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema)