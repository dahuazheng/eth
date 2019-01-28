import Requester from '@/services/requester'
import config from './config'

// 投注
class OrderApi {

    // 投注
    static createOrder(query) {
        // code
        return Requester.post(config.apiDomain + 'create_order', query)
    }

    // 历史投注
    static getOrderList(query) {
        // page
        // limit

        return Requester.get(config.apiDomain + 'order_list', query)
    }

    // 游戏开始及结束时间
    static getGameTime() {
        return Requester.get(config.apiDomain + 'game_time')
    }

}

export default OrderApi
