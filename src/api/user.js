import Cookies from 'js-cookie'
import httpService from '@/services/http-service'

class UserApi {

  // 登陆
  static login(query) {
    // phone: 18368095040
    // phone_code: 123456
    // invite_code: kevinqwec456jdj

    Cookies.set('ETH.token', 'kevin123', {expires: 1});
    Cookies.set('ETH.token_password', 'kevin123', {expires: 1});

    return httpService.post('http://47.75.115.65:5802/api/login', query)
  }

  // 获取登陆验证码
  static sendSms(query){
    // phone_prefix: +86
    // phone: 18368095040
    // type: login
    // validate: dW5kZWZpbmVk
    return httpService.post('http://47.75.115.65:5802/api/send_user_sms', query)
  }

  // 获取邀请码
  static getInviteCode(){
      return httpService.get('http://47.75.115.65:5802/api/invite_code')
  }

  // 判断是否已登录
  static isOnline() {
    return !!Cookies.get('ETH.token') && !!Cookies.get('ETH.token_password')
  }
}

export default UserApi
