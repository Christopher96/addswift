const router = require('express').Router()
const { FB, FacebookApiException } = require('fb');

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

router.post('/token', (req, res) => {
    FB.api('oauth/access_token', {
        client_id: FB.options('appId'),
        client_secret: FB.options('appSecret'),
        redirect_uri: FB.options('redirectUri'),
        code: req.body.code,
    }, function(data) {
        if (!data || data.error) {
            return res.status(400).send(!data ? 'error occurred' : data.error);
        }

        var accessToken = data.access_token;
        var expires = data.expires ? data.expires : 0;
        return res.status(200).json({
            accessToken,
            expires
        })
    });
})

module.exports = router