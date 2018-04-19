const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const file = require('file')

const app = express()
const router = express.Router()

// Log server messages
app.use(morgan('dev'))

// Parse json responses and allow requests from any domain
app.use(bodyParser.json())
app.use(cors())

app.use('/auth', require('./routes/auth'))
    // Dynamically add routes by folder structure
    // const routePath = path.resolve(__dirname, './routes')
    // file.walkSync(routePath, function(path, dirs, files) {
    //     const dirPath = path.replace(routePath, '')
    //     console.log(dirPath)
    //     if (dirPath != '' && files.indexOf('index.js') != -1)
    //         router.use(dirPath, require(path))
    // })

module.exports = router