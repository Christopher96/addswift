/*
 * Mongoose Schema for holding User data
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserDataSchema = new Schema({
    displayName: {
        type: String,
        default: this.username
    },
    telephone: Number,
    address: String,
    private: Boolean,

})

module.exports = UserDataSchema