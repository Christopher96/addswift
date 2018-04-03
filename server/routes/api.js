/*
 * Backend API, communicates with MongoDB through the express router
 */

// Gets express router
import express from 'express'
var router = express.Router()

// Gets mongoose plugin
import mongoose from 'mongoose'
const ObjectId = require('mongoose').Types.ObjectId

// Connects to MongoDB through public database URI or local database
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:4000/addswift'
mongoose.connect(mongoUri)

// Transform errors from mongoose to a more human readable format
const mongooseValidationErrorTransform = require('mongoose-validation-error-transform');
mongoose.plugin(mongooseValidationErrorTransform);

var db = mongoose.connection

db.on('error', function(err) {
    console.log(err)
})

var User = require('../models/User')

router.post('/register', (req, res) => {
    let user = new User(req.body)
    user.save((err, user) => {
        if (err)
            return res.status(400).send(err)
        return res.status(200).json(user)
    })

    return res.status(500).send()
})

module.exports = router