/*
 * Mongoose Schema for holding data for accounts
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AccountDataSchema = new Schema({
    account_url: String,
    image_url: String,
    username: String,
    description: String,
    followers: Number,
    following: Number,
    friends: Number
})

module.exports = AccountDataSchema