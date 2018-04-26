/*
 * Mongoose Model for Role
 */

const mongoose = require('mongoose')

const RoleSchema = require('schemas/Role')

module.exports = mongoose.model('Role', RoleSchema)