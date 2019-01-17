import userApi from '@/api/user'

// initial state
const state = {
    invite_code: ''
}

// getters
const getters = {}

// actions
const actions = {
    getInviteCode({commit}) {
        userApi.getInviteCode().then(res => {
            if (Number(res.status) !== 1) return
            console.log(res)
            commit('setInviteCode', res.data.invite_code)
        })
    }
}

// mutations
const mutations = {
    setInviteCode(state, inviteCode) {
        console.log('invite_code', inviteCode)
        state.invite_code = inviteCode
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
