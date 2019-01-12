<template>
    <div class="eth-button">
        <button @click="click" :style="{borderRadius:borderRadios}">
            {{name}}
        </button>
    </div>
</template>

<script>
  export default {
    name: 'ethButton',
    props: ['name', 'click', 'borderRadios']
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/variable";
    @import "../assets/styles/mixin";

    .eth-button {
        display: inline-block;

        button {
            @include px2rem('width', 148);
            @include px2rem('height', 42);
            @include px2rem('line-height', 42);
            @include background-gradient(#C037ED, #9712A3);
            @include fontSize($font-medium-s);
            color: $clear-color;
            border-radius: $space-width;
            border: none;
        }
    }
</style>