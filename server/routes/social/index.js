const router = require('express').Router()

router.use('/facebook', require('./facebook'))

module.exports = router