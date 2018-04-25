/*
 * Mongoose Schema for social media accounts
 */

const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    vendor: {
        type: ObjectId,
        ref: 'Vendor',
        required: true
    },
    data: [AccountData],
    created: {
        type: Date,
        default: Date.now
    },
    telephone: Number,
    private: Boolean
})

module.exports = mongoose.model('Settings', SettingsSchema)