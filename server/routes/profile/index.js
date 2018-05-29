/*
 * Routes related to profile activites like following/unfollowing profiles
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

// Finds the profile of searched or authenticated user
findProfile = (req, res, next) => {
    let query = {}
    if (req.params.username) query.username = req.params.username
    if (req.body.userId) query._id = req.body.userId

    User.findOne(query)
        .populate("accounts.vendor")
        .populate("role")
        .exec((err, user) => {
            if (!err && user) {
                if (user.isPrivate) {
                    return res.status(401).send(`User ${user.username} profile is private`)
                }
                if (user.status == 0) {
                    return res.status(401).send(`User ${user.username} is banned`)
                }
                req.user = user
                next()
            } else {
                return res.status(404).send(`User ${query.username} was not found.`)
            }
        })
}

// Dynamic route for finding profiles by username
router.get('/:username',
    findProfile,
    (req, res) => {
        return res.status(200).json(req.user)
    }
)

// Follow route, adding the authenticated user to the follow list of target profile
router.post('/follow',
    verifyToken,
    findProfile,
    (req, res) => {
        const user = req.user

        if (user._id != req.authId && user.followers.filter(id => id == req.authId).length < 1) {
            user.followers.push(req.authId)
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

//  Unfollow route, removing the authenticated user from the follow list of target profile
router.post('/unfollow',
    verifyToken,
    findProfile,
    (req, res) => {
        const user = req.user

        if (user._id != req.authId && user.followers.filter(id => id == req.authId).length > 0) {
            user.followers.splice(user.followers.indexOf(req.authId), 1)
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

// Gets all followers of the target profile, populating necessary data
router.post('/followers', (req, res) => {
    User.findById(req.body.userId)
        .populate('followers', '_id picture name username')
        .exec((err, user) => {
            if (!err && user) res.status(200).json(user.followers)
            else res.sendStatus(500)
        })
})

module.exports = router