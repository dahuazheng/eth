import Requester from "../services/requester"
import config from './config'

class WalletApi {
    // 用户充值提现记录列表  type = 1(充值）、2(提现）
    static getNewpayOrderList(query) {
        return Requester.post( config.apiDomain + 'newpay_order_list', query)
            .then(res => {
                if (res.status !== '1') return
                return {
                    type: res.data && res.data.type || '',           // 列表类型
                    amount: Number(res.data && res.data.amount) || 0,        // 充值/提现数量
                    coinCode: res.data && res.data.coin_code || '',  // 币种类型
                    status: res.data && res.data.status,             // 1，提现待审核，2：提现中 3：拒绝提现申请，4：提现成功，5：提现失败，6：充值成功
                    createdAt: Number(res.data && res.data.createdAt ) || 0,     // 创建时间（时间戳）
                }
            }).catch(err => {
                console.error(err)
            })
    }
}

export default WalletApi
