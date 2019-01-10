<template>
    <div class="footer">
        <ul>
            <li>
                <img src="" alt="">
                <span>钱包</span>
            </li>
            <li>
                <img src="" alt="">
                <span>1ETH</span>
            </li>
            <li>
                <img src="" alt="">
                <span>我的</span>
            </li>
        </ul>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    @import "../assets/styles/variable";
    @import "../assets/styles/mixin";

    .footer {
        ul {
            @include clearUl;
            @include px2rem('height', 56);
            display: flex;
            flex-direction: row;
            align-items: center;

            li {
                color: $font-third-color;

                &.active {
                    @include fontSize($font-little);
                    color: $primary-color;
                }
            }
        }
    }
</style>