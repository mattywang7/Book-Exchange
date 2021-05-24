const express = require('express')
const privateAccess = require("../../middleware/authMiddleware");
const OrderModel = require("../../models/Order");
const BookModel = require("../../models/Book");
const User = require('../../models/User')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const validateReviewInfo = require('../../validation/addReview')
const {ReviewModel} = require("../../models/Review");

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

/**
 * @route /api/orders/add-review/{id}
 * @desc add a review for this order after the order is completed
 * @access private
 */
// router.post('/add-review/:id', privateAccess, (req, res) => {
//     const {errors, isValid} = validateReviewInfo(req.body)
//     if (!isValid) {
//         return res.status(400).json(errors)
//     }
//
//     const newReview = new ReviewModel({
//         userId: req.user._id,
//         orderId: req.params.id,
//         title: req.body.title,
//         text: req.body.text,
//         score: req.body.score
//     })
//
//     newReview.save()
//         .then(savedReview => {
//             OrderModel.findById(req.params.id)
//                 .then(foundOrder => {
//                     if (foundOrder) {
//                         foundOrder.reviewScore = req.body.score
//                     }
//                     res.json(savedReview)
//                 })
//                 .catch(err => console.log(err))
//         })
//         .catch(err => console.log(err))
// })

router.post('/add-review/:id', privateAccess, asyncHandler(async (req, res) => {
    const thisOrderId = req.params.id
    const reviewAdder = req.user._id
    const {errors, isValid} = validateReviewInfo(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newReview = new ReviewModel({
        userId: reviewAdder,
        orderId: thisOrderId,
        title: req.body.title,
        text: req.body.text,
        score: req.body.score
    })

    const addedReview = await newReview.save()
    res.json(addedReview)
}))

router.get('/get-review/:id', (req, res) => {
    ReviewModel.find({orderId: req.params.id})
        .then(foundReview => {
            if (foundReview) {
                res.json(foundReview)
            }
        })
        .catch(err => console.log(err))
})

module.exports = router
