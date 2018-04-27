const router = require('express').Router()
const { FB, FacebookApiException } = require('fb')

const User = require('models/User')
const Account = require('models/Account')

FB.options({
    appId: '1577677152512840',
    appSecret: '55afabda7af7395a49db54f04a6252df',
    redirectUri: 'http://localhost:3000/social/facebook',
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

fetchUser = (req, res, next) => {
    FB.api('/me', function(data) {
        if (data && data.error) {
            if (data.error.code === 'ETIMEDOUT') {
                return res.status(408).send('request timeout')
            } else {
                return res.status(403).send(data.error)
            }
        } else {
            req.data = data
            next()
        }
    })
}

createUser = (req, res, next) => {
    const user = new User({
        isSocial: true,
        username: "facebook." + req.data.id,
        data: {
            displayName: req.data.name
        }
    })



    const account = new Account({
        token: FB.options('accessToken')
    })


    user.save().then(next)
        .catch((err) => {
            res.status(500).send(err)
        })
}

router.use('/register', getToken, fetchUser, createUser)
router.post('/register', (req, res) => {
    res.send(200).json(req.user)
})

module.exports = router