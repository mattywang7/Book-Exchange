const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

// server is listening on port 5000
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

// build remote connection to remote MongoDB
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Connect Remote MongoDB successfully!');
})

app.listen(port, () => {
    console.log('Server is listening on port 5000...')
})