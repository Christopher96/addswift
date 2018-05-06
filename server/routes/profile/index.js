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


findProfile = (req, res, next) => {
    let query = {}
    if (req.params.username) query.username = req.params.username
    if (req.body.userId) query._id = req.body.userId

    User.findOne(query, (err, user) => {
        if (!err && user) {
            if (user.isPrivate) {
                return res.status(401).send(`Profile ${user.username} is private`)
            }

            req.user = user
            next()
        } else {
            return res.sendStatus(404)
        }
    })
}

router.get('/:username',
    findProfile,
    (req, res) => {
        req.user
        return res.status(200).json(req.user)
    }
)

router.post('/follow',
    verifyToken,
    findProfile,
    (req, res) => {
        const user = req.user

        if (user.followers.filter(id => id == req.userId).length < 1) {
            user.followers.push(req.userId)
            user.save()
                .then(user => {
                    return res.status(200).json(user.followers)
                })
                .catch(err => res.status(400).send(err.message))
        } else {
            res.status(202).json(user)
        }
    }
)
router.post('/unfollow',
    verifyToken,
    findProfile,
    (req, res) => {
        const user = req.user

        if (user.followers.filter(id => id == req.userId).length > 0) {
            user.followers.splice(user.followers.indexOf(req.userId), 1)
            user.save()
                .then(user => {
                    return res.status(200).json(user.followers)
                })
                .catch(err => res.status(400).send(err.message))
        } else {
            res.status(202).json(user)
        }
    }
)

router.get('/followers', (req, res) => {
    User.findById(req.userId)
    .populate('followers', '_id picture name username')
    .exec((err, user) => {
        if(!err && user) res.status(200).json(user.followers)        
        else res.sendStatus(500)
    })
})

module.exports = router