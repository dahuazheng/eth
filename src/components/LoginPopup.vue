<template>
    <div class="login-popup">
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
        </div>
        <div class="row">
            <input type="text" placeholder="验证码">
            <span>获取验证码</span>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

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
                padding: 7px 0;

                .svg-icon{

                }
            }

            input {
                @include fontSize($font-medium-s);
                width: 100%;
                padding: 7px 0;
                border: none;
                border-bottom: 1px solid $border-color;
            }
        }

    }

</style>