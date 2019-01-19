import Cookies from 'js-cookie'
import httpService from '@/services/http-service'

class BalanceApi {

    static getBalance() {
        return Promise.resolve({
           ETH: 769.2,
            // ETH: 0,
            INC: 2313503.2
        })
    }

    // 登陆
    static login(query) {
        // phone: 18368095040
        // phone_code: 123456
        // invite_code: kevinqwec456jdj

        return Promise.resolve({
            token: 'token' + query.phone,
            token_password: 'token_password' + query.phone_code
        })

        return httpService.post('http://47.75.115.65:5802/api/login', query)
    }

    // 获取登陆验证码
    static sendSms(query) {
        // phone_prefix: +86
        // phone: 18368095040
        // type: login
        // validate: dW5kZWZpbmVk
        return Promise.resolve(666666)
        return httpService.post('http://localhost:8080/api/send_user_sms', query)
    }

    // 获取邀请码
    static getInviteCode() {
        return httpService.get('http://47.75.115.65:5802/api/invite_code')
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
        return Promise.resolve(res)
        return httpService.post('http://47.75.115.65:5802/api/bind_invite_code', query)
    }
}

export default BalanceApi
