/*
 * Mongoose Schema for Vendor
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const VendorSchema = new Schema({
    vendorType: {
        type: ObjectId,
        ref: 'VendorType',
        required: true
    },
    site: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = VendorSchema