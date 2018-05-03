export default function({ store }) {
    console.log("token")
    if (!store.getters['auth/isAuthenticated']) {
        return store.dispatch('auth/checkToken')
    }
}