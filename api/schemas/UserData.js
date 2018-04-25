/*
 * Mongoose Schema for holding User data
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserDataSchema = new Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 20,
        unique: 'Username "{VALUE}" is already taken',
        required: true
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    display_name: String,
    email: String,
    telephone: Number,
    private: Boolean,

})

module.exports = UserDataSchema