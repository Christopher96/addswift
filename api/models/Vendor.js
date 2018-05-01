/*
 * Mongoose Model for Vendor
 */

const mongoose = require('mongoose')

const VendorSchema = require('schemas/Vendor')

class VendorClass {
    static findVendor(site) {
        return new Promise((resolve, reject) => {
            this.findOne({ site }, (err, doc) => {
                if (!err && doc) return resolve(doc)
                else return reject(err)
            })
        })
    }
}

VendorSchema.loadClass(VendorClass)


module.exports = mongoose.model('Vendor', VendorSchema)