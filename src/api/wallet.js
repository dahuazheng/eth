import Requester from "../services/requester"
import config from './config'

// import { ensureMilliseconds } from  '../utils'

class WalletApi {
    // 用户充值提现记录列表  type = 1(充值）、2(提现）
    static getNewpayOrderList(query) {
        return Requester.post(config.apiDomain + 'newpay_order_list', query).then(res => {
            if (res.status !== '1') return
            console.log(res.data)
            return res.data && res.data.map(n => ({
                type: n.type || '',                     // 列表类型
                amount: Number(n.amount) || 0,        // 充值/提现数量
                coinCode: n.coin_code || '',          // 币种类型
                status: n.status || '',               // 1，提现待审核，2：提现中 3：拒绝提现申请，4：提现成功，5：提现失败，6：充值成功
                createdAt: Number(n.created_at) || 0    // 创建时间（时间戳）
            }))
        }).catch(err => console.error(err))
    }

    // 获取用户资产信息
    static getAsset() {
        return Requester.post(config.apiDomain + 'newpay_get_asset')
    }

    // 获取用户钱包地址
    static getWalletAddress(query) {
        return Requester.post(config.apiDomain + 'newpay_get_address', query)
    }
}

export default WalletApi
