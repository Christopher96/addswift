/*
 * Mongoose Schema for Users
 */

const mongoose = ('mongoose')
const bcrypt = ('bcrypt')
const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 10,
        unique: 'Username "{VALUE}" is already taken',
        required: true
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
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