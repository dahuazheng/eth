<template>
    <div class="popup-box" v-show="show" @click="close">
        <div class="popup" @click.stop>
            <PopupTitle title="短信验证" :back="close"/>
            <div class="input-box">
                <input
                    type="text"
                    @input="change"
                    @change="change"
                    :value="inpCode"
                    placeholder="请输入验证码"
                >
                <button :disabled="count < 60" @click="getSmsCode">{{smsLabel}}</button>
            </div>
            <div class="btn-box">
                <button @click="submit">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
    import PopupTitle from './PopupTitle'
    import {Toast} from 'mint-ui'
    import {UserApi, OrderApi} from '@/api'
    import {isValidSmsAuthCode} from '@/utils'

    export default {
        components: {PopupTitle},
        props: ['show', 'close'],
        data() {
            return {
                smsLabel: '获取验证码',
                count: 60,
                code: null,
            }
        },
        computed: {
            inpCode() {
                return this.code
            }
        },
        methods: {
            // 验证码校验
            change(event) {
                let val = event.target.value.trim()
                // 只能是正整数或空,可根据需求修改正则
                if (/^[0-9]{0,4}$|^$/.test(val)) {
                    this.code = val
                } else {
                    event.target.value = this.code
                }
            },
            countDown() {
                this.count -= 1

                setTimeout(() => {
                    this.smsLabel = this.count + ' s'

                    if (this.count >= 0) {
                        this.countDown()
                    } else {
                        this.count = 60
                        this.smsLabel = '重新获取'
                    }
                }, 1000)
            },
            getSmsCode() {
                this.countDown()
                UserApi.sendUserSms({type: 'order'}).then(res => {
                    console.log(res)
                })
            },
            submit() {
                if (!this.code) {
                    return Toast('请输入验证码')
                }
                if (!isValidSmsAuthCode(this.code)) {
                    return Toast('验证码错误')
                }

                OrderApi.createOrder({phone_code: String(this.code)}).then(res => {
                    if (Number(res.status) === 1) {
                        Toast('参与成功')
                        this.code = null
                        this.$router.go({path: '/', force: true})
                        return
                    }
                    Toast(res.msg)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .popup-box {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: $popup-shade;
        z-index: 999;
    }

    .popup {
        @include px2rem('height', 252);
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background: $clear-color;
        box-sizing: border-box;
        padding-top: 44px;

        .input-box {
            position: relative;
            margin: 30px 15px 40px;
            border-bottom: 1px solid $border-color;

            input {
                @include fontSize($font-medium-s);
                width: 100%;
                padding: 7px 0;
                border: none;
            }

            button {
                @include fontPrimaryColor(#aa1bc0);
                @include fontSize($font-medium-s);
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                box-sizing: border-box;
                /*padding: 7px 0;*/
                background: transparent;
                border: none;
            }
        }

        .btn-box {
            text-align: center;

            button {
                @include px2rem('width', 148);
                @include px2rem('height', 42);
                @include px2rem('line-height', 42);
                @include background-gradient(#c037ed, #9712a3);
                @include fontSize($font-medium-s);
                color: $clear-color;
                border-radius: 5px;
                border: none;
            }
        }
    }

</style>
