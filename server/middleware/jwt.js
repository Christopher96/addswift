/*
 * Contains Middleware for JWT signing and verification
 */

const jwt = require('jsonwebtoken')

// Verify JWT token
module.exports.verifyToken = (req, res, next) => {
    // Token format
    // Authorization: Bearer <access_token>
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]

        jwt.verify(token, 'secretkey', (err, auth) => {
            if (!err && auth) {
                req.authId = auth.userId
                return next()
            } else {
                res.sendStatus(500)
            }
        })
    } else {
        res.sendStatus(403)
    }
}

module.exports.signToken = (req, res, next) => {
    if (req.user) {
        jwt.sign({ userId: req.user._id }, 'secretkey', { expiresIn: '7d' }, (err, token) => {
            if (!err && token) res.status(200).json({ token })
            else {
                res.sendStatus(500)
            }
        })
    } else {
        res.sendStatus(404)
    }
}