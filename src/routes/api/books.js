const express = require('express')
const router = express.Router()
const passport = require('passport')
const privateAccess = require('../../middleware/authMiddleware')
const asyncHandler = require('express-async-handler')

// for private access

const BookModel = require('../../models/Book')
const validateBookInfo = require("../../validation/addBook");

/**
 * @route GET /api/books/books-for-sale
 * @desc all the books available for sale of a specific seller
 * @access private
 */
router.get('/books-for-sale', privateAccess, (req, res) => {
    BookModel.find({userId: req.user._id, forSale: true})
        .then(books => {
            res.json(books)
        })
        .catch(err => {
            console.log(err)
        })
})

/**
 * @route POST /api/books/add-for-sale
 * @desc add a book for sell for a specific user
 * @access private
 */
router.post('/add-for-sale', privateAccess, (req, res) => {
    const {errors, isValid} = validateBookInfo(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newBook = new BookModel({
        userId: req.user._id,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        condition: req.body.condition,
        price: req.body.price,
        // image: req.body.image,
        forSale: true
    })



    newBook.save()
        .then(book => res.json(book))
        .catch(err => console.log(err))
})

/**
 * @route GET /api/books/search?type={}&keyword={}
 * @desc for any client (can be guest) to search for books by title, author, category and keyword
 * @access public
 */
router.get('/search', (req, res) => {
    // /search?type={title}, {author}, {category}&keyword={something}
    const type = req.query.type
    let keyword = {}
    // search by title keyword
    if (type === 'title') {
        if (req.query.keyword) {
            keyword = {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i'
                }
            }
        }
    } else if (type === 'author') {
        if (req.query.keyword) {
            keyword = {
                author: {
                    $regex: req.query.keyword,
                    $options: 'i'
                }
            }
        }
    } else if (type === 'category') {
        if (req.query.keyword) {
            keyword = {
                category: {
                    $regex: req.query.keyword,
                    $options: 'i'
                }
            }
        }
    }
    // const booksOfInterest = BookModel.find({...keyword})  // not completed, TODO: purchased === false
    // res.json(booksOfInterest)
    // filer: purchased
    BookModel.find({...keyword, forSale: true})
        .then(bookOfInterest => {
            res.json(bookOfInterest)
        })
})



/**
 * @route PUT /api/books/{id}
 * @desc update the book info by bookId
 * @access private
 */
router.put('/:id', privateAccess, (req, res) => {
    const {
        title,
        author,
        category,
        condition,
        price,
        image,
        forSale
    } = req.body

    BookModel.findById(req.params.id)
        .then(book => {
            if (book) {
                book.title = title
                book.author = author
                book.category = category
                book.condition = condition
                book.price = price
                book.image = image
                book.forSale = forSale

                book.save()
                    .then(() => {
                        res.json(book)
                    })
                    .catch(err => {
                        res.status(404).json({success: false, msg: 'Cannot save the new book info'})
                    })
            }
        })
        .catch(err => {
            res.status(404).json({success: false, msg: 'Cannot find the book to update info.'})
        })
})



/**
 * @route GET /api/books/mybooks
 * @desc all my books (purchased and sold)
 */
router.get('/mybooks', privateAccess, (req, res) => {
    BookModel.find({userId: req.user._id})
        .then(books => {
            res.json(books)
        })
        .catch(err => console.log(err))
})

// router.post('/:id/add-review', passport.authenticate('jwt', {session: false}), (req, res) => {
//     const score = req.body.score
//     const text = req.body.text
//     BookModel.findById(req.params.id)
//         .then(book => {
//             if (book) {
//
//             }
//         })
// })

/**
 * @route GET /api/books/{id}
 * @desc the book by bookId
 * @access public
 */
router.get('/:id', (req, res) => {
    BookModel.findById(req.params.id)
        .then(book => {
            if (book) {
                res.json(book)
            }
        })
        .catch(err => {
            res.status(404).json({success: false, msg: 'This book does not exist.'})
        })
})

/**
 * @route DELETE /api/books/{id}
 * @desc delete the book by id
 * @access private
 */
router.delete('/:id', privateAccess, (req, res) => {
    BookModel.findById(req.params.id)
        .then(book => {
            if (book) {
                book.remove()
                    .then(() => {
                        res.json({success: true, msg: 'Delete book successfully!'})
                    })
            }
        })
        .catch(err => console.log(err))
})

/**
 * @route PUT /api/books/{id}/sold
 * @desc After the book is chosen, the book is marked sold.
 */
router.put('/sold/:id', (req, res) => {
    BookModel.findById(req.params.id)
        .then(book => {
            if (book) {
                book.sold = true

                book.save()
                    .then(() => {
                        res.json(book)
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})

module.exports = router
