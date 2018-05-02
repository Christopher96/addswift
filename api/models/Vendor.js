/*
 * Mongoose Model for Vendor
 */

const mongoose = require('mongoose')

const VendorSchema = require('schemas/Vendor')

module.exports = mongoose.model('Vendor', VendorSchema)