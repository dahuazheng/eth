<template>
    <div class="login">
        <Banner/>
        <main>
            <p><label>请先登录</label></p>
            <p>
                <button @click="toLogin">登录</button>
            </p>
        </main>
        <EthFooter action="home"/>
        <LoginPopup :show="loginPopupShow"/>
    </div>
</template>

<script>
  import Banner from '@/components/Banner.vue'
  import EthFooter from '@/components/EthFooter.vue'
  import LoginPopup from '@/components/LoginPopup.vue'
  import { UserApi } from '../api/user'

  export default {
    name: 'login',
    components: {
      Banner, EthFooter, LoginPopup
    },
    data() {
      return {
        loginPopupShow: false
      }
    },
    methods: {
      toLogin() {
        this.loginPopupShow = true
        //UserApi.login()
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    .login {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: $clear-color;

        main {
            p {
                @include fontSize($font-medium-s);
                margin: 40px;
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
                }
            }
        }
    }
</style>
