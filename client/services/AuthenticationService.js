import Api from '@/services/Api'
const Auth = Api('/auth')

export default {
    register(credentials) {
        return Auth.post('/register', credentials)
    },
    login(credentials) {
        return Auth.post('/login', credentials)
    },
    socialLogin(credentials) {
        return Auth.post('/social-login', credentials)
    },
    getUser() {
        return Auth.get('/user')
    }
}