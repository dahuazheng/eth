<template>
    <div class="eth-button">
        <button :class="type"
                :style="{borderRadius:borderRadios,border}"
                @click="click">
            {{name}}
        </button>
    </div>
</template>

<script>
  export default {
    name: 'ethButton',
    props: ['name', 'type','border', 'click', 'borderRadios']
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .eth-button {
        display: inline-block;

        button {
            display: inline-block;
            padding: 10px 45px;
            @include background-gradient(#C037ED, #9712A3);
            @include fontSize($font-medium-s);
            box-sizing: border-box;
            color: $clear-color;
            border-radius: 10px;
            border: 1px solid #fff;

            &.white {
                color: $primary-color;
                background: $clear-color;
                border: 1px solid $primary-color;
            }
        }
    }
</style>
