<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: 'noteCodePopup',
    props: ['show'],
    methods: {

    }
  }
</script>

<style lang="scss">
    @import "./assets/styles/variable";
    @import "./assets/styles/mixin";

    html {
        font-size: 75px;
        @include bgColor($clear-color)
    }

    body {
        font-size: 14px;
        margin: 0;
    }

    #app {
        font-family: $font-sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        @include fontColor($font-color);
    }

    input, textarea, button {
        outline: none;
        font-family: $font-sans-serif;
    }

    .svg-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        color: inherit;
        vertical-align: middle;
        fill: none;
        stroke: currentColor;
    }

    .svg-fill {
        fill: currentColor;
        stroke: none;
    }

    .svg-up {
        /* 默认 */
        transform: rotate(0deg);
    }

    .svg-right {
        transform: rotate(90deg);
    }

    .svg-down {
        transform: rotate(180deg);
    }

    .svg-left {
        transform: rotate(-90deg);
    }
</style>
