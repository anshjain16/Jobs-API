const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {UnauthenticatedError} = require('../errors/index')


const auth = async (req, res, next) => {
    if(!req.header){
        throw new UnauthenticatedError('1you are not authorised')
    }

    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('2you are not authorised')
    }
    let token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {UserID: payload.UserID, name: payload.name}
        next();
    } catch (error) {
        throw new UnauthenticatedError('3you are not authorised')
    }

}

module.exports = auth