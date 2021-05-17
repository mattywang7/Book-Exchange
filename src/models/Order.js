const mongoose = require('mongoose')
const Schema = mongoose.Schema

// record the order info
const OrderSchema = new Schema({
    buyerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    text: {
        type: String,
        required: true,
    },

    exchanged: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

const OrderModel = mongoose.model('orders', OrderSchema)
module.exports = OrderModel
