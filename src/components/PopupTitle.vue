<template>
    <div class="title">
        <icon name="arrow-left" @click="back"></icon>
        {{title}}
    </div>
</template>

<script>
  export default {
    props: ['title', 'back']
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .title {
        @include fontSize($font-medium);
        position: relative;
        padding: $margin-width 0;
        text-align: center;
        font-weight: bold;

        .svg-icon {
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