/*
 * Routes related to profile activites like following/unfollowing profiles
 */

// Defines required modules
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const file = require('file')

const { Nuxt, Builder } = require('nuxt')

// Get express and the router
const app = express()
const router = express.Router()

// Get the mongoose instance
const mongoose = require('mongoose')

// Connects to MongoDB through public database URI or local database
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:4000/addswift'
mongoose.connect(mongoUri)

// Automatically add modified field
mongoose.plugin(require('plugins/modified'))

// Check for DB errors
const db = mongoose.connection
db.on('error', function(err) {
    console.log(err)
})

// Set host and port to environment variables or default values
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '8080'

// Parse json responses and allow requests from any domain
app.use(bodyParser.json())
app.use(cors())

let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    // Dev middleware
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()

        // Route to generate database
        const database = require('middleware/database')
        app.use('/save', database)

        // Log server messages
        app.use(morgan('dev'))
    }

    // Dynamically add routes by folder structure accesible through the API router
    const routePath = path.resolve(__dirname, './routes')
    file.walkSync(routePath, function(path, dirs, files) {
        const dirPath = path.replace(routePath, '').replace(/\\/g, '/')
        if (dirPath != '' && files.indexOf('index.js') != -1)
            router.use(dirPath, require(path))
    })

    // Add the routes for the Nuxt frontend and API router
    app.use('/api', router)
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    app.on('listening', function() {
        console.log('Express server started on port %s at %s', server.address().port, server.address().address)
    })

    // Exit properly on CTRL-C
    process.on('SIGINT', () => {
        console.log("Bye bye!")
        process.exit()
    })
}

start()