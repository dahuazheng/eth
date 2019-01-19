import Requester from "../services/requester"

class MainApi {

    static getOrderList(query) {
        return Requester.get('http://47.75.115.65:5082/api/order_list', query)
    }
}

export default MainApi
