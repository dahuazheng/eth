import Cookies from 'js-cookie'
import httpService from '@/services/http-service'

class BalanceApi {

    static getBalance() {
        return Promise.resolve({
            ETH: 769.2,
            INC: 2313503.2
        })
    }
}

export default BalanceApi
