import BalanceApi from '@/api/balance'

// initial state
const state = {
    ETH: 0,
    INC: 0
}

// getters
const getters = {}

// actions
const actions = {
    getBalance({commit}) {
        BalanceApi.getBalance().then(balance => {
            commit('setBalance', balance)
        })
    }
}

// mutations
const mutations = {
    setBalance(state, balance) {
        console.log('balance', balance)
        state.ETH = balance.ETH
        state.INC = balance.INC
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
