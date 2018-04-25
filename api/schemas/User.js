/*
 * Mongoose Schema for User
 */

const mongoose = require('mongoose')

const AccountSchema = require('./Account')
const UserDataSchema = require('./UserData')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    role: {
        type: ObjectId,
        ref: 'Role',
        required: true
    },
    data: {
        type: [UserDataSchema],
        required: true
    },
    accounts: [
        [AccountSchema]
    ],
    status: {
        type: Number,
        required: true,
        default: 1
    },
    following: [{
        type: ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: ObjectId,
        ref: 'User'
    }],
    created: {
        type: Date,
        default: Date.now
    }
})


module.exports = UserSchema