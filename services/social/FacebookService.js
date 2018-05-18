import Api from '../Api'
const FB = Api('/social/facebook')

export default {
    loginUrl() {
        return FB.get('/login-url')
    },
    register(code) {
        return FB.post('/register', { code })
    }
}