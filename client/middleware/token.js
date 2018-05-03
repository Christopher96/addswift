export default function({ store }) {
    if (!store.getters['auth/isAuthenticated']) {
        store.dispatch('auth/checkToken')
    }
}