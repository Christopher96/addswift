import Auth from '@/services/AuthenticationService'

export const state = () => ({
    user: null,
    token: localStorage.getItem('token') || '',
    status: ''
})

export const getters = {
    isAuthenticated: state => !!state.token && state.token != 'undefined',
    authStatus: state => state.status,
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
    [USER_REQUEST]: (state, user) => {
        state.user = user
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        console.log('init')
    },
    login({ commit, dispatch }, creds) {
        commit(AUTH_REQUEST)
        return new Promise((resolve, reject) => {
            Auth.login(creds)
                .then((res) => {
                    const token = res.data.token
                    Auth.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                    localStorage.setItem('token', token)
                    commit(AUTH_SUCCESS, token)
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
            delete Auth.axios.defaults.headers.common['Authorization']
            localStorage.removeItem('token')
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
                    commit(USER_REQUEST, res.user)
                    resolve(res)
                })
                .catch((err) => {
                    delete Auth.axios.defaults.headers.common['Authorization']
                    localStorage.removeItem('token')
                    reject()
                })
        })
    }
}