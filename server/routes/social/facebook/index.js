const { signToken } = require('middleware/jwt')
const router = require('express').Router()
const { FB, FacebookApiException } = require('fb')

const User = require('models/User')
const Vendor = require('models/Vendor')
const Account = require('models/Account')

let url = process.env.NODE_ENV == 'development' ? 'http://localhost:8080' : process.env.BASE_URL

FB.options({
    appId: '1441079792571218',
    appSecret: 'fecfb60fa8c53ab6eddb682246cb9a91',
    redirectUri: url + '/social/facebook',
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
            return res.status(400).send(!data ? 'error occurred' : data.error)
        } else {
            if (!req.data) req.data = {}
            if (!req.data[path]) req.data[path] = {}
            req.data[path] = {
                ...req.data[path],
                ...data
            }
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
    Vendor.findOne({ site: 'facebook' }, (err, doc) => {
        if (!err && doc) {
            req.data.vendor = doc
            return next()
        }
        console.log("No vendor found")
    })
}

createUser = (req, res, next) => {
    if (req.pass)
        return next()


    const data = req.data

    console.log(data['/me'])

    const account = new Account({
        vendor: data.vendor._id,
        data: {
            link: data['/me'].link,
            picture: data['/me/picture'].data.url,
            name: data['/me'].name
        }
    })

    const user = new User({
        isSocial: true,
        username: data.username,
        picture: data['/me/picture'].data.url,
        cover: data['/me'].cover.source,
        data: {
            email: data['/me'].email,
            name: data['/me'].name
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
        "fields": 'id'
    }),
    checkUser,
    findVendor,
    fetchData('/me/picture', {
        "type": 'large',
        "redirect": false
    }),
    fetchData('/me', {
        "fields": 'link,name,cover,address,email'
    }),
    createUser,
    signToken
]

router.use('/register', registerMiddleware)

module.exports = router