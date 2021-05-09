/**
 * Cloud MongoDB
 * kw3n20@soton.ac.uk
 * mongodb@123
 *
 * User1:
 * Matty
 * mongodb@123
 */

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const userRouter = require('./routes/api/users')
const bookRouter = require('./routes/api/books')

const app = express()

// body-parser middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// remote MongoDB config
const mongodb = require('./config/keys').mongoURI

// build remote connection to AWS Cloud MongoDB
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Remote MongoDB connected successfully."))
    .catch(err => console.log(err))

app.use(passport.initialize())

require('./config/passport')(passport)

app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
