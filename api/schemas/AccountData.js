/*
 * Mongoose Schema for holding account data
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AccountDataSchema = new Schema({
    accountUrl: String,
    imageUrl: String,
    username: String,
    description: String,
    followers: Number,
    following: Number,
    friends: Number
})

module.exports = AccountDataSchema