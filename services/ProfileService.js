/*
 * Profile service
 */

import Api from '@/services/Api'
const Profile = Api('/profile')

export default {
    getProfile(username) {
        return Profile.get('/' + username)
    },
    getFollowers(userId) {
        return Profile.post('/followers', { userId })
    },
    follow(userId) {
        return Profile.post('/follow', { userId })
    },
    unfollow(userId) {
        return Profile.post('/unfollow', { userId })
    }
}