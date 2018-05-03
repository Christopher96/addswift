export default function({ store, redirect }) {
    if (store.getters['auth/isAuthenticated']) {
        if (!store.getters['auth/user']) {
            return store.dispatch('auth/getUser')
                .catch(() => {
                    return redirect('/login')
                })
        }
    } else {
        return redirect('/login')
    }
}