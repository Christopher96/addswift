const router = require('express').Router()
const { FB, FacebookApiException } = require('fb');

FB.options({
    appId: '1577677152512840'
})

router.get('/login-url', (req, res) => {
    const url = FB.getLoginUrl({
    scope: 'email,user_likes',
        redirect_uri: 'http://localhost:3000/social/facebook'
    })
    if(url) return res.status(200).json({ url })
    else return res.sendStatus(500)
})

router.get('/login-redirect', (req, res) => {
    console.log(req)
})

module.exports = router