import Cookies from 'js-cookie'
// import httpService from '@/services/http-service'
import Requester from "../services/requester";

class UserApi {

    // 登录
    static login(query) {
        // phone: 18368095040
        // phone_code: 123456

        /*return Promise.resolve({
            token: 'token' + query.phone,
            token_password: 'token_password' + query.phone_code
        })*/

        return Requester.post('http://47.75.115.65:5082/api/login', query)
    }

    // 获取登录验证码
    static sendSms(query) {
        // phone_prefix: +86
        // phone: 18368095040
        // type: login
        // validate: dW5kZWZpbmVk
        // return Promise.resolve(666666)
        Cookies.remove('ETH.token')
        return Requester.post('http://47.75.115.65:5082/api/send_sms', query)
    }

    // 投注、提现
    static sendUserSms() {
        // return Promise.resolve(123456)
        return Requester.post('http://47.75.115.65:5082/api/send_user_sms')
    }

    // 获取邀请码
    static getInviteCode() {
        return Requester.get('http://47.75.115.65:5082/api/invite_code')
    }

    static bindInviteCode(query) {
        // invite_code 666666
        const res = {
            "status": "1",
            "msg": "",
            "data": {
                "invite_code": "qNUKNTh6"
            }
        }
        // return Promise.resolve(res)
        return Requester.post('http://47.75.115.65:5082/api/bind_invite_code', query)
    }

    // 判断是否已登录
    static isOnline() {
        return !!Cookies.get('ETH.token')
    }

    // 判断是否绑定邀请人
    static isBindInviter() {
        return !!Cookies.get('ETH.invite_code')
    }

    // 我的竞猜
    static getMyAward(query) {
        return Requester.get('http://47.75.115.65:5082/api/guess_my', query)
            .then(res => {
                if(res.status < 1) {
                    return {}
                }
                const myAwardData = res.data.map(n => ({
                    addTime: n.add_time || '',   // 参与时间
                    numGuess: n.num_guess || '', // 竞猜数字
                    numTrue: n.num_true || '',   // 实际数字
                    eth: n.eth || '',            // 奖励的eth
                    inc: n.inc || '',            // 奖励的inc
                    status: n.status || '',      // 中奖状态：0为未中奖,1-5为中奖等级
                }))
                return myAwardData
            })
            .catch(err => {
                console.error(err)
            })
    }

    // 提交我的竞猜数字( num_guess )
    static sendGuessNum(query) {
        return Requester.post('http://47.75.115.65:5082/api/guess_add', query)
    }

    // 获取我的竞猜状态
    static getGuessStatus(query) {
        return Requester.get('http://47.75.115.65:5082/api/guess_status', query)
    }

    // 获取我的竞猜历史结果
    static getGuessHistory(query) {
        return Requester.get('http://47.75.115.65:5082/api/history', query)
            .then(res => {
                if (res.status !== 1) return  {}

                const historyList = res.data.map(n => ({
                    addTime: n.add_time || '',     // 参与时间戳
                    numGuess: n.num_guess || '',   // 竞猜数字
                    numTrue: n.num_true || '',     // 实际数字
                    eth: n.eth || '',              // 奖励的eth
                    inc: n.inc || '',              // 奖励的inc
                    status: n.status || '',        // 中奖状态：0为未中奖,1-5为中奖等级
                    date: n.date || '',            // 参与日期
                    phone: n.phone || '',          // 手机号
                }))

                return historyList
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export default UserApi
