/*
 * Mongoose Schema for User
 */

const mongoose = require('mongoose')

const AccountSchema = require('./Account')
const UserDataSchema = require('./UserData')

const Email = mongoose.SchemaTypes.Email;
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    username: {
        type: String,
        min: 3,
        max: function() {
            return this.isSocial ? 100 : 20
        },
        unique: true,
        required: true
    },
    password: {
        type: String,
        min: 3,
        max: 50,
        required: function() {
            return this.isSocial ? false : true
        }
    },
    email: {
        type: Email,
        required: function() {
            return this.isSocial ? false : true
        }
    },
    isSocial: {
        type: Boolean,
        default: false
    },
    data: {
        type: UserDataSchema
    },
    accounts: [
        AccountSchema
    ],
    status: {
        type: Number,
        required: true,
        default: 1
    },
    role: {
        type: ObjectId,
        ref: 'Role',
        required: true
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