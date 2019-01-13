<template>
    <div class="login">
        <Banner/>
        <main>
            <p><label>请先登录</label></p>
            <p>
                <button @click="toLogin">登陆</button>
            </p>
        </main>
        <EthFooter action="home"/>
        <LoginPopup/>
    </div>
</template>

<script>
  import Banner from '@/components/Banner.vue'
  import EthFooter from '@/components/EthFooter.vue'
  import LoginPopup from '@/components/LoginPopup.vue'
  import {UserApi} from '@/api'

  export default {
    name: 'login',
    components: {
      Banner, EthFooter, LoginPopup
    },
    data() {
      return {}
    },
    methods: {
      toLogin() {
        UserApi.login()
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    .login {
        position: relative;
        height: 100%;
        background: $clear-color;

        main {
            p {
                @include fontSize($font-medium-s);
                margin: 40px;
                text-align: center;

                label {
                    @include fontSize($font-medium);
                    @include fontSubColor($font-sub-color);
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
                }
            }
        }
    }
</style>
