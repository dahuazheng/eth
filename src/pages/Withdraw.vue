<template>
    <div class="withdraw" @click="showOptions=false">
        <div class="title">
            <icon name="arrow-left" @click="() => {this.$router.go(-1)}"></icon>
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
                <span>余额： 0 ETH</span>
                <small>手续费：0.0001 ETH</small>
            </div>
            <div class="row">
                <input type="text" placeholder="转账金额" v-model="code">
                <span class="code">获取验证码</span>
            </div>
            <div class="row">
                <label>到账数量</label>
                <span>
                    --ETH
                </span>
            </div>

            <div class="row">
                <p class="tip">温馨提示：每人每日最高可提现1000ETH，单笔转出限额为100-1000ETH，手续费0.0001ETH。</p>
            </div>
            <div class="btn-box">
                <EthButton name="下一步" :click="next"/>
            </div>

        </div>
    </div>
</template>

<script>
    import EthButton from '@/components/EthButton.vue'
    import {Toast} from 'mint-ui'

    export default {
        name: 'withdraw',
        components: {EthButton},
        data() {
            return {
                showOptions: false,
                coin: 'INC',
                address: '',
                money: '',
                code: ''
            }
        },
        methods: {
            switchCoin(coin) {
                this.coin = coin
                this.showOptions = false
            },
            next() {
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
            }
        }
    }

</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .withdraw {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background: $clear-color;

        .title {
            @include fontSize($font-medium);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            padding: 0 $margin-width;

            .svg-icon {
                width: 20px;
                height: 20px;
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

                span {
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
                    color: #3f1964;
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
