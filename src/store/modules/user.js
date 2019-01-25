import {UserApi,WalletApi} from '@/api'

// initial state
const state = {
    invite_code: '',
    address: '0x8923kjKJhkjh9879827ufiywiyri2987yhiu',
    asset: {},
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
    getAsset({commit}) {
        WalletApi.getAsset().then(asset => {
            if (Number(asset.status) !== 1) return
            commit('setAsset', asset.data)
        })
    },
    getAddress({commit}) {
        UserApi.getWalletAddress().then(res => {
            console.log(res)
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
    setAsset(state, asset) {
        // console.log('balance', balance)
        state.asset = asset
        const incObj = asset.find(item => item.coin_code === 'INC')
        const ethObj = asset.find(item => item.coin_code === 'ETH')
        state.balance = {INC: incObj.available_amount, ETH: ethObj.available_amount}

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
