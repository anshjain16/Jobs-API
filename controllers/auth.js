const { StatusCodes } = require('http-status-codes');
const User = require('../models/User')
const {BadRequestError, UnauthenticatedError} = require('../errors/index')



const register = async(req, res) => {
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({token})
}

const login = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('Please enter email and password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = await user.checkPassword(password)

    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = user.createJWT();
    res.send({token})

}

module.exports = {
    register,
    login
}