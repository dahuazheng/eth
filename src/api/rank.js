import Requester from "../services/requester"

class RankApi {

    // 获取直推表数据
    static getPushList(query) {
        return Requester.get('http://47.75.115.65:5082/api/push_list', query)
            .then(res => {
                if (res.status !== 1) return

                const winnerList = res.data.list.map(n => ({
                    orderCount: n.order_count || '',     // 投注次数
                    pushCount: n.push_count || '',       // 直推个数
                    phone: n.phone || '',                // 用户昵称（手机号）
                }))

                return winnerList
            })
    }

    // 获取龙虎榜数据
    static getWinnerList(query) {
        return Requester.get('http://47.75.115.65:5082/api/winner_list', query)

    }
}

export default RankApi
