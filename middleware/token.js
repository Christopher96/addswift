export default function({ store }) {
    if (!store.getters['auth/isAuthenticated']) {
        return store.dispatch('auth/checkToken')
    }
}