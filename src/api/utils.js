import { REG } from './constants'
import Cookies from 'js-cookie'

/**
 * @description 验证手机号
 * @param {string} str 待验证的字符串
 * @returns {boolean} true 为真，false 为假
 */
export const isMobile = (str = '') => REG.MOBILE.test(str)

/**
 * @description 验证邮箱
 * @param {string} str 待验证的字符串
 * @return {boolean} true 为真，false 为假
 */
export const isEmail = (str = '') => REG.EMAIL.test(str)

/**
 * @description 验证密码
 * @param {string} str 待验证的字符串
 * @return {boolean} true 为真，false 为假
 */
export const isValidPassword = (str = '') => REG.PASSWORD.test(str)

/**
 * @description 验证数字 (排除科学计数法 3e4)
 * @param {string} str 待验证的字符串
 * @return {boolean} true 为真，false 为假
 */
export const isValidNumber = (str = '') => REG.NUMBER.test(str)

/**
 * @description 验证身份证号
 * @param {string} str 待验证的字符串
 * @return {boolean} true 为真，false 为假
 */
export const isValidIDNumber = (str = '') => REG.IDCARD.test(str)

/**
 * @description 验证 URL
 * @param {string} str 待验证的字符串
 * @return {boolean} true 为真，false 为假
 */
export const isURL = (str = '') => REG.URL.test(str)

/**
 * @description 验证钱包地址
 * @param {string} str 待验证的字符串
 * @return {boolean} true 为真，false 为假
 */
export const isValidWallet = (str = '') => REG.WALLET.test(str)

/**
 * @description 是否有效的 ETH 地址
 * @param {string} str 待验证的字符串
 * @returns {boolean} true 为真，false 为假
 */
export const isValidETHWallet = (str = '') => REG.ETH_WALLET.test(str)

/**
 * @description 验证 IP 地址
 * @param {string} str 待验证的字符串
 * @returns {boolean} true 为真，false 为假
 */
export const isIP = (str = '') => REG.IP.test(str)

/**
 * @description 验证 短信 验证码
 * @param {string} str 待验证的字符串
 * @returns {boolean} true 为真，false 为假
 */
export const isValidMessageAuthCode = (str = '') => REG.GOOGLE_AUTH.test(str)

/**
 * @description 把时间戳转为 PHP 时间戳（秒，10位）
 * @param {number} [num=0] 待转换的时间戳
 * @returns {number} 10 位时间戳
 */
export const ensureSeconds = (num = 0) => {
  return Number(String(num).substr(0, 10))
}

/**
 * @description 把时间戳转为 JS 时间戳（毫秒，13位）
 * @param {number} [num=0] 待转换的时间戳
 * @returns {number} 13 位时间戳
 */
export const ensureMilliseconds = (num = 0) => {
  return Number(String(num).padEnd(13, 0).substr(0, 13))
}

/**
 *
 * @description 基本 XSS 过滤器
 * @param {string} [str=''] 原始 HTML 字符串
 * @returns {string} 过滤后的字符串
 */
export const xssFilter = (str = '') => {
  return str.toString()
    .replace(/<script>/gi, '&lt;script&gt;')
    .replace(/<\/script>/gi, '&lt;/script&gt;')
    .replace(/<iframe>/gi, '&lt;iframe&gt;')
    .replace(/<\/iframe>/gi, '&lt;/iframe&gt;')
}

/**
 * @description 将用科学计数法表示的数格式化为常规数字
 * @param {number} number 待格式化的数字（科学计数法表示）
 * @returns {string} 格式化后的数字
 */
export const _handleScientificNotation = (number = 0) => {
  const numStr = number.toString()
  if (Number.isNaN(number)) return numStr
  if (!numStr.includes('e')) return numStr

  const params = numStr.split('e')

  const meta = {
    coefficient: params[0], // coefficient 系数
    integer: params[0].split('.')[0], // integer 整数部分
    decimal: params[0].split('.')[1] || '', // decimal 小数部分
    exponent: params[1].substr(1), // exponent 指数
    sign: params[1].substr(0, 1) // sign 符号
  }

  let result = ''
  if (meta.sign === '-') {
    result = `0.${''.padEnd(Number(meta.exponent) - 1, '0')}${meta.integer}${meta.decimal || ''}`
  } else {
    const offset = Number(meta.exponent) - meta.decimal.length
    if (offset) {
      result = `${meta.integer}${meta.decimal}${''.padEnd(offset, '0')}`
    } else {
      result = `${meta.integer}${meta.decimal.substr(0, meta.exponent)}.${meta.decimalsubstr(meta.exponent)}`
    }
  }
  return result
}

export const handleScientificNotation = _handleScientificNotation
export const handleSN = _handleScientificNotation // short-hand naming

/**
 * @description 格式化数字，保留最大 N 位小数（末尾多余的 0 会被去掉，12.345000 -> 12.345)
 * @param {number} number 待格式化数字
 * @param {number} decimalMax 最大保留小数位
 * @param {number} rounding 是否四舍五入 (4.46 -> 4.50)
 * @returns {string} 格式化后的字符串
 */
export const limitDecimal = (number = 0, decimalMax = 0, rounding = false) => {
  // Handle undefined & null
  if (number === undefined || number === null) return ''

  number = Number(number)
  // Handle NaN
  if (Number.isNaN(number)) return ''
  // Handle Integer
  if (Number.isInteger(number)) return number.toString()

  // Handle Decimal
  const arr = (rounding ? number.toFixed(decimalMax) : number.toString()).split('.')
  const [integer = '', decimal = ''] = arr
  const trimedDecimal = decimal.replace(/0*$/g, '').substr(0, decimalMax)
  return integer + (trimedDecimal ? '.' + trimedDecimal : '')
}

