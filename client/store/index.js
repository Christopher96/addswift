import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        strict: true,
        state: {
            token: null,
            user: null,
            isLoggedIn: false,
            drawer: true
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
            },
            toggleDrawer(state) {
                state.drawer = !state.drawer
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
            },
            toggleDrawer({ commit }) {
                commit('toggleDrawer')
            }
        }
    })
}
export default createStore