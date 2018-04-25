/*
 * Mongoose Model for Role
 */

const mongoose = require('mongoose')

const Role = require('schemas/Role')

module.exports = mongoose.model('Role', Role)