/*
 * Backend API, communicates with MongoDB through the express router
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

isAdmin = (req, res, next) => {
    User.findById(req.userId)
        .populate('role')
        .exec((err, user) => {
            if (!err && user && user.role.priv > 2) {
                next()
            } else {
                res.sendStatus(403)
            }
        })
}

router.all('*', [
    verifyToken,
    isAdmin
])

router.get('/users', (req, res) => {
    User.find()
        .populate('role')
        .exec((err, users) => {
            if (!err && users) res.status(200).json(users)
            else res.sendStatus(500)
        })
})

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

router.post('/ban', (req, res, next) => {
    req.status = 0
    next()
}, setUserStatus)

router.post('/unban', (req, res, next) => {
    req.status = 1
    next()
}, setUserStatus)

module.exports = router