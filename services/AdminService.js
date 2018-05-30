/*
 * Admin service
 */

import Api from '@/services/Api'
const Admin = Api('/admin')

export default {
    getUsers() {
        return Admin.get('/users')
    },
    banUser(userId) {
        return Admin.post('/ban', { userId })
    },
    unbanUser(userId) {
        return Admin.post('/unban', { userId })
    }
}