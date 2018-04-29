import TokenService from '@/services/TokenService'

export default function({ store, redirect }) {
    const token = TokenService.getToken()
    if (token) {
        store.commit('auth/AUTH_SUCCESS', token)
    }
}