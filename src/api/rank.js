import Requester from "../services/requester"

class RankApi {

    // 获取直推表数据
    static getPushList(query) {
        return Requester.get('http://47.75.115.65:5082/api/push_list', query)
            .then(res => {
                if (res.status !== '1') return

                const pushList = res.data.list.map(n => ({
                    phone: n.phone || '',                // 用户昵称（手机号）
                    orderCount: n.order_count || '',     // 投注次数
                    pushCount: n.push_count || '',       // 直推个数
                }))

                return pushList
            }).catch(err => {
                console.error(err)
            })
    }

    // 获取我的龙虎榜数据
    static getWinnerList(query) {
        return Requester.get('http://47.75.115.65:5082/api/my_day_push_count', query)
            .then(res => {
                if (res.status !== '1') return

                const list = res.data.list.map(n => ({
                    date: n.date || '',                    // 日期
                    eth: n.eth || '',                      // 奖励的eth
                    inc: n.inc || '',                      // 奖励的inc
                    status: n.status || '',                // 中奖状态：0为未中奖,1-5为中奖等级
                    pushCount: n.push_count || '',         // 直推个数
                }))

                return list
            }).catch(err => {
                console.error(err)
            })
    }

    // 获取竞猜数据
    // static getGuessList(query) {
    //     return Requester.get('http://47.75.115.65:5082/api/winner_list', query)
    //         .then(res => {
    //             if (res.status !== '1') return
    //
    //             const guessList = res.data.list.map(n => ({
    //                 // phone: n.phone || '',                // 用户昵称（手机号）
    //                 // orderCount: n.order_count || '',     // 投注次数
    //                 // pushCount: n.push_count || '',       // 直推个数
    //             }))
    //
    //             return guessList
    //         }).catch(err => {
    //             console.error(err)
    //         })
    // }
}

export default RankApi
