<template>
    <div id='rank-banner'>
        <div class='rank-content__arrow'>
            <img src='../assets/images/icon_back_white.png' alt=''>
        </div>

        <div class='rank-content__text'>
            <p>24 H直推龙虎榜</p>
            <p>(奖金池 0.690 ETH/1203.0 INC</p>
            <p>（04:30:03后更新）</p>
            <button class='btn btn-visit-num'><span>今日邀请数</span> <br> 0</button>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'rankBanner',
    data() {
      return {}
    }
  }
</script>
<style lang='scss' scoped>
    @import '../assets/styles/mixin';

    #rank-banner {
        @include px2rem('height', 292);
        position: relative;
        box-sizing: border-box;
        padding: 15px 0;
        background-image: url('../assets/images/bg_tigger.png');
        background-size: 100% 100%;

        .rank-content__arrow {
            padding-left: 12px;

            img {
                @include px2rem('width', 20);
                @include px2rem('height', 20);
            }
        }

        .rank-content__text {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: auto;
            line-height: 1.5;
            text-align: center;
            padding-bottom: 20px;

            p {
                &:nth-child(1) {
                    font-size: $font-large + 1;
                    color: $color-white;
                }

                &:nth-child(2) {
                    font-size: $font-little-s;
                    color: $color-orange;
                }

                &:nth-child(3) {
                    font-size: $font-little-s;
                    color: $color-purple;
                }
            }

            button {
                &.btn-visit-num {
                    @include px2rem('width', 140);
                    @include px2rem('height', 67);
                    border: none;
                    background-image: url('../assets/images/bg_circle.png');
                    background-size: 100% 100%;
                }
                
                span {
                    color: #f2bf86;
                }
                
            }
        }
    }
</style>