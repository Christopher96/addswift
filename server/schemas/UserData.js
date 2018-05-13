/*
 * Mongoose Schema for holding User data
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserDataSchema = new Schema({
    phone: Number,
    address: String,
    email: String,
    username: String
})

module.exports = UserDataSchema