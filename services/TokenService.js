/*
 * Methods for setting and removing authorization header and cookie to generated JWT token
 */

import axios from 'axios'
import * as Cookies from 'js-cookie'

export default {
    key: 'token',
    setToken(token) {
        Cookies.set(this.key, token, { expires: 3, secure: false })
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    removeToken() {
        Cookies.remove(this.key)
        delete axios.defaults.headers.common['Authorization']
    },
    getToken() {
        return Cookies.get(this.key)
    }
}