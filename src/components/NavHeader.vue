<template>
    <div class="nav-header">
        <router-link to="/user-option" class="nav-back"/>
        <span class="nav-title">{{ title }}</span>
        <span></span>
    </div>
</template>

<script>
    export default {
      name: 'navHeader',
      props: ['title']
    }
</script>

<style lang='scss' scoped>
    @import "../assets/styles/mixin";

    .nav-header {
        display: flex;
        justify-content: space-between;
        padding: 36px 12px;

        .nav-back {
            @include px2rem('width', 20);
            @include px2rem('height', 20);
            @include background-image;
            text-decoration: none;
            background-image: url('../assets/images/icon_back_black.png');
        }

        .nav-title {
            font-size: $font-medium-s + 4;
            font-weight: 600;
            color: #000;
        }
    }
</style>