/*
 * Mongoose Schema for Users registered with social media
 */

const mongoose = require('mongoose')

const SocialUserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    site: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('social-user', SocialUserSchema)