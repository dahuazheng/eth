<template>
    <div class="footer">
        <ul>
            <li @click="handleTab('wallet')" :class="{active: action ==='wallet'}">
                <img v-if="action ==='wallet'" src="../assets/images/wallet_press.png">
                <img v-else src="../assets/images/wallet_nomal.png">
                <span>钱包</span>
            </li>
            <li @click="handleTab('home')" :class="{active: action ==='home'}">
                <img v-if="action ==='home'" src="../assets/images/eth_press.png">
                <img v-else src="../assets/images/eth_nomal.png">
                <span>1 ETH</span>
            </li>
            <li @click="handleTab('userOption')" :class="{active: action  ==='userOption'}">
                <img v-if="action ==='userOption'" src="../assets/images/me_press.png">
                <img v-else src="../assets/images/me_nomal.png">
                <span>我的</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import UserApi from '@/api/user'

    export default {
        name: 'ethFooter',
        props: ['action'],
        methods: {
            handleTab(action) {
                if (!UserApi.isOnline()) {
                    if (action === 'home') {
                        return
                    }
                    if (this.$route.name === 'login') {
                        Toast('请先登录')
                        return
                    }

                    this.$router.push({name: 'login'})
                }

                this.$router.push({name: action})
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 1px solid $border-color;
        background: $clear-color;

        ul {
            @include clearUl;
            @include px2rem('height', 56);
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;

            li {
                @include fontSize($font-little);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: $font-third-color;

                img {
                    @include px2rem('width', 25);
                    @include px2rem('height', 26);
                }

                &.active {
                    color: $primary-color;
                }
            }
        }
    }
</style>
