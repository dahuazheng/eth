<template>
    <div class="picker-popup" v-show="show" @click="cancel">
        <div class="picker-box" @click.stop="">
            <p>
                <span class="cancel" @click="cancel">取消</span>
                {{title}}
                <span class="confirm" @click="confirm(value)">确认</span>
            </p>
            <mt-picker :slots="slots" @change="onChange"></mt-picker>
        </div>
    </div>
</template>
<script>

  export default {
    name: 'pickerPopup',
    props: ['title', 'show', 'slots', 'cancel', 'confirm'],
    data() {
      return {
        value: ''
      }
    },
    methods: {
      onChange(picker, values) {
        this.value = values[0]
      }
    }
  }
</script>
<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .picker-popup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 1000;
    }

    .picker-box {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: $clear-color;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        z-index: 999;

        p {
            @include clearBack;
            padding: 10px 15px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            @include setBorder('border-bottom', 1, solid, $border-color);

            .cancel {
                @include fontSubColor($font-sub-color)
            }

            .confirm {
                @include fontPrimaryColor($font-primary-color)
            }
        }
    }
</style>
