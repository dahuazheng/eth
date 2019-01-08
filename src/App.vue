<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "./assets/styles/variable";
    @import "./assets/styles/mixin";

    html {
        font-size: 75px;
        @include bgColor($default-color)
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

    textarea {
        font-family: $font-sans-serif;
    }

    .icon{
        @include px2rem('width',20);
        @include px2rem('height',20);
    }
</style>
