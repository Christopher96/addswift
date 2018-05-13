/*
 * Mongoose Schema for storing User settings
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSettingsSchema = new Schema({
    private: Boolean,
    theme: String
})

module.exports = UserSettingsSchema