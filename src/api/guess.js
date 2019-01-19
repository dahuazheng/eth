import Requester from "../services/requester"
import config from './config'

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
                if (res.status < 1) {
                    return []
                }
                return res.data && res.data.map(n => ({
                    addTime: n.add_time || '',   // 参与时间
                    numGuess: n.num_guess || '', // 竞猜数字
                    numTrue: n.num_true || '',   // 实际数字
                    eth: n.eth || '',            // 奖励的eth
                    inc: n.inc || '',            // 奖励的inc
                    status: n.status || '',      // 中奖状态：0为未中奖,1-5为中奖等级
                }))
            })
            .catch(err => console.error(err))
    }

    // 获取我的竞猜历史结果
    static getGuessHistory(query) {
        return Requester.get(config.apiDomain + 'history', query)
            .then(res => {
                if (res.status !== 1) return []

                return res.data
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export default GuessApi
