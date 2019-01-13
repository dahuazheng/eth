import Cookies from 'js-cookie'

class UserApi {

  static login(){
    console.log(222)
  }

  // 判断是否已登录
  static isOnline() {
    return !!Cookies.get('ETH.token') && !!Cookies.get('ETH.token_password')
  }
}

export default UserApi