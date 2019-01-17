import Cookies from 'js-cookie'
import httpService from '@/services/http-service'
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
        return Requester.post('http://47.75.115.65:5082/api/send_sms', query)
    }

    // 投注、提现
    static sendUserSms(query) {
        // phone: 18368095040
        return Promise.resolve(123456)
        return httpService.post('http://localhost:8080/api/send_user_sms', query)
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
}

export default UserApi
