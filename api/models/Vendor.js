/*
 * Mongoose Model for Vendor
 */

const mongoose = require('mongoose')

const VendorSchema = require('schemas/Vendor')

class VendorClass {
    static findVendor(site) {
        return new Promise((resolve, reject) => {
            this.findOne({ site }, (err, doc) => {
                if (err) reject(err)
                else {
                    resolve(doc._id)
                }
            })
        })

    }
}

VendorSchema.loadClass(VendorClass)


module.exports = mongoose.model('Vendor', VendorSchema)