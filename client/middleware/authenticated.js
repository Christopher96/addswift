export default function({ store, redirect }) {
    console.log(store.state.auth.token)
    if (!store.getters['auth/isAuthenticated']) {
        return redirect('/login')
    }
}