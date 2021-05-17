const express = require('express')
const privateAccess = require("../../middleware/authMiddleware");
const OrderModel = require("../../models/Order");
const BookModel = require("../../models/Book");
const router = express.Router()

/**
 * @route /api/orders/new
 * @desc create a new order for one specific user
 * @access private
 */
router.post('/new', privateAccess, (req, res) => {
    const newOrder = new OrderModel({
        buyerId: req.user._id,
        text: req.body.text
    })

    newOrder.save()
        .then(order => res.json(order))
        .catch(err => console.log(err))
})

/**
 * @route /api/orders/my
 * @desc get all the orders of one specific user
 * @access private
 */
router.get('/my', privateAccess, (req, res) => {
    OrderModel.find({ buyerId: req.user._id })
        .then(orders => {
            res.json(orders)
        })
        .catch(error => {
            console.log(error)
        })
})

module.exports = router
