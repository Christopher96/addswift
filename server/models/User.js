/*
 * Mongoose Schema for Users
 */

var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Please enter',
        unique: true
    },
    password: {
        type: String,
        required: 'Please enter'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(uniqueValidator);
var UserData = mongoose.model('user', userSchema);


module.exports = UserData;