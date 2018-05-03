/*
 * Mongoose Model for Role
 */

const mongoose = require('mongoose')

const RoleSchema = require('schemas/Role')

const ObjectId = mongoose.Types.ObjectId

class RoleClass {
    static findRole(title) {
        return new Promise((resolve, reject) => {
            this.findOne({ title }, (err, doc) => {
                if (!err && doc) resolve(doc._id)
                else reject(err)
            })
        })
    }
}

RoleSchema.loadClass(RoleClass)

module.exports = mongoose.model('Role', RoleSchema)