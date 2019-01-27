<template>
    <div class="withdraw" @click="showOptions=false">
        <div class="title">
            <span class="nav-back" @click="() => {this.$router.go(-1)}"></span>
            提现
            <span @click="() => {this.$router.push('/withdraw-record')}"></span>
        </div>
        <div class="form">
            <div class="row coin-select">
                <label>选择币种</label>
                <span @click.stop="showOptions = !showOptions">
                    {{coin}}
                    <icon name="down"></icon>
                </span>
                <ul class="options" v-show="showOptions">
                    <li :class="{active: coin==='ETH'}" @click.stop="switchCoin('ETH')">ETH</li>
                    <li :class="{active: coin==='INC'}" @click.stop="switchCoin('INC')">INC</li>
                </ul>
            </div>
            <div class="row">
                <input type="text" placeholder="收款人地址" v-model="address">
            </div>
            <div class="row">
                <input type="text" placeholder="转账金额" v-model="money">
                <span>余额： {{balance[this.coin] + ' ' + coin}}</span>
                <small>手续费：{{coinInfo.withdrawFeeAmount + ' ' + coin}}</small>
            </div>
            <div class="row">
                <input type="text" placeholder="短信验证码" v-model="code">
                <button class="code" :disabled="count < 60" @click="getSmsCode">{{smsLabel}}</button>
            </div>
            <div class="row">
                <label>到账数量</label>
                <span>
                    {{amount}}
                </span>
            </div>

            <div class="row">
                <p class="tip">
                    温馨提示：每人每日最高可提现{{coinInfo.dayMaxWithdrawAmount + ' ' +
                    coin}}，单笔转出限额为{{coinInfo.minWithdrawAmount+'-'+coinInfo.maxWithdrawAmount + ' ' +
                    coin}}，手续费{{coinInfo.withdrawFeeAmount + ' ' + coin}}。
                </p>
            </div>
            <div class="btn-box">
                <EthButton name="下一步" :click="next"/>
            </div>

        </div>
    </div>
</template>

<script>
    import EthButton from '@/components/EthButton.vue'
    import {Toast, MessageBox} from 'mint-ui'
    import {isValidETHWallet, isValidSmsAuthCode} from '../utils'
    import {WalletApi, UserApi} from '../api'
    import {mapState} from 'vuex'

    export default {
        name: 'withdraw',
        components: {EthButton},
        data() {
            return {
                showOptions: false,
                smsLabel: '获取验证码',
                count: 60,
                coin: 'ETH',
                address: '',
                money: '',
                code: '',
                coinInfo: {}
            }
        },
        computed: {
            ...mapState({
                balance: state => state.user.balance,
                asset: state => state.user.asset
            }),

            amount() {
                if (!this.money) return `--${this.coin}`
                return (parseFloat(this.money) - parseFloat(this.coinInfo.withdrawFeeAmount)).toFixed(this.coin === 'ETH' ? 4 : 2) + ' ' + this.coin
            }
        },
        methods: {
            getCoinInfo() {
                WalletApi.getCoinInfo({coin_code: this.coin}).then(res => {
                    console.log(res)
                    this.coinInfo = res
                })
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
                UserApi.sendUserSms({type: 'withdraw'}).then(res => {
                    console.log(res)
                })
            },

            switchCoin(coin) {
                this.coin = coin
                this.showOptions = false
                this.getCoinInfo()
            },
            next() {
                // console.log(this.asset)
                const errors = [
                    {key: 'address', msg: '请填写收款人地址'},
                    {key: 'money', msg: '请输入提现金额'},
                    {key: 'code', msg: '请输入验证码'}]

                const err = errors.some(error => {
                    if (!this[error.key]) {
                        Toast(error.msg)
                        return true
                    }
                })
                if (err) return

                // 判断钱包地址是否是ETH系列钱包
                if (!isValidETHWallet(this.address)) {
                    return Toast(`请输入正确的ETH系钱包地址`)
                }

                // 判断最小提笔币数额
                if (this.money < Number(this.coinInfo.minWithdrawAmount)) {
                    return Toast(`最小提币金额${this.coinInfo.minWithdrawAmount + ' ' + this.coin}`)
                }

                // 判断余额是否充足
                if (this.money > Number(this.balance[this.coin])) {
                    return Toast('余额不足')
                }

                // 判断最大提笔币数额
                if (this.money > Number(this.coinInfo.maxWithdrawAmount)) {
                    return Toast(`最大提币金额${this.coinInfo.maxWithdrawAmount + ' ' + this.coin}`)
                }

                // 校验短信验证码
                if (!isValidSmsAuthCode(this.code)) {
                    return Toast('验证码错误')
                }

                const coinOption = this.asset.find(item => item.coin_code === this.coin)
                // console.log(coinOption)

                WalletApi.applyTransfer({
                    coin_id: coinOption && coinOption.coin_id || '',
                    address: this.address,
                    amount: this.money,
                    sms_code: this.code
                }).then(res => {
                    if (Number(res.status) !== 1) {
                        Toast('申请失败，请重试')
                    }
                    MessageBox.alert('申请成功').then(action => {
                        this.$router.push({name: 'wallet'})
                    })
                })
            }
        },
        mounted() {
            this.getCoinInfo()
        }
    }

</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .withdraw {
        min-height: 100vh;
        background: $clear-color;

        .title {
            @include fontSize($font-medium);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            padding: 0 $margin-width;

            .nav-back {
                @include px2rem('width', 20);
                @include px2rem('height', 20);
                @include background-image;
                text-decoration: none;
                background-image: url('../assets/images/icon_back_black.png');
            }

            span {
                display: inline-block;
                width: 20px;
                height: 20px;
                background-image: url('../assets/images/icon_record.png');
                @include background-image()
            }
        }

        .form {
            padding: 30px 20px;

            .row {
                position: relative;
                margin: 25px 0 15px;

                input {
                    @include fontSize($font-medium-s);
                    width: 100%;
                    padding: 7px 0;
                    border: none;
                    border-bottom: 1px solid $border-color;
                }

                span, button {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    height: 20px;
                    line-height: 20px;
                    display: inline-block;
                }

                small {
                    @include fontSize($font-little);
                    position: absolute;
                    right: 0;
                    bottom: -24px;
                }

                .code {
                    @include fontSize($font-medium-s);
                    padding-right: 0;
                    color: #3f1964;
                    background: transparent;
                    text-align: right;
                }

                .tip {
                    @include px2rem('font-size', 12);
                    color: #a35a85;
                    font-weight: 500;
                    letter-spacing: 1px;
                }

                &.coin-select {
                    position: relative;

                    .options {
                        @include clearUl;
                        position: absolute;
                        right: 0;
                        top: 30px;
                        padding: 5px 0;
                        border: 1px solid #f0f0f0;
                        border-radius: 5px;
                        z-index: 1;
                        text-align: center;
                        background: $clear-color;

                        &::before, &::after {
                            position: absolute;
                            top: -20px;
                            right: 0;
                            left: 0;
                            margin: auto;
                            content: '';
                            width: 0;
                            height: 0;

                            border-top: 10px solid transparent;
                            border-right: 10px solid transparent;
                            border-bottom: 10px solid #f0f0f0;
                            border-left: 10px solid transparent;
                        }

                        &::after {
                            top: -18px;
                            border-bottom: 10px solid $clear-color;
                        }

                        li {
                            padding: 0 20px;
                            line-height: 24px;

                            &.active {
                                color: #ae00b8;
                            }
                        }
                    }
                }
            }

            .btn-box {
                margin-top: 120px;
                text-align: center;
            }
        }
    }
</style>
