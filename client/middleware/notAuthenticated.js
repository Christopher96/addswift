export default function({ store, redirect }) {
    console.log('asd')
    if (store.getters['auth/isAuthenticated']) {
        return redirect('/')
    }
}