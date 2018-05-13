/*
 * Mongoose Model for Vendor types
 */

const mongoose = require('mongoose')

const VendorTypeSchema = require('schemas/VendorType')

const ObjectId = mongoose.Types.ObjectId

class VendorTypeClass {
    static getAllIds() {
        return new Promise((resolve, reject) => {
            this.find((err, docs) => {
                if (err) reject(err)
                else {
                    const newdocs = {}
                    docs.map(item => newdocs[item.title] = ObjectId(item.id))
                    resolve(newdocs)
                }
            })
        })

    }
}

VendorTypeSchema.loadClass(VendorTypeClass)

module.exports = mongoose.model('VendorType', VendorTypeSchema)