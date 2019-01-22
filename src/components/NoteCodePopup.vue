<template>
    <div class="popup-box" v-show="show" @click="close">
        <div class="popup" @click.stop>
            <PopupTitle title="短信验证" :back="close"/>
            <div class="input-box">
                <input type="number" placeholder="请输入验证码" v-model.trim="code">
                <button :disabled="count < 15" @click="getSmsCode">{{smsLabel}}</button>
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
                count: 15,
                code: null,
            }
        },
        methods: {
            countDown() {
                setTimeout(() => {
                    this.smsLabel = this.count + ' s'

                    if (this.count > 0) {
                        this.count -= 1
                        this.countDown()
                    } else {
                        this.count = 15
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
                console.log(this.code)

                OrderApi.createOrder({phone_code: String(this.code)}).then(res => {
                    if(res.status  === '-1') Toast('验证码错误，请重试')
                    console.log(res)
                })
                //this.close()
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
                padding: 7px 0;
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
