import Requester from "../services/requester"
import config from './config'

class MainApi {

    static getOrderList(query) {
        return Requester.get('http://47.75.115.65:5082/api/order_list', query)
    }

    // 获取奖池、奖励
    static getGameBonus(){
        return Requester.get(config.apiDomain + 'game_bonus')
    }
}

export default MainApi
