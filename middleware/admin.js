/*
 * Checks whether a user is admin and redirects to startpage if not
 */

export default function({ store, redirect }) {
    if (!store.getters['auth/isAdmin']) {
        return redirect('/')
    }
}