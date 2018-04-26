import axios from 'axios'
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
    },
    setToken(token) {
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    removeToken() {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
    },
    getToken() {
        return localStorage.getItem('token') || ''
    }
}