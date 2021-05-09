const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

module.exports = (req, res, next) => {
    // get token from req.header
    const token = req.header('x-auth-token')

    // no token
    if (!token) {
        return res.status(400).json({message: 'No token, authorization denied'})
    }

    try {
        jwt.verify(token, keys.secretOrKey, (error, decoded) => {
            // invalid token
            if (error) {
                return res.status(401).json({message: 'Invalid token'})
            } else {
                req.user = decoded.user
                next()
            }
        })
    } catch (err) {
        console.error('something wrong with auth middleware')
        res.status(500).json({message: 'Server Error with Auth'})
    }

}
