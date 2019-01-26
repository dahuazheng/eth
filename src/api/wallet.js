import Requester from "../services/requester"
import config from './config'
import {formatDecimal} from "../utils";
import {PRECISION} from "../utils/constants";

// import { ensureMilliseconds } from  '../utils'

class WalletApi {
    // 用户充值提现记录列表  type = 1(充值）、2(提现）
    static getNewpayOrderList(query) {
        return Requester.post(config.apiDomain + 'newpay_order_list', query).then(res => {
            if (res.status !== '1') return
            console.log(res.data)
            return res.data && res.data.map(n => ({
                type: n.type || '',                     // 列表类型
                amount: Number(n.amount) || 0,          // 充值/提现数量
                coinCode: n.coin_code || '',            // 币种类型
                status: n.status || '',                 // 1，提现待审核，2：提现中 3：拒绝提现申请，4：提现成功，5：提现失败，6：充值成功
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

    // 获取币种配置信息
    static getCoinInfo(query) {
        const coinCode = query.coin_code

        return Requester.post(config.apiDomain + 'newpay_get_coin_info', query)
            .then(res => {
                if (Number(res.status) !== 1) return
                if (!res.data) return {}

                const data = res.data
                return {
                    chainCode: data && data.chain_code || '',
                    withdrawFeeAmount: formatDecimal(Number(data.withdraw_fee_amount), PRECISION[coinCode]) || 0,       // 提现手续费
                    minWithdrawAmount: formatDecimal(Number(data.min_withdraw_amount), PRECISION[coinCode]) || 0,       // 单笔最小提现数量
                    maxWithdrawAmount: (formatDecimal(Number(data.max_withdraw_amount), PRECISION[coinCode])) || 0,     // 单笔最大提现数量
                    dayMaxWithdrawAmount: formatDecimal(Number(data.day_max_withdraw_amount), PRECISION[coinCode]) || 0 // 手续费
                }
            })
    }

    // 申请提现
    static applyTransfer(query) {
        return Requester.post(config.apiDomain + 'newpay_apply_transfer', query)
    }
}

export default WalletApi
