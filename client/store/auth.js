import Auth from '@/services/AuthenticationService'
import axios from 'axios'


const setToken = (token) => {
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
const removeToken = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
}
const getToken = () => {
    return localStorage.getItem('token') || ''
}

const AUTH_REQUEST = "AUTH_REQUEST"
const AUTH_SUCCESS = "AUTH_SUCCESS"
const AUTH_ERROR = "AUTH_ERROR"
const AUTH_LOGOUT = "AUTH_LOGOUT"
const USER_SUCCESS = "USER_SUCCESS"

export const state = () => ({
    user: null,
    token: null,
    status: ''
})

export const getters = {
    isAuthenticated: state => !!state.token && state.token != 'undefined',
    authStatus: state => state.status,
}

export const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success'
        state.token = token
        setToken(token)
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
        state.token = null
        removeToken()
    },
    [AUTH_LOGOUT]: (state) => {
        Auth.removeToken()
        state.token = null
        removeToken()
    },
    [USER_SUCCESS]: (state, user) => {
        state.user = user
    }
}

export const actions = {
    init({ commit }) {
        const token = getToken()
        if (token) commit(AUTH_SUCCESS, token)
        else commit(AUTH_LOGOUT)
    },
    login({ commit, dispatch }, creds) {
        commit(AUTH_REQUEST)
        return new Promise((resolve, reject) => {
            Auth.login(creds)
                .then((res) => {
                    commit(AUTH_SUCCESS, res.data.token)
                    resolve(res)
                })
                .catch((err) => {
                    commit(AUTH_ERROR)
                    reject(err)
                })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT)
            resolve()
        })
    },
    register({ commit, dispatch }, creds) {
        commit(AUTH_REQUEST)
        return new Promise((resolve, reject) => {
            Auth.register(creds)
                .then((res) => {
                    return dispatch('login', creds)
                })
                .catch((err) => {
                    commit(AUTH_ERROR)
                    reject(err)
                })
        })
    },
    getUser({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            Auth.getUser()
                .then((res) => {
                    commit(USER_SUCCESS, res.user)
                    resolve(res)
                })
                .catch((err) => {
                    commit(AUTH_LOGOUT)
                    reject()
                })
        })
    }
}