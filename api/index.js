const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const file = require('file')
require('dotenv').config()

const app = express()
const router = express.Router()

// Dev middleware
if (!(process.env.NODE_ENV === 'production')) {
    // Log server messages
    app.use(morgan('dev'))

    // Route to generate database
    const database = require('middleware/database')
    app.use('/save', database)
}

// Parse json responses and allow requests from any domain
app.use(bodyParser.json())
app.use(cors())

// Dynamically add routes by folder structure
const routePath = path.resolve(__dirname, './routes')
file.walkSync(routePath, function(path, dirs, files) {
    const dirPath = path.replace(routePath, '').replace(/\\/g, '/')
    if (dirPath != '' && files.indexOf('index.js') != -1)
        router.use(dirPath, require(path))
})

app.use('/api', router)

const host = process.env.HOST
const port = process.env.API_PORT

// Listen the server
app.listen(port, host)
app.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
})
process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });