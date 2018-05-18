import Api from '@/services/Api'
const Auth = Api('/auth')

export default {
    register(creds) {
        return Auth.post('/register', creds)
    },
    login(creds) {
        return Auth.post('/login', creds)
    },
    socialLogin(creds) {
        return Auth.post('/social-login', creds)
    },
    getUser() {
        return Auth.get('/user')
    }
}