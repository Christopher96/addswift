/*
 * Mongoose Schema for Users
 */

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [3, 'Username must be atleast 3 characters'],
        maxlength: [10, 'Username must be less than 10 characters'],
        required: 'Please enter a username',
        unique: 'Username "{VALUE}" is already taken'
    },
    password: {
        type: String,
        required: 'Please enter a password',
        minlength: [3, 'Password must be atleast 3 characters'],
        maxlength: [50, 'Password must be less than 50 characters'],
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    }
});

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

module.exports = mongoose.model('user', UserSchema)