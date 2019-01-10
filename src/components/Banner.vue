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
                <label>当前奖池</label>
                <p>769.2ETH / 2313503.2 INC</p>
                <div class="row">
                    <span>累计参与额</span>
                    <span>
                        10470
                        <img class="icon-bet" src="../assets/images/icon_bet_eth.png">
                    </span><span>
                        10470
                        <img class="icon-star" src="../assets/images/icon_bet_eth_star.png">
                    </span>
                </div>
                <div class="row">
                    <span>今日参与额</span>
                    <span>
                        10470
                        <img class="icon-bet" src="../assets/images/icon_bet_eth.png">
                    </span>
                    <span>
                        10470
                        <img class="icon-star" src="../assets/images/icon_bet_eth_star.png">
                    </span>
                </div>
            </div>
            <div class="time">
                02:45:00
            </div>
            <div class="message">
                <icon name="small-bell" class="icon" ></icon>
                <span></span>
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
            position: relative;
            height: 100%;
            background-image: url('../assets/images/bg_eth_title.png');
            background-size: 100% 100%;
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
                    color: #FFE500;
                }
            }

            .price-box {
                @include fontSize($font-little-s);
                padding: 10px;
                color: $default-color;

                p {
                    @include fontSize($font-medium);
                    margin: $margin-width 0;
                    color: $gold-color;
                }

                .row {
                    @include px2rem('height', 16);
                    margin-bottom: $margin-width;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;

                    span {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        margin: $space-width;

                        img {
                            margin-left: 5px;
                            @include px2rem('width', 16);
                            @include px2rem('height', 16);
                        }

                        .icon-star {
                            @include px2rem('width', 13);
                            @include px2rem('height', 15);
                        }
                    }
                }

            }

            .time {
                @include fontSize($font-medium);
                color: #94D9FF;
            }

            .message {
                @include px2rem('width', 272);
                @include px2rem('height', 38);
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                display: inline-block;
                border: 1px solid $border-color;
                border-radius: 19px;

                .icon {
                    @include px2rem('width', 22);
                    @include px2rem('height', 22);
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 10px;
                    margin: auto;
                    color: $clear-color;
                }
            }
        }
    }
</style>