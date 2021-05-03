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

    username: this.firstName + " " + this.lastName,

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    }
})

const User = mongoose.model('users', UserSchema)
module.exports = User
