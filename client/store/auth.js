import Auth from '@/services/AuthenticationService'
import TS from '@/services/TokenService'
import axios from 'axios'

const AUTH_SUCCESS = "AUTH_SUCCESS"
const AUTH_ERROR = "AUTH_ERROR"
const AUTH_LOGOUT = "AUTH_LOGOUT"
const USER_SUCCESS = "USER_SUCCESS"

export const state = () => ({
    user: null,
    token: null,
})

export const getters = {
    isAuthenticated: state => !!state.token && state.token != 'undefined',
    user: state => state.user,
    userId: state => state.user._id || 0
}

export const mutations = {
    [AUTH_SUCCESS]: (state, token) => {
        state.user = null
        state.token = token
        TS.setToken(token)
    },
    [AUTH_ERROR]: (state) => {
        state.user = null
        state.token = null
        TS.removeToken()
    },
    [AUTH_LOGOUT]: (state) => {
        state.user = null
        state.token = null
        TS.removeToken()
    },
    [USER_SUCCESS]: (state, user) => {
        state.user = user
    }
}

export const actions = {
    checkToken({ commit }) {
        const token = TS.getToken()
        if (token) {
            commit(AUTH_SUCCESS, token)
        }
    },
    login({ commit }, creds) {
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
    socialLogin({ commit }, token) {
        commit(AUTH_SUCCESS, token)
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT)
            resolve()
        })
    },
    register({ commit, dispatch }, creds) {
        return new Promise((resolve, reject) => {
            Auth.register(creds)
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
    getUser({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            Auth.getUser()
                .then((res) => {
                    commit(USER_SUCCESS, res.data)
                    resolve(res)
                })
                .catch((err) => {
                    commit(AUTH_LOGOUT)
                    reject(err)
                })
        })
    },
}