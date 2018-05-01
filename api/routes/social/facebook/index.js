const { signToken } = require('utils/jwt')
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
    if (req.pass)
        return next()
    if (!options) options = {}
    FB.api(path, options, function(data) {
        if (data.error) {
            if (data.error.code === 'ETIMEDOUT') {
                return res.status(408).send(path + ': request timeout')
            } else {
                console.log(data.error)
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
        User.findOne({ username }, (err, user) => {
            if (!err && user) {
                req.pass = true
                req.user = user
            }
            req.data.username = username

            return next()
        })
    } else {
        res.sendStatus(500)
    }
}

findVendor = (req, res, next) => {
    Vendor.findVendor('facebook')
        .then(vendor => {
            req.data.vendor = vendor
            return next()
        })
        .catch(err => console.log(err))
}

createUser = (req, res, next) => {
    if (req.pass)
        return next()

    const data = req.data

    const account = new Account({
        vendor: data.vendor._id,
        data: {
            accountUrl: data['/me'].link,
            imageUrl: data['/me/picture'].url,
            name: data['/me'].name
        }
    })

    const user = new User({
        isSocial: true,
        username: data.username,
        data: {
            displayName: data['/me'].name,
        }
    })

    user.accounts.push(account)

    user.save()
        .then(user => {
            console.log(user)
            req.user = user
            next()
        })
        .catch((err) => {
            console.log(err)
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
    findVendor,
    createUser,
    signToken
]

router.use('/register', registerMiddleware)

module.exports = router