<template>
    <div class="animated fadeInRight" id="login-in" @touchmove.prevent>
        <header @click="back"></header>
        <h1>
            您好，
            <br>
            <small>欢迎来到1 ETH，首次登录即注册</small>
        </h1>
        <div class="row phone-box">
            <label @click="prefixShow=true">
                +{{prefix}}
                <icon name="down"></icon>
            </label>
            <input type="number" v-model="phone">
            <span class="delete" @click="phone=''">×</span>
        </div>
        <div class="row">
            <input type="number" v-model="code" placeholder="验证码">
            <button id="btn-get-captcha" :disabled="count < 60" @click="onBtnCaptchaClick">{{smsLabel}}</button>
        </div>
        <div class="btn-box">
            <button @click="login">登录</button>
        </div>

        <PickerPopup
            title="选择区号"
            :show="prefixShow"
            :slots="prefixSlots"
            :cancel="cancelSelectPrefix"
            :confirm="confirmSelectPrefix"/>
    </div>
</template>

<script>
    import EthButton from '@/components/EthButton.vue'
    import PickerPopup from '@/components/PickerPopup.vue'
    import Cookies from 'js-cookie'
    import {Toast} from 'mint-ui'
    import {COUNTRIES, CAPTCHA_COUNTDOWN_DEFAULT} from '@/utils/constants'
    import {isMobile, isValidSmsAuthCode, initNECaptcha} from '@/utils'
    import {UserApi} from '@/api'
    import {initMixin} from '@/mixins'

    export default {
        name: 'loginIn',
        components: {EthButton, PickerPopup},
        mixins: [initMixin],
        data() {
            return {
                prefix: '86',
                prefixShow: false,
                phone: '',
                code: '',
                count: CAPTCHA_COUNTDOWN_DEFAULT,
                smsLabel: '获取验证码',
                imageCaptcha: '',
                isCaptchaLocked: false,
                prefixSlots: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
            }
        },
        methods: {
            cancelSelectPrefix() {
                this.prefixShow = false
            },
            confirmSelectPrefix(value) {
                let prefix = value.split(':')[1]
                this.prefix = prefix.replace(/^\s+|\s+$/g, '')
                this.prefixShow = false
            },

            back() {
                this.$router.push({name: 'login'})
            },

            // “获取验证码”按钮点击回调
            onBtnCaptchaClick() {
                if (!this.phone) {
                    return Toast('请输入手机号码')
                }
                if (this.phone.length < 7 || this.phone.length > 16) {
                    return Toast('请输入正确的手机号')
                }

                this.initNECaptcha()
            },

            // 滑动验证码
            initNECaptcha() {
                if (this.isCaptchaLocked) return
                this.isCaptchaLocked = true
                initNECaptcha({
                    element: '#btn-get-captcha',
                    // lang: language,
                    // debug: DEBUG_MODE,
                    onReady: instance => {
                        this.isCaptchaLocked = false
                    },
                    onVerify: (data) => {
                        this.imageCaptcha = data.validate
                        this.startCountDown()
                        this.sendSms()
                    },
                    onError: () => {
                        this.isCaptchaLocked = false
                    }
                })
            },

            // 开始倒计时
            startCountDown() {
                this.count -= 1

                setTimeout(() => {
                    this.smsLabel = this.count + ' s'

                    if (this.count >= 0) {
                        this.startCountDown()
                    } else {
                        this.count = CAPTCHA_COUNTDOWN_DEFAULT
                        this.smsLabel = '重新获取'
                    }
                }, 1000)
            },

            // 发送验证码
            sendSms() {
                console.log('imageCaptcha', this.imageCaptcha)
                UserApi.sendSms({
                    phone: this.phone,
                    phone_prefix: this.prefix, //'86'
                    type: 'login',
                    validate: this.imageCaptcha
                }).then(res => {
                    this.code = res
                    if (Number(res && res.status) !== 1) return
                    Toast('验证码已发送')
                }).catch(err => console.log(err))
            },

            // 判断是否绑定邀请码
            checkInviteBind() {
                UserApi.checkInviteBind().then(res => {
                    console.log(res)
                    if (Number(res.status === 1) && Number(res.data && res.data.is_bind) === -1) {
                        Cookies.set('ETH.bind_inviter', 'true', {expires: 1 / 24})
                    } else {
                        Cookies.remove('ETH.bind_inviter')
                    }
                })
            },

            login() {
                console.log(this.prefix)

                if (!this.phone) {
                    return Toast('请输入手机号码')
                }
                if (!isMobile(this.phone)) {
                    return Toast('请输入正确的手机号')
                }
                if (!this.code) {
                    return Toast('请输入验证码')
                }
                if (!isValidSmsAuthCode(this.code)) {
                    return Toast('验证码错误')
                }

                // 临时token
                // const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTAxMjQzIiwidG9rZW5fdmVyc2lvbiI6IlBKb3hPTDIxZGx4OW42VTQwOSIsImV4cCI6MTU0ODI0Nzk0N30.jkGqPaSGRNd_oKrvl5xLblD3S2pS6N4ODk9eeGC3BzY'
                // Cookies.set('ETH.token', TOKEN, {expires: 1 / 24})
                // this.$router.push({name: 'home', query: {tab: 'join'}})

                UserApi.login({
                    phone: this.phone,
                    phone_code: this.code,
                    phone_prefix: this.prefix, //'86'
                }).then(res => {
                    if (Number(res.status) === -1) {
                        return Toast('验证码错误')
                    }
                    if (Number(res.status) !== 1) {
                        return Toast('请刷新重试')
                    }

                    Cookies.set('ETH.token', res.headers.token, {expires: 1 / 24})
                    this.getInitData()
                    this.checkInviteBind()

                    const redirectUrl = this.$router.query && this.$router.query.redirect_url
                    if (redirectUrl) {
                        window.location.href = redirectUrl
                    }
                    this.$router.push({name: 'home', query: {tab: 'join'}})
                })
            },
            init() {
                Cookies.remove('ETH.token')

                this.prefixSlots[0].values = COUNTRIES.map(country => {
                    const {nameEN, nameCN, code} = country
                    return nameEN + ' ' + nameCN + ' : ' + code
                })
            }
        },
        mounted() {
            this.init()
        }
    }

