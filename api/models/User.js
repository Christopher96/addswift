/*
 * Mongoose Model for User
 */

const mongoose = require('mongoose')

const UserSchema = require('schemas/User')
const Role = require('models/Role')

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10


UserSchema.pre('validate', async function(next) {

    // Set user as regular member is no role is given
    if (!this.role) {
        const schema = this
        await Role.findOne({ title: 'member' }, function(err, role) {
            if (!err) schema.role = role._id
        })
    }

    next()
})

UserSchema.pre('save', function(next) {

    // Encrypt the password if it hasn't been modified
    if (!this.isModified('password'))
        return next()

    this.encryptPassword(next)
})

UserSchema.methods = {
    comparePassword: function(plainPassword) {

        // Compare the plaintext password with hash
        return bcrypt.compareSync(plainPassword, this.password);
    },
    encryptPassword: function(next) {

        // Run encryption with salt to generate hash
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