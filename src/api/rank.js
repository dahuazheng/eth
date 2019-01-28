import Requester from "../services/requester"
import config from './config'
import {formatDecimal} from "../utils";
import {PRECISION} from "../utils/constants";

class RankApi {

    // 直推表
    static getPushList(query) {

        return Requester.get(config.apiDomain + 'push_list', query)
            .then(res => {
                if (Number(res.status) !== 1) return

                const pushList = res.data.list && res.data.list.map(n => ({
                    phone: n.phone || '',                // 用户昵称（手机号）
                    orderCount: n.order_count || '',     // 投注次数
                    pushCount: n.push_count || '',       // 直推个数
                    level: n.level || ''                 // 我的头衔
                }))

                return pushList
            }).catch(err => {
                console.error(err)
            })
    }

    // 24小时直推龙虎榜
    static getDayPush() {
        return Requester.get(config.apiDomain + 'day_push').then(res => {
            if (Number(res.status) !== 1) return

            return res.data && res.data.list.map(n => ({
                userId: n.user_id,
                date: n.date,
                pushCount: n.push_count,
                incAmount: formatDecimal(n.inc_amount, PRECISION.INC),
                ethAmount: formatDecimal(n.eth_amount, PRECISION.ETH),
                phone: n.phone,
            }))
        })
    }

    // 龙虎榜历史
    static getDayPushHistory(query) {
        return Requester.get(config.apiDomain + 'day_push_history', query)
            .then(res => {
                if (Number(res.status) !== 1) return
                const historyObj = res.data.list
                const keys = Object.keys(historyObj)
                if (!keys.length) return []

                return keys.map(key => {
                    let list = historyObj[key].map(n => ({
                        date: n.date,
                        ethAmount: formatDecimal(n.eth_amount, PRECISION.ETH),
                        incAmount: formatDecimal(n.inc_amount, PRECISION.INC),
                        phone: n.phone,
                        pushCount: n.push_count,
                        userId: n.user_id,
                        rank: n.rank
                    }))
                    return {
                        date: key,
                        list: list
                    }
                })
            }).catch(err => console.log(err))
    }

    // 我的今日直推
    static getMyDayPushCount(query) {
        return Requester.get(config.apiDomain + 'my_day_push_count', query)
            .then(res => {
                if (Number(res.status) !== 1) return 0

                return res.data && res.data.push_count || 0     // 直推数
            }).catch(err => {
                console.error(err)
            })
    }

    // 我的龙虎榜
    static getWinnerList(query) {
        return Requester.get(config.apiDomain + 'my_day_push', query)
            .then(res => {
                if (Number(res.status) !== 1) return

                const list = res.data.list && res.data.list.map(n => ({
                    date: n.date || '',                              // 日期
                    eth: formatDecimal(n.eth, PRECISION.ETH) || 0,   // 奖励的eth
                    inc: formatDecimal(n.inc, PRECISION.INC) || 0,   // 奖励的inc
                    rank: n.rank || '',                              // 中奖状态：0为未中奖,1-5为中奖等级
                    pushCount: n.push_count || '',                   // 直推个数
                }))

                return list
            }).catch(err => {
                console.error(err)
            })
    }

    // 直推龙虎榜奖池
    static getDayPushBonus(query) {
        return Requester.get(config.apiDomain + 'day_push_bonus', query)
            .then(res => {
                if (Number(res.status) !== 1) return
                return {
                    incAmount: formatDecimal(res.data && res.data.inc_amount, PRECISION.INC) || 0,  // inc数量
                    ethAmount: formatDecimal(res.data && res.data.eth_amount, PRECISION.ETH) || 0   // eth数量
                }

            }).catch(err => {
                console.error(err)
            })
    }
}

export default RankApi
