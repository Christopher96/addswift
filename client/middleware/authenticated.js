export default function({ store, redirect }) {
    if (!store.getters['auth/isAuthenticated']) {
        return redirect('/login')
    } else {
        if (!store.getters['auth/user']) {
            return store.dispatch('auth/getUser')
        }
    }
}