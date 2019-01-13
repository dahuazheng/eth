<template>
    <div class="wallet">
        <div class="banner">
            <h1>我的钱包</h1>
        </div>
        <div class="price-box">
            <ul>
                <li>
                    <span>0</span><br>
                    <label>ETH</label>
                </li>
                <li>
                    <span>0</span><br>
                    <label>INC</label>
                </li>
            </ul>
            <p>0x8923kjKJhkjh9879827ufiywiyri2987yhiu</p>
        </div>
        <div class="btn-box">
            <button>
                <img src="../assets/images/collection.png">
                充值
            </button>
            <button @click="chargeMoney">
                <img src="../assets/images/transfer.png">
                提现
            </button>
        </div>
        <div class="records">
            <div class="tabs">
                <span>交易记录</span>
                <span>查看所有</span>
            </div>
            <div class="list">
                <ul>
                    <li></li>
                </ul>
                <img src="../assets/images/icon_no_data.png">
            </div>
        </div>
        <EthFooter action="wallet"/>
        <ChargeMoney :show="chargeMoneyShow" :back="chargeMoneyShow=false"/>
    </div>
</template>

<script>
  import EthFooter from '@/components/EthFooter.vue'
  import ChargeMoney from '@/components/ChargeMoney.vue'
  import Withdraw from '@/components/Withdraw.vue'

  export default {
    components: {EthFooter, ChargeMoney,Withdraw},
    data() {
      return {
        chargeMoneyShow: false
      }
    },
    methods: {
      chargeMoney() {
        this.chargeMoneyShow = true
      }
    }
  }

</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .wallet {
        ul {
            @include clearUl;
        }

        .banner {
            @include px2rem('height', 146);
            background: url('../assets/images/bg_wallet.png') bottom center;
            background-size: cover;

            h1 {
                @include clearBack;
                @include fontSize($font-large-s);
                padding: $margin-width $space-width;
                color: $clear-color;
                font-weight: normal;
            }
        }

        .price-box {
            @include px2rem('margin-top', -61);
            display: flex;
            flex-direction: column;
            align-items: center;

            ul {
                @include px2rem('width', 305);
                @include px2rem('height', 122);
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                background: $clear-color;
                border-radius: 25px;
                border: 1px solid #f6f6f6;

                li {
                    @include fontPrimaryColor(#4a0a79);

                    span {
                        @include fontSize(36px);
                        margin-bottom: $space-width;
                    }

                    label {
                        @include fontSize($font-medium-s);

                    }
                }
            }

            p {
                @include px2rem('height', 28);
                @include px2rem('line-height', 28);
                @include px2rem('border-radius', 14);
                @include fontPrimaryColor(#614292);
                padding: 0 20px;
                background: #efe0fd;
            }
        }

        .btn-box {
            margin: 25px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            button {
                @include px2rem('width', 134);
                @include px2rem('height', 42);
                @include fontPrimaryColor(#662a90);
                @include fontSize($font-medium-s);
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                border: 1px solid #662A90;
                background: #f8edfB;

                img {
                    @include px2rem('width', 21);
                    @include px2rem('height', 21);
                    margin-right: 25px;
                }

                &:last-child {
                    @include px2rem('width', 136);
                    @include px2rem('height', 44);
                    @include background-gradient(#C037ED, #9712A3);
                    border: 1px solid $clear-color;
                    color: $clear-color;
                }
            }
        }

        .records {
            margin: 0 25px;

            .tabs {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                span:last-child {
                    @include fontPrimaryColor(#662a90);
                }
            }

            .list {
                text-align: center;

                img {
                    margin-top: 30px;
                    @include px2rem('width', 151);
                    @include px2rem('height', 151);
                }
            }

        }

    }
</style>