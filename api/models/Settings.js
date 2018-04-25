/*
 * Mongoose Schema for User settings
 */

const mongoose = require('mongoose')

const SettingsSchema = new mongoose.Schema({
    display_name: String,
    email: String,
    telephone: Number,
    private: Boolean
})

module.exports = mongoose.model('Settings', SettingsSchema)