/**
 * firstName: String
 * lastName: String
 * email: email
 *
 * user -> book
 * one -> many
 *
 * book:
 * id
 * title: String
 * author: String
 * category: String
 * general condition: int (1 - 5)
 * price: double
 * forSale: bool
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create a database schema to define a User for registration and login purposes.

// Set up two API routes, /register and /login, using passport + jsonwebtoken for authentication
// and validator for input validation.

// Test our API routes using Postman.
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    username: this.firstName + " " + this.lastName,

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User
