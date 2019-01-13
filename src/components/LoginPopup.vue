<template>

    <div class="login-popup animated fadeInRight" v-show="show">
        <h1>
            您好，<br>
            <small>欢迎来到1 ETH，首次登陆即注册</small>
        </h1>
        <div class="row phone-box">
            <label>
                +86
                <icon name="down"></icon>
            </label>
            <input type="text">
            <span class="delete">×</span>
        </div>
        <div class="row">
            <input type="text" placeholder="验证码">
            <span @click="getSmsCode">获取验证码</span>
        </div>
        <div class="btn-box">
            <button>登陆</button>
        </div>
    </div>
</template>

<script>
  import EthButton from '@/components/EthButton.vue'

  export default {
    name: 'loginPopup',
    components: {EthButton},
    props: ['show'],
    data() {
      return {
        phone: ''
      }
    },
    methods: {
      getSmsCode() {

      },
      login() {
      }

    }
  }

</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .slideInRight {
        transition: all .25s;
    }

    .login-popup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        padding: 30px;
        background: $clear-color;

        h1 {
            @include fontSize(30px);
            margin: 50px 0;
            font-weight: normal;
            line-height: 1.1;

            small {
                @include fontSize($font-medium-s);
                @include fontSubColor($font-sub-color)
            }
        }

        .row {
            position: relative;
            margin: 20px 0;

            label {
                position: absolute;
                left: 0;
                padding: 7px 0;
                @include fontSubColor($font-sub-color);

                .svg-icon {
                    @include px2rem('width', 12);
                    @include px2rem('height', 12);

                }
            }

            input {
                @include fontSize($font-medium-s);
                width: 100%;
                box-sizing: border-box;
                padding: 7px 0;
                border: none;
                border-bottom: 1px solid $border-color;
            }

            span {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                box-sizing: border-box;
                padding: 7px 0;
                @include fontPrimaryColor(#aa1bc0);
            }

            &.phone-box {
                input {
                    padding-left: 60px;
                }

                .delete {
                    @include px2rem('width', 20);
                    @include px2rem('height', 20);
                    @include px2rem('line-height', 18);
                    @include fontSubColor($font-sub-color);
                    display: inline-block;
                    border-radius: 7px;
                    background: #f1f1f1;
                    text-align: center;
                    padding: 0;
                }
            }
        }

        .btn-box {
            button {
                @include px2rem('height', 42);
                @include px2rem('line-height', 42);
                @include px2rem('margin-top', 100);
                @include background-gradient(#8a1eb2, #430d75);
                @include fontSize($font-medium-s);
                width: 100%;
                box-sizing: border-box;
                display: inline-block;
                color: $clear-color;
                border-radius: 4px;
                border: 1px solid #fff;
            }
        }

    }

</style>