/*
 * Checks for a token in web browser if user is not authenticated
 */

export default function({ store }) {
    if (!store.getters['auth/isAuthenticated']) {
        return store.dispatch('auth/checkToken')
    }
}