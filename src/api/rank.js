import Requester from "../services/requester"

class RankApi {

    // 获取直推表数据
    static getPushList(query) {
        return Requester.get('http://47.75.115.65:5082/api/push_list', query)
    }

    // 获取龙虎榜数据
    static getWinnerList(query) {
        return Requester.get('http://47.75.115.65:5082/api/winner_list', query)
    }
}

export default RankApi
