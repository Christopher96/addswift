/*
 * Mongoose Model for Accounts
 */

const mongoose = require('mongoose')

const Account = require('schemas/Account')

module.exports = mongoose.model('Account', Account)