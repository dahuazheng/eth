<template>
    <div class="join-now">
        <div class="btn-box" @click="join">
            <img src="../assets/images/bg_eth.png">
            立即参与 1 EHT
        </div>
        <p>
            <span @click="toHistory">参与历史</span>
            <small>我的累积参与：0次</small>
            <small>钱包余额：{{balance.ETH}} ETH</small>
        </p>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        props: ['open', 'balance'],
        methods: {
            toHistory(){
                this.$router.push({name: 'joinHistory'})
            },
            join() {
                // 0.1ETC 1000INC
                // 您的余额不足，请先充值后参与
                if (this.balance.ETH < 0.1 || this.balance.INC < 1000) {
                    return Toast('您的余额不足，请先充值后参与')
                }

                this.open()
                this.$router.push({name: 'home'})
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
            background-image: url('../assets/images/bg_bet.png');
            background-size: cover;

            img {
                @include px2rem('width', 74);
                @include px2rem('height', 74);
                position: absolute;
                top: -37px;
                left: 0;
                right: 0;
                margin: auto;
            }
        }

        p {
            @include fontColor($primary-color);
            display: flex;
            flex-direction: column;
            margin-top: -10px;
            line-height: 1.6;

            small {
                @include fontSubColor($font-sub-color);
            }
        }
    }
</style>
