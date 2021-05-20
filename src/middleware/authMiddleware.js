const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')

const privateAccess = asyncHandler(async (req, res, next) => {
    let token = null
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, keys.secretOrKey)
            // exclude password
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Token is not correct, unauthorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('No token, unauthorized')
    }
})

module.exports = privateAccess
