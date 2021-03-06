const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    receiverId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    text: {
        type: String,
        required: true
    }
})

const NotificationModel = mongoose.model('notifications', NotificationSchema)
module.exports = NotificationModel
