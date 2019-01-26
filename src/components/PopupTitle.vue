<template>
    <div class="title" :class="{fixed: fixed}">
        <img src="../assets/images/icon_back_black.png" @click="back">
        {{title}}
    </div>
</template>

<script>
    export default {
        props: ['title', 'fixed', 'back']
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .title {
        @include fontSize($font-medium);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-weight: 500;
        background: $clear-color;
        // box-shadow: 1px 1px 5px rgba(0,0,0,0.1);

        &.fixed {
            position: fixed;
        }

        img {
            @include px2rem('width', 20);
            @include px2rem('height', 20);

            position: absolute;
            top: 0;
            bottom: 0;
            left: $margin-width;
            margin: auto;
        }
    }
</style>
