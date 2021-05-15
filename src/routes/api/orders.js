const express = require('express')
const privateAccess = require("../../middleware/authMiddleware");
const OrderModel = require("../../models/Order");
const BookModel = require("../../models/Book");
const router = express.Router()

router.post('/api/orders/new', (req, res) => {
    const buyerId = req.user._id
    const bookId = req.body.bookId  // TODO
    const sellerId = BookModel.findById(bookId)
        .then(book => {
            if (book) {
                return book.userId
            }
        })
        .catch(err => res.json({msg: 'Cannot find the book any more.'}))

    const newOrder = new OrderModel({
        buyerId: buyerId,
        sellerId: sellerId,
        bookId: bookId
    })

    newOrder.save()
        .then(order => {
            res.json(order)
        })
        .catch(err => res.json({msg: 'Cannot save the new order.'}))
})

module.exports = router
