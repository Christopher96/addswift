export default function({ store, redirect }) {
    console.log("authenticated")
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