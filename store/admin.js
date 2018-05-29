/*
 * Vuex store module for Admin services
 */

import Admin from '@/services/AdminService'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
    getUsers({ commit }) {
        return Admin.getUsers()
    },
    banUser({ commit }, userId) {
        return Admin.banUser(userId)
    },
    unbanUser({ commit }, userId) {
        return Admin.unbanUser(userId)
    }
}