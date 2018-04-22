import Auth from '@/services/AuthenticationService'

export const state = () => ({
    user: null,
    token: localStorage.getItem('token') || '',
    status: ''
})

export const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
}

const AUTH_REQUEST = "AUTH_REQUEST"
const AUTH_SUCCESS = "AUTH_SUCCESS"
const AUTH_ERROR = "AUTH_ERROR"
const AUTH_LOGOUT = "AUTH_LOGOUT"
const USER_REQUEST = "USER_REQUEST"

export const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success'
        state.token = token
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    },
    [AUTH_LOGOUT]: (state) => {
        state.status = 'success'
    }, 
    [USER_REQUEST]: (state, user) => {
        state.user = user
    }
}

export const actions = {
    login({ commit, dispatch }, creds) {
        commit(AUTH_REQUEST); 
        return Auth.login(creds)
        .then((res) => {
            localStorage.setItem('token', res.token)
            commit(AUTH_SUCCESS, res.token)
            dispatch('getUser')
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('token')
            commit(AUTH_LOGOUT)
            resolve()
        })
    },
    register({ commit }, creds) {
        commit(AUTH_REQUEST)
        return Auth.register(creds)
        .then((res) => {
            localStorage.setItem('token', token)
            commit(AUTH_SUCCESS, res.token)
        })
    },
    getUser({ commit }) {
        return Auth.getUser()
        .then((res) => {
            commit(USER_REQUEST, res.user)
        })
    }
}
