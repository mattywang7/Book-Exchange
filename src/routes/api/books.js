const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

// for private access
const auth = require('../../middleware/auth')

const BookModel = require('../../models/Book')

/**
 * @route GET /api/books/books-for-sale
 * @desc all the books available for sale of a specific seller
 * @access private
 */
router.get('/books-for-sale', auth, (req, res) => {
    BookModel.find({userId: req.user.id, purchased: false})
        .then(books => res.json(books))
        .catch(err => res.status(404).json({success: false, msg: "find books for sale failed!"}))
})

/**
 * @route POST /api/books/add-for-sale
 * @desc add a book for sell for a specific user
 * @access private
 */
router.post('/add-for-sale', auth, (req, res) => {
    // no need to check duplicate books
    // books will not be duplicates

    const newBook = new BookModel({
        userId: req.user.id,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        condition: req.body.condition,
        price: req.body.price,
        // image: req.body.image
    })

    newBook.save()
        .then(book => res.json(book))
        .catch(err => res.status(404).json({success: false, msg: "add book for sale failed!"}))
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
    const booksOfInterest = BookModel.find({...keyword})  // not completed, TODO: purchased === false
    res.json(booksOfInterest)
})

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
            res.status(404).json({success: false, msg: 'This book id does not exist.'})
        })
})

/**
 * @route DELETE /api/books/{id}
 * @desc delete the book by id
 * @access private
 */
router.delete('/:id', auth, (req, res) => {
    BookModel.findById(req.params.id)
        .then(book => {
            if (book) {
                book.remove()
                    .then(() => {
                        res.json({success: true, msg: 'Delete book successfully!'})
                    })
            }
        })
        .catch(err => {
            res.status(404).json({success: false, msg: 'This book id does not exist, cannot delete'})
        })
})

/**
 * @route PUT /api/books/{id}
 * @desc update the book info by bookId
 * @access private
 */
router.put('/:id', auth, (req, res) => {
    const {
        title,
        author,
        category,
        condition,
        price
    } = req.body

    BookModel.findById(req.params.id)
        .then(book => {
            if (book) {
                book.title = title
                book.author = author
                book.category = category
                book.condition = condition
                book.price = price

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
 * @route PUT /api/books/{id}/sold
 * @desc After the book is chosen, the book is marked sold.
 */
router.put('/:id/sold', auth, (req, res) => {
    BookModel.findById(req.params.id)
        .then(book => {
            if (book) {
                book.sold = true

                book.save()
                    .then(() => {
                        res.json(book)
                    })
                    .catch(res.status(404).json({success: false, msg: 'Cannot mark the chosen book to sold'}))
            }
        })
        .catch(err => {
            res.status(404).json({success: false, msg: 'Cannot find the book to mark sold'})
        })
})

module.exports = router
