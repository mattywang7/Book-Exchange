const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User')

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body)

    // invalid register information
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                // user !== null, already exist, register fail
                res.status(400).json({email: 'Email already exists'})
            } else {
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password,
                    email: req.body.email
                })

                // hash user's password before saving it into DB
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err
                        }
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body)

    // invalid login information
    if (!isValid) {
        return res.status(400).json(errors)
    }

    // find user by email
    const email = req.body.email
    const password = req.body.password

    // check if this user exist in db
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(400).json({userNotFound: 'User account does not exist.'})
            }

            // user exists, check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // Login input correct, create JWT payload
                        const payload = {
                            id: user.id,
                            username: user.firstName + " " + user.lastName
                        }

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // expires after one year
                            {
                                expiresIn: 31556926
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            }
                        )
                    } else {  // Login input not correct
                        return res.status(400).json({passwordNotCorrect: 'Password not correct.'})
                    }
                })
        })
})

module.exports = router
