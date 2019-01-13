import Cookies from 'js-cookie'

class UserApi {

  static login(){
    Cookies.set('ETH.token', 'kevin123', { expires: 1 });
    Cookies.set('ETH.token_password', 'kevin123', { expires: 1 });
  }

  // 判断是否已登录
  static isOnline() {
    return !!Cookies.get('ETH.token') && !!Cookies.get('ETH.token_password')
  }
}

export default UserApi