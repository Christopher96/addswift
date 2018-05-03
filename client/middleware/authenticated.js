export default async function({ store, redirect }) {
    if (store.getters['auth/isAuthenticated']) {
        if (!store.getters['auth/user']) {
            await store.dispatch('auth/getUser')
                .catch(() => {
                    return redirect('/login')
                })
        }
    } else {
        return redirect('/login')
    }
}