</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .slideInRight {
        transition: all .25s;
    }

    #login-in {
        padding: 30px;
        background: $clear-color;

        header {
            width: 20px;
            height: 20px;
            background-image: url('../assets/images/icon_back_black.png');
            @include background-image();
        }

        h1 {
            @include fontSize(30);
            margin: 50px 0;
            font-weight: normal;
            line-height: 1.1;

            small {
                @include fontSize($font-medium-s);
                @include fontSubColor($font-sub-color)
            }
        }

        .row {
            position: relative;
            margin: 20px 0;

            label {
                position: absolute;
                left: 0;
                padding: 7px 0;
                @include fontSubColor($font-sub-color);

                .svg-icon {
                    @include px2rem('width', 12);
                    @include px2rem('height', 12);
                }
            }

            input {
                @include fontSize($font-medium-s + 1);
                width: 100%;
                box-sizing: border-box;
                padding: 7px 0;
                border: none;
                border-bottom: 1px solid $border-color;
            }

            span, button {
                @include fontPrimaryColor(#aa1bc0);
                @include fontSize($font-medium-s + 1);
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                box-sizing: border-box;
                background: transparent;
                border: none;
            }

            &.phone-box {
                input {
                    padding-left: 60px;
                }

                .delete {
                    @include px2rem('width', 20);
                    @include px2rem('height', 20);
                    @include px2rem('line-height', 18);
                    @include fontSubColor($font-sub-color);
                    display: block;
                    border-radius: 7px;
                    background: #f1f1f1;
                    text-align: center;
                    padding: 0;
                }
            }
        }

        .btn-box {
            button {
                @include px2rem('height', 42);
                @include px2rem('line-height', 42);
                @include px2rem('margin-top', 100);
                @include background-gradient(#8a1eb2, #430d75);
                @include fontSize($font-medium-s);
                width: 100%;
                box-sizing: border-box;
                display: inline-block;
                color: $clear-color;
                border-radius: 4px;
                border: 1px solid #fff;
            }
        }
    }
</style>
