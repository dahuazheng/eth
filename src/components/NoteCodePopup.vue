<template>
    <div class="popup-box" v-show="show" @click="close">
        <div class="popup" @click.stop>
            <PopupTitle title="短信验证" :back="close"/>
            <div class="input-box">
                <input type="text" placeholder="请输入验证码">
                <span>获取验证码</span>
            </div>
            <div class="btn-box">
                <button @click="toJoinHistory">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
  import PopupTitle from './PopupTitle'

  export default {
    components: {PopupTitle},
    props: ['show', 'close'],
    methods: {
      toJoinHistory() {
        this.$router.push({name: 'joinHistory'})
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .popup-box {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: $popup-shade;
        z-index: 999;
    }

    .popup {
        @include px2rem('height', 252);
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background: $clear-color;

        .input-box {
            position: relative;
            margin: 30px 15px 40px;
            border-bottom: 1px solid $border-color;

            input {
                @include fontSize($font-medium-s);
                width: 100%;
                padding: 7px 0;
            }

            span {
                @include fontPrimaryColor($primary-color);
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                display: inline-block;
                padding: 7px 0;
            }
        }

        .btn-box {
            text-align: center;

            button {
                @include px2rem('width', 148);
                @include px2rem('height', 42);
                @include px2rem('line-height', 42);
                @include background-gradient(#c037ed, #9712a3);
                @include fontSize($font-medium-s);
                color: $clear-color;
                border-radius: 5px;
                border: none;
            }
        }
    }

</style>