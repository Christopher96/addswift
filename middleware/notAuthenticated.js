/*
 * Checks whether a user is authenticated and redirects to startpage if they are
 */

export default function({ store, redirect }) {
    if (store.getters['auth/isAuthenticated']) {
        return redirect('/')
    }
}