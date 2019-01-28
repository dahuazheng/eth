import Requester from "../services/requester"
import config from './config'
import {formatDecimal} from '../utils/index'
import {PRECISION} from '../utils/constants'

class GuessApi {

    // 获取我的竞猜状态
    static getGuessStatus(query) {
        return Requester.get(config.apiDomain + 'guess_status', query)
    }

    // 参与竞猜
    static joinGuess(query) {
        // num_guess
        return Requester.post(config.apiDomain + 'guess_add', query)
    }

    // 我的竞猜
    static getMyGuessList() {
        return Requester.get(config.apiDomain + 'guess_my')
            .then(res => {
                if (Number(res.status) < 1) {
                    return []
                }
                return res.data && res.data.map(n => ({
                    addTime: Number(n.add_time) || 0,                   // 参与时间
                    numGuess: n.num_guess || '',                        // 竞猜数字
                    numTrue: n.num_true || '',                          // 实际数字
                    eth: formatDecimal(n.eth, PRECISION.ETH) || 0,      // 奖励的eth
                    inc: formatDecimal(n.inc, PRECISION.INC) || 0,      // 奖励的inc
                    status: n.status || '',                             // 中奖状态：0为未中奖,1-5为中奖等级
                }))
            })
            .catch(err => console.error(err))
    }

    // 获取我的竞猜历史结果
    static getGuessHistory(query) {
        return Requester.get(config.apiDomain + 'history', query)
            .then(res => {
                if (Number(res.status) !== 1) return

                const lists = res.data && res.data.map(n => ({
                    date: n.date || '',
                    addTime: Number(n.add_time) || 0,
                    numTrue: Number(n.num_true) || 0,
                    list: n.list.map(i => {
                        return {
                            numGuess: i.num_guess,
                            phone: i.phone,
                            eth: formatDecimal(i.eth, PRECISION.ETH),
                            inc: formatDecimal(i.inc, PRECISION.INC),
                            status: i.status,
                            date: i.date
                        }
                    }) || []
                }))

                return lists
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export default GuessApi
