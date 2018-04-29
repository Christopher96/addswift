const router = require('express').Router()
const { FB, FacebookApiException } = require('fb')

const User = require('models/User')
const Vendor = require('models/Vendor')
const Account = require('models/Account')

const host = process.env.HOST
const port = process.env.PORT

FB.options({
    appId: '1577677152512840',
    appSecret: '55afabda7af7395a49db54f04a6252df',
    redirectUri: 'http://' + host + ':' + port + '/social/facebook',
})

router.get('/login-url', (req, res) => {
    const url = FB.getLoginUrl({
        scope: 'email,user_likes'
    })
    if (!url) res.sendStatus(500)

    return res.status(200).json({ url })

})

getToken = (req, res, next) => {
    FB.api('oauth/access_token', {
        client_id: FB.options('appId'),
        client_secret: FB.options('appSecret'),
        redirect_uri: FB.options('redirectUri'),
        code: req.body.code,
    }, function(data) {
        if (!data || data.error) {
            return res.status(400).send(!data ? 'error occurred' : data.error)
        }

        var token = data.access_token
        var expires = data.expires ? data.expires : 0
        FB.options({ timeout: expires, accessToken: token })

        next()
    })
}

fetchData = (path, options) => (req, res, next) => {
    if (req.exists)
        return next()
    if (!options) options = {}
    FB.api(path, options, function(data) {
        if (data.error) {
            if (data.error.code === 'ETIMEDOUT') {
                return res.status(408).send(path + ': request timeout')
            } else {
                return res.status(403).send(data.error)
            }
        } else {
            if (!req.data) req.data = {}
            if (data.data) data = data.data
            req.data[path] = data
            next()
        }
    })
}

checkUser = (req, res, next) => {
    if (req.data['/me'].id) {
        const username = "facebook." + req.data['/me'].id
        User.findOne({ username })
            .then(user => {
                req.exists = true
                req.user = user
            })
            .then(next)
    } else {
        res.sendStatus(500)
    }
}

createUser = (req, res, next) => {
    if (req.exists)
        return next()

    const data = req.data

    const account = new Account({
        vendor: Vendor.findVendor('facebook'),
        data: {
            accountUrl: data['/me'].link,
            imageUrl: data['/me/picture'].url
        }
    })

    const user = new User({
        isSocial: true,
        username: "facebook." + req.data['/me'].id,
        data: {
            displayName: data['/me'].name,
        }
    })

    user.save().then(next)
        .catch((err) => {
            res.status(500).send(err)
        })
}

const registerMiddleware = [
    getToken,
    fetchData('/me', {
        "fields": 'id,name,link'
    }),
    checkUser,
    fetchData('/me/picture', {
        "redirect": false,
        "type": "large",
    }),
    createUser
]

router.use('/register', registerMiddleware, (req, res) => {
    res.status(200).json(req.user)
})

module.exports = router