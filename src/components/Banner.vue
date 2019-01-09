<template>
    <div class="banner">
        <div class="cup">
            <img src="../assets/images/icon_cup.png" alt="">
            <span>龙虎榜</span>
        </div>
        <div class="content">
            <div class="jackpot">
                <img class="logo" src="../assets/images/icon_eth_download.png" alt="">
                <span>x</span>
                <img src="../assets/images/icon_eth_star.png" alt="">
            </div>
            <div class="price-box">

            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'banner',
    data() {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
    @import "../assets/styles/variable";
    @import "../assets/styles/mixin";

    .banner {
        @include px2rem('height', 288);
        @include background-gradient-diagonal($color-from, $color-to);
        position: relative;
        box-sizing: border-box;
        padding: 15px 0;

        .cup {
            position: absolute;
            top: $space-width;
            left: $space-width;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                @include px2rem('width', 35);
                @include px2rem('height', 38);
            }

            span {
                @include px2rem('height', 22);
                @include px2rem('line-height', 22);
                @include fontSize($font-little);
                margin-top: 8px;
                display: inline-block;
                padding: 0 5px;
                border-radius: 10px;
                border: 1px solid $gold-color;
                color: $gold-color;
            }
        }

        .content {
            height: 100%;
            background-image: url('../assets/images/bg_eth_title.png');
            background-size: cover;
            text-align: center;

            .jackpot {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                img {
                    @include px2rem('height', 46);
                    @include px2rem('line-height', 52);

                    &.logo {
                        @include px2rem('height', 64);
                        @include px2rem('line-height', 64);
                    }
                }

                span {
                    @include px2rem('height', 20);
                    @include px2rem('line-height', 20);
                    @include fontSize($font-large);
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 6px;
                    margin: auto;
                    display: inline-block;
                    color: $gold-color;
                }
            }

        }
    }
</style>