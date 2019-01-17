import BalanceApi from '@/api/balance'

// initial state
const state = {
    ETH: 0,
    INC: 0,
    address: '0x8923kjKJhkjh9879827ufiywiyri2987yhiu'
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
