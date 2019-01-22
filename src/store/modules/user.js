import {UserApi} from '@/api'

// initial state
const state = {
    invite_code: '',
    address: '0x8923kjKJhkjh9879827ufiywiyri2987yhiu',
    balance: {
        ETH: 0,
        INC: 0,
    }
}

// getters
const getters = {}

// actions
const actions = {
    getInviteCode({commit}) {
        UserApi.getInviteCode().then(res => {
            if (Number(res.status) !== 1) return
            // console.log(res)
            commit('setInviteCode', res.data.invite_code)
        })
    },
    getBalance({commit}) {
        UserApi.getBalance().then(balance => {
            commit('setBalance', balance)
        })
    },
    getAddress({commit}) {
        UserApi.getWalletAddress().then(res => {
            if (Number(res.status) !== 1) return

            commit('setBalance', res.data.address)
        })
    }
}

// mutations
const mutations = {
    setInviteCode(state, inviteCode) {
        // console.log('invite_code', inviteCode)
        state.invite_code = inviteCode
    },
    setBalance(state, balance) {
        // console.log('balance', balance)
        state.balance = balance
    },
    setAddress(state, address) {
        console.log('balance', address)
        state.address = address
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
