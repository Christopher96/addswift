/*
 * Mongoose Schema for Vendor types
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const VendorTypeSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
})

module.exports = VendorTypeSchema