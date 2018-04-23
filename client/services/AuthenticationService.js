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
    },
    setToken(token) {
        localStorage.setItem('token', token)
        Auth.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    removeToken() {
        localStorage.removeItem('token')
        delete Auth.defaults.headers.common['Authorization']
    },
    getToken() {
        return localStorage.getItem('token') || ''
    }
}