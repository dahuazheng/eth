import Cookies from 'js-cookie'
import Requester from '../services/requester'
import config from './config'
import {formatDecimal} from "../utils"
import {PRECISION} from "../utils/constants"

// 测试token
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTAxMjQzIiwidG9rZW5fdmVyc2lvbiI6IlBKb3hPTDIxZGx4OW42VTQwOSIsImV4cCI6MTU0ODI0Nzk0N30.jkGqPaSGRNd_oKrvl5xLblD3S2pS6N4ODk9eeGC3BzY'

class UserApi {

    // 登录
    static login(query) {
        // phone: 18368095040
        // phone_code: 123456
        return Requester.post(config.apiDomain + 'login', query)
    }

    // 退出登录
    static logout(query) {
        return Requester.get(config.apiDomain + 'logout', query)
    }

    // 获取登录验证码
    static sendSms(query) {
        return Requester.post(config.apiDomain + 'send_sms', query)
    }

    // 投注、提现
    static sendUserSms(query) {
        // type 投注(order) 提现(withdraw)
        return Requester.post(config.apiDomain + 'send_user_sms', query)
    }

    // 获取邀请码
    static getInviteCode() {
        return Requester.get(config.apiDomain + 'invite_code')
    }

    // 获取我的邀请人
    static getParentInviteCode() {
        return Requester.get(config.apiDomain + 'parent_invite_code')
    }

    // 绑定邀请码
    static bindInviteCode(query) {
        // invite_code 66666666
        return Requester.post(config.apiDomain + 'bind_invite_code', query)
    }

    // 查看是否绑定邀请码
    static checkInviteBind() {
        return Requester.get(config.apiDomain + 'check_invite_bind')
    }

    // 判断是否已登录
    static isOnline() {
        return !!Cookies.get('ETH.token')
    }

    // 判断是否绑定邀请人
    static isBindInviter() {
        return !!Cookies.get('ETH.bind_inviter')
    }

    // 获取我的奖励
    static getUserBonus(query) {
        return Requester.get(config.apiDomain + 'user_bonus', query).then(res => {
            if (Number(res.status) !== 1) return
            return {
                staticInc: formatDecimal(res.data.static_bonus && res.data.static_bonus.inc_amount, PRECISION.INC) || 0,               // 静态inc、eth
                staticEth: formatDecimal(res.data.static_bonus && res.data.static_bonus.eth_amount, PRECISION.ETH) || 0,
                dynamicInc: formatDecimal(res.data.dynamic_bonus && res.data.dynamic_bonus.eth_amount, PRECISION.INC) || 0,             // 动态inc、eth
                dynamicEth: formatDecimal(res.data.dynamic_bonus && res.data.dynamic_bonus.eth_amount, PRECISION.ETH) || 0,
                topManagerInc: formatDecimal(res.data.top_manager_bonus && res.data.top_manager_bonus.inc_amount, PRECISION.INC) || 0,  // 高级经理inc、eth
                topManagerEth: formatDecimal(res.data.top_manager_bonus && res.data.top_manager_bonus.eth_amount, PRECISION.ETH) || 0,
                dayGuessInc: formatDecimal(res.data.day_guess_bonus && res.data.day_guess_bonus.inc_amount, PRECISION.INC) || 0,        // 每日竞猜 inc、eth
                dayGuessEth: formatDecimal(res.data.day_guess_bonus && res.data.day_guess_bonus.eth_amount, PRECISION.ETH) || 0,
                dayPushInc: formatDecimal(res.data.day_push_bonus && res.data.day_push_bonus.inc_amount, PRECISION.INC) || 0,           // 龙虎榜 inc、eth
                dayPushEth: formatDecimal(res.data.day_push_bonus && res.data.day_push_bonus.eth_amount, PRECISION.ETH) || 0,
                otherInc: formatDecimal(res.data.other_bonus && res.data.other_bonus.inc_amount, PRECISION.INC) || 0,                   // 其他奖励 inc、eth
                otherEth: formatDecimal(res.data.other_bonus && res.data.other_bonus.eth_amount, PRECISION.ETH) || 0,
                allInc: formatDecimal(res.data.all_bonus && res.data.all_bonus.inc_amount, PRECISION.INC) || 0,                         // 总奖励 inc、eth
                allEth: formatDecimal(res.data.all_bonus && res.data.all_bonus.eth_amount, PRECISION.ETH) || 0,
            }
        }).catch(err => console.log(err))
    }

    // 我的头衔
    static getUserInfo(query) {
        return Requester.get(config.apiDomain + 'user_info', query).then(res => {
            if (Number(res.status) !== 1) return
            return {level: res.data && res.data.level}
        }).catch(err => console.log(err))
    }
}

export default UserApi
