/*
 * Admin routes, contains routes for generating a list of users and banning/unbanning
 */

// JWT helper functions
const { verifyToken } = require('middleware/jwt')

// Gets express router
const express = require('express')
const router = express.Router()

// Gets mongoose plugin
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const User = require('models/User')

// Adds JWT and admin middleware to all subroutes
router.all('*', [
    verifyToken,
    isAdmin
])

// Checks if authenticated user is admin (role privlege > 2)
isAdmin = (req, res, next) => {
    User.findById(req.authId)
        .populate('role')
        .exec((err, user) => {
            if (!err && user && user.role.priv > 2) {
                next()
            } else {
                res.sendStatus(403)
            }
        })
}

// Gets a list of users with their role
router.get('/users', (req, res) => {
    User.find()
        .populate('role')
        .exec((err, users) => {
            if (!err && users) res.status(200).json(users)
            else res.sendStatus(500)
        })
})

// Changes a users status to given parameter
setUserStatus = (req, res, next) => {
    User.findById(req.body.userId)
        .exec((err, user) => {
            if (!err && user) {
                user.status = req.status
                user.save()
                    .then(user => {
                        return res.status(200).json({ status: req.status })
                    })
                    .catch(err => {
                        return res.sendStatus(500)
                    })
            } else {
                return res.sendStatus(404)
            }
        })
}

// Routes for banning and unbanning users
router.post('/ban', (req, res, next) => {
    req.status = 0
    next()
}, setUserStatus)

router.post('/unban', (req, res, next) => {
    req.status = 1
    next()
}, setUserStatus)

module.exports = router