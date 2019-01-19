import Cookies from 'js-cookie'
import Requester from '@/services/requester'
import config from './config'

// 测试token
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTAxMjQzIiwidG9rZW5fdmVyc2lvbiI6IlBKb3hPTDIxZGx4OW42VTQwOSIsImV4cCI6MTU0ODI0Nzk0N30.jkGqPaSGRNd_oKrvl5xLblD3S2pS6N4ODk9eeGC3BzY'

class UserApi {

    // 登录
    static login(query) {
        // phone: 18368095040
        // phone_code: 123456

        /*return Promise.resolve({
            token: 'token' + query.phone,
            token_password: 'token_password' + query.phone_code
        })*/

        return Requester.post(config.apiDomain + 'login', query)
    }

    // 获取登录验证码
    static sendSms(query) {
        // phone_prefix: +86
        // phone: 18368095040
        // type: login
        // validate: dW5kZWZpbmVk
        // return Promise.resolve(666666)
        return Requester.post(config.apiDomain + 'send_sms', query)
    }

    // 投注、提现
    static sendUserSms() {
        // return Promise.resolve(123456)
        return Requester.post(config.apiDomain + 'send_user_sms')
    }

    // 获取邀请码
    static getInviteCode() {
        return Requester.get(config.apiDomain + 'invite_code')
    }

    // 绑定邀请码
    static bindInviteCode(query) {
        // invite_code 66666666
        const res = {
            "status": "1",
            "msg": "",
            "data": {
                "invite_code": "qNUKNTh6"
            }
        }
        // return Promise.resolve(res)
        return Requester.post(config.apiDomain + 'bind_invite_code', query)
    }

    // 查看是否绑定邀请码
    static checkInviteBind() {
        return Requester.get(config.apiDomain + 'check_invite_bind')
    }

    static getBalance() {
        return Promise.resolve({
            ETH: 769.2,
            // ETH: 0,
            INC: 2313503.2
        })
    }

    // 判断是否已登录
    static isOnline() {
        return !!Cookies.get('ETH.token')
    }

    // 判断是否绑定邀请人
    static isBindInviter() {
        return !!Cookies.get('ETH.bind_inviter')
    }


}

export default UserApi
