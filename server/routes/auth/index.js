/*
 * Routes for authenticating a user and fetching data from an authenticated user
 */

// JWT helper functions
const { verifyToken, signToken } = require('middleware/jwt')

// Gets express router
const express = require('express')
const router = express.Router()

// Gets mongoose instance
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const User = require('models/User')

// Registers a user, checks if username is available
router.post('/register', (req, res, next) => {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
            let user = new User(req.body)
            user.save()
                .then(user => {
                    req.user = user
                    next()
                })
                .catch(err => res.status(400).send(err.message))
        } else {
            res.status(401).send(`User '${req.body.username}' already exists`)
        }
    })
}, signToken)

// Logs a user in compares the plaintext password with the stored encrypted password
router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username, isSocial: false })
        .then((user) => {
            if (user.comparePassword(req.body.password)) {
                req.user = user
                next()
            } else {
                res.status(401).send("Invalid username or password")
            }
        })
        .catch((err) => {
            res.status(404).send(`User '${req.body.username}' was not found`)
        })
}, signToken)

// Optional logout logic
router.post('/logout', (req, res) => {

})

// Gets user data from the authenticated user
router.get('/user', verifyToken, (req, res) => {
    User.findById(req.authId)
        .populate("role")
        .exec((err, user) => {
            if (!err && user) {
                res.status(200).json(user)
            } else {
                console.log(err)
                res.sendStatus(500)
            }
        })
})

module.exports = router