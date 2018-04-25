/*
 * Mongoose Schema for Users
 */

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    role: {
        type: ObjectId,
        ref: 'Role',
        required: true
    },
    username: {
        type: String,
        minlength: 3,
        maxlength: 20,
        unique: 'Username "{VALUE}" is already taken',
        required: true
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    accounts: [
        [Account]
    ],
    settings: [Settings],
    following: [{
        type: ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: ObjectId,
        ref: 'User'
    }],
    created: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next()

    this.encryptPassword(next)
})

UserSchema.methods = {
    comparePassword: function(plainPassword) {
        return bcrypt.compareSync(plainPassword, this.password);
    },
    encryptPassword: function(next) {
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) next(err)

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) next(err)
                this.password = hash
                next()
            })
        })
    }
}

module.exports = mongoose.model('User', UserSchema)