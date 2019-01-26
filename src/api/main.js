import Requester from "../services/requester"
import config from './config'
import { formatDecimal } from '../utils/index'
import { PRECISION } from '../utils/constants'

class MainApi {
    // 获取奖池、奖励
    static getGameBonus(){
        return Requester.get(config.apiDomain + 'game_bonus').then(res => {
            if (res.status !== '1') return

            return {
                ethAmount: formatDecimal(res.data && res.data.eth_amount, PRECISION.ETH) || 0,                   // 奖池 eth
                incAmount: formatDecimal(res.data && res.data.inc_amount, PRECISION.INC) || 0,                   // 奖池 inc
                orderIncAmount: formatDecimal(res.data && res.data.order_inc_amount, PRECISION.INC) || 0,        // 投注金额 inc
                orderEthAmount: formatDecimal(res.data && res.data.order_eth_amount, PRECISION.ETH) || 0,        // 投注金额 eth
                dayOrderIncAmount: formatDecimal(res.data && res.data.day_order_inc_amount, PRECISION.INC) || 0, // 每日投注金额  inc
                dayOrderEthAmount: formatDecimal(res.data && res.data.day_order_eth_amount, PRECISION.ETH) || 0, // 每日投注金额  eth
            }
        })
    }
}

export default MainApi
