const express = require('express')
const { Nuxt, Builder } = require('nuxt')
require('dotenv').config()

const app = express()

const host = process.env.HOST
const port = process.env.PORT

console.log(host)
console.log(port)

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {

    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    app.on('listening', function() {
        console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    })
}

start()