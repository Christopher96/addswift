import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export default ({ store }) => {
    createPersistedState({
        storage: {
            getItem: key => {
                const state = Cookies.get(key)
                const jsonState = JSON.parse(state)
                if (jsonState.auth.token) {
                    store.commit('auth/AUTH_SUCCESS', jsonState.auth.token)
                }
                return state
            },
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
            removeItem: key => Cookies.remove(key)
        }
    })(store)
}