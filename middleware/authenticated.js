/*
 * Checks whether a user is authenticated and redirects to login if not
 */

export default function({ store, redirect }) {
    if (!store.getters['auth/isAuthenticated']) {
        return redirect('/login')
    }
}