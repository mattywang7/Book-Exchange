const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const ReviewModel = mongoose.model('reviews', ReviewSchema)
module.exports = {ReviewModel, ReviewSchema}
