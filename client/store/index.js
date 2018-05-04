import ProfileService from '@/services/ProfileService'

export const state = () => ({
    profile: null,
})

export const getters = {
    profile: state => state.profile,
    profileOwner: (state, getters) => state.profile._id == getters['auth/userId'],
    isFollowing: (state, getters) => state.profile.followers.filter(id => id == getters['auth/userId']).length == 1
}

const PROFILE_SUCCESS = "PROFILE_SUCCESS"
const PROFILE_ERROR = "PROFILE_ERROR"
const FOLLOWERS_UPDATE = "FOLLOWERS_UPDATE"

export const mutations = {
    [PROFILE_SUCCESS]: (state, profile) => {
        state.profile = profile
    },
    [PROFILE_ERROR]: (state) => {
        state.profile = null
    },
    [FOLLOWERS_UPDATE]: (state, followers) => {
        state.profile.followers = followers
    }
}

export const actions = {
    getProfile({ commit }, username) {
        return new Promise((resolve, reject) => {
            ProfileService.getProfile(username)
                .then((res) => {
                    console.log(res.data)
                    commit(PROFILE_SUCCESS, res.data)
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err)
                    commit(PROFILE_ERROR)
                    reject(err)
                })
        })
    },
    setProfile({ commit }, user) {
        commit(PROFILE_SUCCESS, user)
    },
    follow({ commit, getters }) {
        return ProfileService.follow(getters.profile._id)
            .then(res => {
                console.log(res)
                commit(FOLLOWERS_UPDATE, res.data)
            })
    },
    unfollow({ commit, getters }) {
        return ProfileService.unfollow(getters.profile._id)
            .then(res => {
                console.log(res)
                commit(FOLLOWERS_UPDATE, res.data)
            })
    }
}