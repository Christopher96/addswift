/*
 * Backend API, communicates with MongoDB through the express router
 */

// Gets express router
const express = require('express')
const router = express.Router()

// Gets mongoose plugin
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// Connects to MongoDB through public database URI or local database
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:4000/addswift'
mongoose.connect(mongoUri)

// Additional Schema types
require('mongoose-type-email')

const db = mongoose.connection

db.on('error', function(err) {
    console.log(err)
})

const User = require('models/User')

const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
            let user = new User(req.body)
            user.save()
                .then(user => signToken(user, res))
                .catch(err => res.status(400).send(err.message))
        } else {
            res.status(401).send(`User '${req.body.username}' already exists`)
        }
    })
})

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username, isSocial: false })
        .then((user) => {
            if (user.comparePassword(req.body.password)) {
                signToken(user, res)
            } else {
                res.status(401).send("Invalid username or password")
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(404).send(`User '${req.body.username}' was not found`)
        })
})

router.post('/logout', (req, res) => {

})

router.get('/user', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, auth) => {
        if (!err) {
            res.status(200).json(auth)
        } else {
            res.sendStatus(500)
        }
    })
})

router.post('/social-login', (req, res) => {
    signToken(req.body, res)
})


// Verify JWT token
function verifyToken(req, res, next) {

    // Token format
    // Authorization: Bearer <access_token>
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        req.token = bearer[1]
        next()
    } else {
        res.sendStatus(403)
    }
}

function signToken(user, res) {
    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        if (!err) res.status(200).json({ token })
        else {
            res.sendStatus(500)
        }
    })
}

module.exports = router