const mongoose = require('mongoose')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const regExForEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'please provide name'],
        minlength: 3,
        maxlength: 20
    },
    email:{
        type:String,
        required: [true, 'please provide email'],
        match: [regExForEmail, 'please provide valid email'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'please provide passsowrd']
    }
})

userSchema.pre('save', async function(next) {
    const salt = await bycrpt.genSalt(10);
    this.password = await bycrpt.hash(this.password, salt)
    next()
})

userSchema.methods.createJWT = function() {
    return jwt.sign({UserID:this._id, name:this.name}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

userSchema.methods.checkPassword = async function(candidatePassword) {
    const isMatch = await bycrpt.compare(candidatePassword, this.password);
    return isMatch
}

module.exports = mongoose.model('User', userSchema)