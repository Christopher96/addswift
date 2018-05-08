import ProfileService from '@/services/ProfileService'

export const state = () => ({
    profile: null,
    followers: null
})

export const getters = {
    profile: state => state.profile,
    profileOwner: (state, getters) => state.profile && state.profile._id == getters['auth/userId'],
    isFollowing: (state, getters) => state.followers && state.followers.filter(user => user._id == getters['auth/userId']).length == 1,
    followers: state => state.followers,
}

const PROFILE_SUCCESS = "PROFILE_SUCCESS"
const PROFILE_ERROR = "PROFILE_ERROR"
const FOLLOWERS_SUCCESS = "FOLLOWERS_SUCCESS"
const FOLLOWERS_ERROR = "FOLLOWERS_ERROR"

export const mutations = {
    [PROFILE_SUCCESS]: (state, profile) => {
        state.profile = profile
    },
    [PROFILE_ERROR]: (state) => {
        state.profile = null
    },
    [FOLLOWERS_SUCCESS]: (state, followers) => {
        state.followers = followers
    },
    [FOLLOWERS_ERROR]: (state, followers) => {
        state.followers = null
    }
}

export const actions = {
    getProfile({ commit, dispatch }, username) {
        return new Promise((resolve, reject) => {
            return ProfileService.getProfile(username)
                .then((res) => {
                    dispatch("setProfile", res.data)
                        .then(res => resolve(res.data))
                })
                .catch((err) => {
                    commit(PROFILE_ERROR)
                    reject(err)
                })
        })
    },
    setProfile({ commit, dispatch }, user) {
        commit(PROFILE_SUCCESS, user)
        return dispatch("getFollowers")
    },
    getFollowers({ commit, getters }) {
        return new Promise((resolve, reject) => {
            ProfileService.getFollowers(getters.profile._id)
                .then(res => {
                    commit(FOLLOWERS_SUCCESS, res.data)
                    resolve(res)
                })
                .catch(err => {
                    commit(FOLLOWERS_ERROR, res.data)
                    resolve(res)
                })
        })

    },
    follow({ dispatch, getters }) {
        return ProfileService.follow(getters.profile._id)
            .then(res => {
                dispatch("getFollowers")
                return res.data
            })
    },
    unfollow({ dispatch, getters }) {
        return ProfileService.unfollow(getters.profile._id)
            .then(res => {
                dispatch("getFollowers")
                return res.data
            })
    }
}