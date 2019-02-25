<template>
    <div class="join-now">
        <div class="btn-box " :class="{gray: gameStatus === 2}" @click="join">
            <b></b>
            <span>{{gameStatus === 2 ? '等待游戏开始' : '立即参与 1 ETH'}}</span>
            <img src="../assets/images/bg_eth.png">
        </div>
        <p>
            <span @click="toHistory">参与历史</span>
            <small>我的累积参与：{{joinCount || 0}}次</small>
            <small>钱包余额：{{balance.ETH}} ETH / {{balance.INC}} INC</small>
        </p>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        props: ['open', 'balance', 'gameStatus', 'joinCount'],
        methods: {
            toHistory() {
                this.$router.push({name: 'joinHistory'})
            },
            join() {
                if (this.gameStatus === 2) return
                if (this.balance.ETH < 0.5 || this.balance.INC < 5000) {
                    return Toast('您的余额不足，请先充值后参与')
                }

                this.open()
            }
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
            @include fontColor($primary-color);
            position: relative;
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
