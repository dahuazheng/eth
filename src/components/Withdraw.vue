<template>
    <div class="withdraw">
        <div class="title">
            <icon name="arrow-left"></icon>
            提现
            <icon name="scan-code" class="scan"></icon>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .withdraw {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background: $clear-color;

        .title {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            padding: 0 $margin-width;
        }
    }
</style>