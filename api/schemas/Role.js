/*
 * Mongoose Schema for User roles
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const RoleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    priv: {
        type: Number,
        required: true
    },
})



module.exports = RoleSchema