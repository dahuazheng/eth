import {UserApi, WalletApi} from '@/api'
import {formatDecimal} from "../../utils";
import {PRECISION} from "../../utils/constants";

// initial state
const state = {
    invite_code: '',
    address: {
        ETH: '0x8923kjKJhkjh9879827ufiywiyri2987yhiu',
        INC: ''
    },
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
        ['INC'].map(coin => {
            WalletApi.getWalletAddress().then(res => {
                console.log(res)
                return
                if (Number(res.status) !== 1) return

                commit('setAddress', res.data.address)
            })
        })

    }
}

// mutations
const mutations = {
    setInviteCode(state, inviteCode) {
        state.invite_code = inviteCode
    },
    setAsset(state, asset) {
        state.asset = asset
        const incObj = asset.find(item => item.coin_code === 'INC')
        const ethObj = asset.find(item => item.coin_code === 'ETH')
        state.balance = {INC: formatDecimal(incObj.available_amount, PRECISION.INC), ETH: formatDecimal(ethObj.available_amount, PRECISION.ETH)}
    },
    setAddress(state, address) {
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
