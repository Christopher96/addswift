/*
 * Mongoose Model for Role
 */

const mongoose = require('mongoose')

const RoleSchema = require('schemas/Role')

class RoleClass {
    static findRole(title) {
        return new Promise((resolve, reject) => {
            this.findOne({ title }, (err, doc) => {
                if (err) reject(err)
                else {
                    resolve(doc._id)
                }
            })
        })

    }
}

RoleSchema.loadClass(RoleClass)

module.exports = mongoose.model('Role', RoleSchema)