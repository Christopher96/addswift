export default function({ store }) {
    store.dispatch('auth/checkToken')
}