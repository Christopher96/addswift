import ProfileService from '@/services/ProfileService'

export const state = () => ({
    profile: null,
})

export const getters = {
    profile: state => state.profile
}

const PROFILE_SUCCESS = "PROFILE_SUCCESS"
const PROFILE_ERROR = "PROFILE_ERROR"

export const mutations = {
    [PROFILE_SUCCESS]: (state, profile) => {
        state.profile = profile
    },
    [PROFILE_ERROR]: (state) => {
        state.profile = null
    }
}

export const actions = {
    getProfile({ commit }, username) {
        return new Promise((resolve, reject) => {
            ProfileService.find(username)
                .then((res) => {
                    commit(PROFILE_SUCCESS, res.data)
                    resolve(res)
                })
                .catch((err) => {
                    commit(PROFILE_ERROR)
                    reject(err)
                })
        })
    },
    setProfile({ commit }, user) {
        commit(PROFILE_SUCCESS, user)
    }

}