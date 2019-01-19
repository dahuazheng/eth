import Requester from "../services/requester"

class MainApi {

    // 获取邀请码
    static getOrderList(query) {
        return Requester.get('http://47.75.115.65:5082/api/order_list', query)
    }
}

export default MainApi
