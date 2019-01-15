<template>
    <div class="login-popup animated fadeInRight" v-show="show">
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
            <input type="text" v-model.trim="phone">
            <span class="delete" @click="phone=''">×</span>
        </div>
        <div class="row">
            <input type="number" v-model.trim="code" placeholder="验证码">
            <button id="btn-get-captcha" :disabled="count < 15" @click="onBtnCaptchaClick">{{smsLabel}}</button>
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
    import { COUNTRIES, CAPTCHA_COUNTDOWN_DEFAULT } from '@/api/constants'
    import UserApi from '@/api/user'
    import { isMobile, isValidMessageAuthCode, initNECaptcha } from '@/api/utils'

    export default {
        name: 'loginPopup',
        components: {EthButton, PickerPopup},
        props: ['show'],
        data() {
            return {
                prefix: '86',
                prefixShow: false,
                phone: '',
                code: '',
                count: 15,
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

            // “获取验证码”按钮点击回调
            onBtnCaptchaClick() {
                if (!this.phone) {
                    return Toast('请输入手机号码')
                }
                if (this.phone.length < 7 || this.phone.length > 16) {
                    return Toast('请输入正确的手机号')
                }

                this.initNECaptcha()
                // this.countDown()
                // UserApi.sendSms({
                //     phone: this.phone,
                //     phone_prefix: this.prefix,
                //     type: 'login',
                //     validate: ''
                // }).then(res => {
                //     this.code = res
                // })
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
                setTimeout(() => {
                    this.smsLabel = this.count + ' s'

                    if (this.count >= 0) {
                        this.count -= 1
                        this.startCountDown()
                    } else {
                        this.count = 15
                        // this.count = CAPTCHA_COUNTDOWN_DEFAULT
                        this.smsLabel = '重新获取'
                    }
                }, 1000)
            },

            // 发送邮件
            sendSms(){
                UserApi.sendSms({
                    phone: this.phone,
                    phone_prefix: this.prefix,
                    type: 'login',
                    validate: this.imageCaptcha
                    // type: EMAIL_PURPOSE.REGISTER,
                    // email: email,
                    // validate: imageCaptcha,
                    // captchaId: CAPTCHA_ID
                }).then(res => {
                    if (res.status !== 1) {
                        return
                    }

                    Toast('邮件已发送')
                }).catch(e => {
                    if (DEBUG_MODE) {
                        console.error('Caught Error on UserApi.sendSms', e)
                    }
                    Toast('邮件发送出错')
                })
            },

            login() {
                if (!this.phone) {
                    return Toast('请输入手机号码')
                }
                if (!isMobile(this.phone)) {
                    return Toast('请输入正确的手机号')
                }
                if (!this.code) {
                    return Toast('请输入验证码')
                }
                if (!isValidMessageAuthCode(this.code)) {
                    return Toast('验证码错误')
                }

                UserApi.login({
                    phone: this.phone,
                    phone_code: this.code,
                    invite_code: ''
                }).then(res => {
                    Cookies.set('ETH.token', res.token, {expires: 1})
                    Cookies.set('ETH.token_password', res.token_password, {expires: 1})
                    this.$router.push({name: 'home'})
                })
            },
            init() {
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

    .login-popup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        padding: 30px;
        background: $clear-color;

        h1 {
            @include fontSize(30px);
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
                @include fontSize($font-medium-s);
                width: 100%;
                box-sizing: border-box;
                padding: 7px 0;
                border: none;
                border-bottom: 1px solid $border-color;
            }

            span, button {
                @include fontPrimaryColor(#aa1bc0);
                @include fontSize($font-medium-s);
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                box-sizing: border-box;
                padding: 7px 0;
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
                    display: inline-block;
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
