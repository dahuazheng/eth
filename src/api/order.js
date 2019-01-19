import Requester from '@/services/requester'
import config from './config'

// 投注
class OrderApi {

    // 投注
    static createOrder() {
        return Requester.post(config.apiDomain + 'create_order')
    }

    // 历史投注
    static orderList(query) {
        // page
        // limit

        return Requester.post(config.apiDomain + 'order_list', query)
    }

}

export default OrderApi
