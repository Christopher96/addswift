/*
 * Mongoose Schema for social media accounts
 */

const mongoose = require('mongoose')

const AccountDataSchema = require('./AccountData')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AccountSchema = new Schema({
    vendor: {
        type: ObjectId,
        ref: 'Vendor',
        required: true
    },
    data: {
        type: AccountDataSchema,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = AccountSchema