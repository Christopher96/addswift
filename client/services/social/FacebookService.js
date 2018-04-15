import Api from '../Api'
const fbApi = Api('/social/facebook')

export default {
    loginUrl() {
        return fbApi.get('/login-url')
    },
    registerCode(code) {
        return fbApi.post('/register', { code })
    }
}