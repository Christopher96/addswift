import Api from '../Api'
const fbApi = Api('/social/facebook')

export default {
    loginWindow() {
        return fbApi.get('/login-url')
    },
    getToken(code) {
        return fbApi.post('/token', { code })
    }
}