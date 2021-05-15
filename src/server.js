/**
 * Cloud MongoDB
 * kw3n20@soton.ac.uk
 * mongodb@123
 *
 * User1:
 * Matty
 * mongodb@123
 *
 * TODO:
 * - Redirect guest to login page when they decide to buy
 * - Information of arrangements and the discussions on arranging the offline exchange
 * - When a request is made:
 *   - Mark the book as sold  ✅
 *   - Notify the seller with the buyer information and the chosen book
 *   - seller notify the buyer within 48 hours
 *   - After exchange is completed, seller update the record of the book
 * - Maintain an open order until the sell sends a notification
 * - List sold / purchased books over a period of time
 * - Buyers can add a review for a book they have bought after the exchange is confirmed
 *
 */

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const userRouter = require('./routes/api/users')
const bookRouter = require('./routes/api/books')
const uploadRouter = require('./routes/api/uploadRoutes')

const app = express()

app.use(express.json())

// body-parser middlewares
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// remote MongoDB config
const mongodb = require('./config/keys').mongoURI

// build remote connection to AWS Cloud MongoDB
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Remote MongoDB connected successfully."))
    .catch(err => console.log(err))

// app.use(passport.initialize())

// require('./config/passport')(passport)

app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)
app.use('/api/upload', uploadRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
