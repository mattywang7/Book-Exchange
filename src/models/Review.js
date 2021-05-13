const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    text: {
        type: String
    },

    score: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Review = mongoose.model('reviews', ReviewSchema)
module.exports = {Review, ReviewSchema}
