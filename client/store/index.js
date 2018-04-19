import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        strict: true,
        state: {
            user: null,
            drawer: true
        },
        mutations: {
            setUser(state, user) {
                state.user = user
            },
            logout(state, user) {
                state.user = null
            },
            toggleDrawer(state) {
                state.drawer = !state.drawer
            }
        },
        actions: {}
    })
}
export default createStore