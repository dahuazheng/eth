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
            @include px2rem('width', 148);
            @include px2rem('height', 42);
            @include px2rem('line-height', 42);
            @include background-gradient(#C037ED, #9712A3);
            @include fontSize($font-medium-s);
            box-sizing: border-box;
            display: inline-block;
            color: $clear-color;
            border-radius: $space-width;
            border: 1px solid #fff;

            &.white {
                color: $primary-color;
                background: $clear-color;
                border: 1px solid $primary-color;
            }
        }
    }
</style>