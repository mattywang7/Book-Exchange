const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ReviewSchema} = require('./Review')

/**
 * Book:
 * title,
 * author,
 * category,
 * general condition (1 - 5),
 * asking price
 */
const BookSchema = new Schema({
    userId: {
        // associate each book with a user
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    condition: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    sold: {
        type: Boolean,
        required: true,
        default: false
    },

    purchased: {
        type: Boolean,
        required: true,
        default: false
    },

    forSale: {
        type: Boolean,
        required: true,
        default: false
    }

}, {
    // automatically manage createdAt and updatedAt
    timestamps: true
})

const BookModel = mongoose.model('books', BookSchema)
module.exports = BookModel
