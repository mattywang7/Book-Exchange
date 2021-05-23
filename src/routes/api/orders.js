const express = require('express')
const privateAccess = require("../../middleware/authMiddleware");
const OrderModel = require("../../models/Order");
const BookModel = require("../../models/Book");
const User = require('../../models/User')
const router = express.Router()

/**
 * @route /api/orders/new/{bookId}
 * @desc create a new order for one specific user
 * @access private
 */
router.post('/new/:id', privateAccess, (req, res) => {
    const buyer = req.user._id
    const book = req.params.id
    User.findById(buyer)
        .then(foundBuyer => {
            if (foundBuyer) {
                const buyerName = `${foundBuyer.firstName} ${foundBuyer.lastName}`
                BookModel.findById(book)
                    .then(foundBook => {
                        if (foundBook) {
                            const seller = foundBook.userId
                            const bookTitle = foundBook.title
                            foundBook.sold = true
                            foundBook.forSale = false
                            User.findById(seller)
                                .then(user => {
                                    if (user) {
                                        const sellerName = `${user.firstName} ${user.lastName}`
                                        const newOrder = new OrderModel({
                                            buyerId: buyer,
                                            buyerName: buyerName,
                                            sellerId: seller,
                                            sellerName: sellerName,
                                            bookId: book,
                                            bookTitle: bookTitle,
                                            text: req.body.text
                                        })

                                        newOrder.save()
                                            .then(createdOrder => {
                                                res.json(createdOrder)
                                            })
                                            .catch(err => {
                                                console.log(err)
                                            })
                                    }
                                })
                                .catch(err => console.log(err))
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => console.log(err))
})

/**
 * @route /api/orders/my
 * @desc get all the orders of one specific buyer
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

/**
 * @route /api/orders/mysold
 * @desc get all the orders of one specific seller
 * @access private
 */
router.get('/mysold', privateAccess, (req, res) => {
    OrderModel.find({sellerId: req.user._id})
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            console.log(err)
        })
})

/**
 * @route /api/orders/mark-exchanged/{id}
 * @desc mark one order to be exchanged by seller
 * @access private
 */
router.put('/mark-exchanged/:id', (req, res) => {
    OrderModel.findById(req.params.id)
        .then(order => {
            if (order) {
                order.exchanged = true

                const exchangedBookId = order.bookId
                const thisBuyer = order.buyerId
                BookModel.findById(exchangedBookId)
                    .then(boughtBook => {
                        if (boughtBook) {
                            boughtBook.userId = thisBuyer
                            boughtBook.purchased = true
                            boughtBook.sold = false
                            boughtBook.forSale = false

                            boughtBook.save()
                                .catch(err => console.log(err))
                        }
                    })

                order.save()
                    .then(updatedOrder => {
                        res.json(updatedOrder)
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router
