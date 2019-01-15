<template>
    <div class="my-award">
        <div class="price-box">
            <span>
                奖励总额：
                <img src="../assets/images/icon_help.png">
            </span>
            <small>
                0.000000 ETH / 0.000000 INC
            </small>
            <div class="explain-box">
                <ul>
                    <li>
                        <label>静态分红奖</label>
                        <span>0.000000 ETH</span>
                        <span>0.000000 INC</span>
                    </li>
                    <li>
                        <label>动态分红奖</label>
                        <span>0.000000 ETH</span>
                        <span>0.000000 INC</span>
                    </li>
                    <li>
                        <label>高级经理奖</label>
                        <span>0.000000 ETH</span>
                        <span>0.000000 INC</span>
                    </li>
                    <li>
                        <label>每日竞猜奖</label>
                        <span>0.000000 ETH</span>
                        <span>0.000000 INC</span>
                    </li>
                    <li>
                        <label>24H 直推龙虎榜</label>
                        <span>0.000000 ETH</span>
                        <span>0.000000 INC</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="btn-tabs">
            <EthButton name="提现" border="1px solid #f1e2ff" :click="withdraw"/>
            <EthButton name="我的直推" type="white" :click="recommend"/>
        </div>
        <p>加油！推荐30自动成为经理，可以获得50代的推荐奖。</p>
    </div>
</template>

<script>
  import EthButton from './EthButton'

  export default {
    components: {EthButton},
    methods: {
      withdraw() {

      },
      recommend() {
          this.$router.push('/user-center')
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .my-award {
        padding: 30px 20px;
        background: #f1e2ff;

        .price-box {
            @include fontPrimaryColor($primary-color);
            @include fontSize($font-medium-s);
            position: relative;
            margin: 20px 0;
            font-weight: normal;
            text-align: center;

            span {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                color: #3F1964;
            }

            img {
                @include px2rem('width', 16);
                @include px2rem('height', 16);
            }

            .explain-box {
                @include px2rem('height', 209);
                position: absolute;
                bottom: 30px;
                left: 0;
                right: 0;
                margin: auto;
                width: 100%;
                background: url('../assets/images/bg_dialog_come.png') center;
                background-size: 100% 100%;

                ul {
                    @include clearUl;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: start;
                    align-items: center;
                    margin: $margin-width;

                    > li {
                        @include fontSize($font-little-s);
                        @include px2rem('padding-top', 15);

                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 33.333%;
                        line-height: 1.6;

                        label {
                            margin-bottom: 5px;
                            @include fontColor($font-color)
                        }
                    }
                }
            }
        }

        .btn-tabs {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        p {
            @include fontPrimaryColor(#A35A85);
            @include fontSize($font-little);
            margin-top: 30px;
            text-align: center;
        }
    }
</style>
