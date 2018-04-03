const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const api = require('./routes/api');

const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3001

app.set('port', port)

// Log server messages
app.use(morgan('dev'))

// Parse json responses and allow requests from any domain
app.use(bodyParser.json())
app.use(cors())

// Attach API route
app.use('/api', api);

// Listen the server
app.listen(port, host)
app.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
})