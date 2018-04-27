/*
 * Mongoose Model for Vendor
 */

const mongoose = require('mongoose')

const Vendor = require('schemas/Vendor')

module.exports = mongoose.model('Vendor', Vendor)