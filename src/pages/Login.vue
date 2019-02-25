<template>
    <div class="login">
        <Banner
            :reset="+new Date()"
            :startCountDown="startCountDown"
            :endCountDown="endCountDown"
            :gameStatus="gameStatus"
            :displayCountDown="displayCountDown"
        />
        <main>
            <p><label>请先登录</label></p>
            <p>
                <button @click="toLogin">登录</button>
            </p>
        </main>
        <EthFooter action="home"/>
    </div>
</template>

<script>
    import Banner from '@/components/Banner.vue'
    import EthFooter from '@/components/EthFooter.vue'
    import {countDownMixin} from '../mixins'

    export default {
        name: 'loginIn',
        mixins: [countDownMixin],
        components: {
            Banner, EthFooter
        },
        methods: {
            toLogin() {
                console.log(333)
                //this.$router.push({name: 'home', query: {tab: 'join'}})

                this.$router.push({path: '/login-in'})
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    .login {
        padding-bottom: 50px;
        background: $clear-color;

        main {
            p {
                @include fontSize($font-medium-s);
                margin: 50px 40px;
                text-align: center;

                label {
                    @include fontSize($font-medium);
                    font-color: #474747;
                }

                button {
                    @include px2rem('width', 148);
                    @include px2rem('height', 42);
                    @include px2rem('line-height', 42);
                    @include background-gradient(#C037ED, #9712A3);
                    @include fontSize($font-medium-s);
                    color: $clear-color;
                    border-radius: 5px;
                    border: none;
                    margin-bottom: 50px;
                }
            }
        }
    }
</style>
