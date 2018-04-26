import axios from 'axios'

export default {
    setToken(token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    removeToken() {
        delete axios.defaults.headers.common['Authorization']
    }
}