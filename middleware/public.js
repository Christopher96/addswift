/*
 * Checks whether a user is Authenticated and fetches user data if there is none
 */

export default function({ store, redirect }) {
    if (store.getters['auth/isAuthenticated']) {
        if (!store.getters['auth/user']) {
            return store.dispatch('auth/getUser')
        }
    }
}