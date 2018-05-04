import Api from '@/services/Api'
const Profile = Api('/profile')

export default {
    getProfile(username) {
        return Profile.get('/' + username)
    },
    follow(userId) {
        return Profile.post('/follow', { userId })
    },
    unfollow(userId) {
        console.log(userId)
        return Profile.post('/unfollow', { userId })
    }
}