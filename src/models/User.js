const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    // unique
    email: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('users', UserSchema)
module.exports = User
