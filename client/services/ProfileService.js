import Api from '@/services/Api'
const Profile = Api('/profile')

export default {
    find(username) {
        return Profile.get('/' + username)
    }
}