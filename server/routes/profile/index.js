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

router.get('/:username', (req, res) => {
    const username = req.params.username
    User.findOne({ username })
        .then(user => {
            if (res.isPrivate) {
                return res.status(401).send(`Profile ${res.username} is private`)
            }

            return res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            return res.sendStatus(404)
        })
})

module.exports = router