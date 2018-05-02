module.exports = (req, res) => {
    const VendorType = require('models/VendorType')

    VendorType.insertMany([
        { title: 'Social' },
        { title: 'Music' },
        { title: 'Games' },
        { title: 'Business' }
    ], { ordered: true }, (err, docs) => {
        // if (err) console.log(err)
    })

    const Vendor = require('models/Vendor')

    VendorType.getAllIds()
        .then((vendorTypes) => {
            Vendor.insertMany([
                { title: 'Facebook', site: 'facebook', color: "#4267B2", vendorType: vendorTypes.Social },
                { title: 'Twitter', site: 'twitter', color: "#4267B2", vendorType: vendorTypes.Social },
                { title: 'Google +', site: 'google-plus', color: "#1DA1F2", vendorType: vendorTypes.Social },
            ], { ordered: true }, (err, docs) => {
                // if (err) console.log(err)
            })
        })
        .catch(err => console.log(err))

    const Role = require('models/Role')

    Role.insertMany([
        { title: 'Member', priv: 1 },
        { title: 'Subscriber', priv: 2 },
        { title: 'Admin', priv: 3 },
    ], { ordered: true }, (err, docs) => {
        // if (err) console.log(err)
    })

    res.sendStatus(200)
}