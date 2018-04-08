import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        strict: true,
        state: {
            token: null,
            user: null,
            isLoggedIn: false
        },
        mutations: {
            setToken(state, token) {
                state.token = token
                state.isLoggedIn = token != undefined
            },
            setUser(state, user) {
                state.user = user
            },
            logout(state, user) {
                state.token = null
                state.user = null
            }
        },
        actions: {
            setToken({ commit }, token) {
                commit('setToken', token)
            },
            setUser({ commit }, user) {
                commit('setUser', user)
            },
            logout({ commit }, user) {
                commit('logout', user)
            }
        }
    })
}
export default createStore