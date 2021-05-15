const mongoose = require('mongoose')
const Schema = mongoose.Schema

// record the order info
const OrderSchema = new Schema({
    buyerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    bookId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const OrderModel = mongoose.model('orders', OrderSchema)
module.exports = OrderModel
