<template>
    <div class="join-now">
        <div class="btn-box " :class="{gray: startCountDown > 0 || endCountDown <= 0}" @click="join">
            <b></b>
            <span>{{startCountDown > 0 || endCountDown <= 0 ? '等待游戏开始' : '立即参与 1 EHT'}}</span>
            <img src="../assets/images/bg_eth.png">
        </div>
        <p>
            <span @click="toHistory">参与历史</span>
            <small>我的累积参与：{{joinCount}}次</small>
            <small>钱包余额：{{balance.ETH}} ETH</small>
        </p>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import {OrderApi} from "../api"
    import {countDownMixin} from "../mixins"

    export default {
        props: ['open', 'balance'],
        mixins: [countDownMixin],
        data() {
            return {
                joinCount: 0
            }
        },
        methods: {
            toHistory() {
                this.$router.push({name: 'joinHistory'})
            },
            join() {
                if (this.startCountDown > 0 || this.endCountDown <= 0) return
                // 0.1ETC 1000INC
                // 您的余额不足，请先充值后参与
                if (this.balance.ETH < 0.1 || this.balance.INC < 1000) {
                    return Toast('您的余额不足，请先充值后参与')
                }

                this.open()
            },

            // 获取参与次数
            getOrderList() {
                OrderApi.getOrderList({page: '1', limit: '1'}).then(res => {
                    this.joinCount = res.data && res.data.count || 0
                }).catch(err => {
                    console.error(err)
                })
            }
        },
        mounted() {
            this.getOrderList()
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .join-now {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .btn-box {
            @include px2rem('width', 237);
            @include px2rem('height', 84);
            @include fontColor(#FEDF9A);
            position: relative;
            box-sizing: border-box;
            margin-top: 70px;
            padding-top: 32px;

            img {
                @include px2rem('width', 74);
                @include px2rem('height', 74);
                position: absolute;
                top: -37px;
                left: 0;
                right: 0;
                margin: auto;
                filter: none;
            }

            b {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                background-size: cover;
                background-image: url('../assets/images/bg_bet.png');
            }

            span {
                position: relative;
            }

            &.gray {
                b {
                    -webkit-filter: grayscale(100%);
                    -moz-filter: grayscale(100%);
                    -ms-filter: grayscale(100%);
                    -o-filter: grayscale(100%);
                    filter: grayscale(100%);
                    filter: alpha(#ccc);
                    opacity: 0.35;
                }

                span {
                    color: #000;
                }
            }
        }

        p {
            position: relative;
            @include fontColor($primary-color);
            display: flex;
            flex-direction: column;
            margin-top: -20px;
            line-height: 1.6;
            z-index: 2;

            span {
                display: inline-block;
                padding-top: 10px;
            }

            small {
                @include fontSubColor($font-sub-color);
            }
        }
    }
</style>
