/*
 * Mongoose Schema for holding User data
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserDataSchema = new Schema({
    display_name: {
        type: String,
        default: this.username
    },
    telephone: Number,
    private: Boolean,

})

module.exports = UserDataSchema