/**
 * @description 格式化数字，固定显示 N 位小数（不进位，末尾不足的补零，34.5678 -> 34.56， 12.3 -> 12.3000)
 * @param {number} number 待格式化数字
 * @param {number} limit 小数位数
 * @returns {string} 格式化后的字符串
 */
export const _toFixedWithoutRounding = (number = 0, limit = 0) => {
  // Handle undefined & null
  if (number === undefined || number === null) return ''
  // Handle NaN
  if (Number.isNaN(number)) return ''

  // Handle Decimal
  const arr = number.toString().split('.')
  const [integer = '', decimal = ''] = arr
  const trimedDecimal = decimal.substr(0, limit).padEnd(limit, '0')
  return integer + (trimedDecimal ? '.' + trimedDecimal : '')
}

export const toFixedWithoutRounding = _toFixedWithoutRounding
export const toFixed = _toFixedWithoutRounding // short-hand naming

/**
 * @description 格式化数字小数位方法的简化调用版
 * @param {number} number 待格式化数字
 * @param {number} limit 小数位数
 * @returns {string} 格式化后的字符串
 */
export const formatDecimal = (number = 0, limit = 0) => {
  return _toFixedWithoutRounding(_handleScientificNotation(number), limit)
}

/**
 * @description 手机号加星号
 * @param {string} str 未加星号的手机号
 * @returns {string} 加星号后的手机号
 */
export const encodeMobile = str => `${str.substr(0, 3)}****${str.substr(-4)}`

/**
 * @description 初始化网易验证码
 * @param {object} config 验证码配置对象
 */
export const initNECaptcha = (config = {}) => {
  if (!window.initNECaptcha) return

  window.initNECaptcha(
    {
      captchaId: config.captchaId || CAPTCHA_ID,
      element: config.element || '',
      mode: config.mode || 'popup',
      width: config.width || 280,
      lang: config.lang === 'zh-CN' ? 'zh-CN' : 'en',
      onReady: instance => {
        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
        if (config.debug) {
          console.log('[NECaptcha] onReady')
        }
        config.onReady &&
        typeof config.onReady === 'function' &&
        config.onReady(instance)
      },
      onVerify: (err, data) => {
        // 验证结果
        if (config.debug) {
          console.log('[NECaptcha] onVerify', data.validate)
        }
        if (err && config.debug) {
          console.error(err)
          return
        }

        config.onVerify &&
        typeof config.onVerify === 'function' &&
        config.onVerify(data)
      }
    },
    instance => {
      // 初始化成功
      if (config.debug) {
        console.log('[NECaptcha] Initialized')
        console.log('[NECaptcha] instance', instance)
      }
      instance.popUp()

      config.onLoad &&
      typeof config.onLoad === 'function' &&
      config.onLoad(instance)
    },
    err => {
      // 初始化失败
      if (config.debug) {
        console.error('[NECaptcha] Fail to initialize', err)
      }
      config.onError &&
      typeof config.onError === 'function' &&
      config.onError()
    }
  )
}

/**
 * @description 为数字添加逗点
 * @param {number|string} 未加过逗点的原始数字
 * @returns {string} 加过逗点的数字字符串
 */
export const applyCommas = val => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/**
 * @description 获取 Cookie
 * @param {string} key Cookie 的键
 * @param {object} config 配置选项
 * @returns {string}
 */
const _getCookie = key => Cookies.get(key)

export const getCookie = _getCookie

/**
 * @description 设置 Cookie
 * @param {string} key Cookie 的键
 * @param {string} value Cookie 的值
 * @param {object} config 配置选项
 */
export const setCookie = (key = '', value = '', config = {}) => {
  const { hostname = '' } = window.location
  let domain = isIP(hostname)
    ? hostname
    : hostname.split('.').slice(-2).join('.')
  Cookies.set(key, value, { path: '/', domain: domain, ...config })
  Cookies.set(key, value, { path: '/', domain: '.' + domain, ...config })
}

/**
 * @description 删除 Cookie
 * @param {string} key Cookie 的键
 * @param {string} value Cookie 的值
 * @param {object} config 配置选项
 */
export const removeCookie = (key = '', config = {}) => {
  const { hostname = '' } = window.location
  let domain = isIP(hostname)
    ? hostname
    : hostname.split('.').slice(-2).join('.')

  let keyArr = []
  if (Array.isArray(key)) {
    keyArr = key
  } else {
    keyArr = [key]
  }

  keyArr.forEach(item => {
    Cookies.remove(item, { path: '/', domain: domain, ...config })
    Cookies.remove(item, { path: '/', domain: '.' + domain, ...config })
  })
}

/**
 * @description 清空 Cookie
 * @param {object} config 配置选项
 */
export const clearCookie = (config = {}) => {
  const { hostname = '' } = window.location
  let domain = isIP(hostname)
    ? hostname
    : hostname.split('.').slice(-2).join('.')

  Object.keys(Cookies.get()).forEach(key => {
    Cookies.remove(key, { path: '/', domain: domain, ...config })
    Cookies.remove(key, { path: '/', domain: '.' + domain, ...config })
  })
}
