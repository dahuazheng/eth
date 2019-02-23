import axios from 'axios'
import qs from 'querystring'
import Cookies from 'js-cookie'
import {Indicator} from 'mint-ui'

// Axois 全局设置
const instance = axios.create({
    // baseURL: BASE_URL,
    timeout: 30000 // 30s
})

// 整理 Headers 用于显示
const prepareHeaders = headers => {
    const result = {}
    for (const key of Object.keys(headers)) {
        const value = headers[key]
        if (typeof value !== 'object') {
            result[key] = value
        }
    }
    return result
}

// 整理 data 用于显示
const prepareData = data => {
    if (data instanceof FormData && data.keys && data.get) {
        const keys = data.keys()
        const result = {}
        for (const key of keys) {
            result[key] = data.get(key)
        }
        return result
    }
    return data
}

// 定义计时器
let loadCount = 0

// 拦截请求
instance.interceptors.request.use(config => {
    loadCount++
    Indicator.open({
        spinnerType: 'fading-circle'
    })

    const method = config.method.toUpperCase()
    const data = ['GET', 'DELETE'].includes(method) ? config.params : config.data

    // 设置请求头
    config.headers.token = config.headers.token || Cookies('ETH.token') || ''
    config.headers.lang = config.headers.lang || Cookies('ETH.lang') || ''

    // 显示请求信息
    /*if (DEBUG_MODE) {
      const headersToDisplay = prepareHeaders(config.headers)
      const dataToDisplay = prepareData(data)
      console.log(`-> Request:  ${method} '${config.url}': `, headersToDisplay, dataToDisplay)
    }*/

    return config
}, err => Promise.reject(err))

// 拦截响应
instance.interceptors.response.use(res => {
    loadCount--
    if (!loadCount) {
        Indicator.close()
    }

    let {headers, data} = res
    const config = res.config
    const apiArr = config.url.substr(config.url.indexOf('://') + 3).split('/')
    apiArr[0] = ''
    const api = apiArr.join('/')

    // 处理登录过期
    if (Number(data.status) === -2 && !window.location.href.includes('/login')) {
        const redirectURL = encodeURIComponent(window.location.href)
        window.location.href = `/login?redirect_url=${redirectURL}`
    }
    /*if (data.status === -2 && api !== '/api/sign_out') {
        message.error(data.msg)
        UserApi.logout().then(res => {
            if (IS_PROD) {
                const redirectURL = encodeURIComponent(window.location.href)
                window.location.href = `/#/user/login?redirect_url=${redirectURL}`
            }
        })
    }*/

    // 把 headers 的内容写进响应里
    res.data.headers = {...headers}

    return res
}, err => {
    loadCount--
    if (!loadCount) {
        Indicator.close()
    }

    Promise.reject(err)
})

class Requester {
    static get(url = '', data = {}, opts = {}) {
        const config = {
            params: data,
            ...opts
        }
        return instance.get(url, config).then(res => res && res.data)
    }

    static post(url = '', data = {}, opts = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            transformRequest: [
                data => qs.stringify(data)
            ],
            ...opts
        }
        return instance.post(url, data, config).then(res => res.data)
    }

    static put(url = '', data = {}, opts = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            transformRequest: [
                data => qs.stringify(data)
            ],
            ...opts
        }
        return instance.put(url, data, config).then(res => res.data)
    }

    static delete(url = '', data = {}, opts = {}) {
        const config = {
            params: data,
            ...opts
        }
        return instance.delete(url, config).then(res => res.data)
    }

    // data can be either FormData or plain object
    static formdata(url = '', data = {}, opts = {}) {
        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
            ...opts
        }

        let preparedData = null
        if (data instanceof window.FormData) {
            preparedData = data
        } else {
            preparedData = new window.FormData()
            for (const key of Object.keys(data)) {
                preparedData.append(key, data[key])
            }
        }

        return instance.post(url, preparedData, config).then(res => res.data)
    }
}

export default Requester
