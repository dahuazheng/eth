<template>
    <div class="day-guess">
        <div class="detail">
            <span>历史结果</span>
            <span>02:40:06</span>
            <span>我的竞猜</span>
        </div>
        <div class="un-join">
            <label>您尚未参与，请立即参与解锁竞猜权益！</label>
            <EthButton name="现在参与" :click="joinNow"/>
        </div>
        <div class="in-join">
            <input type="text" placeholder="明天参与游戏的单日ETH总个数是多少？">
            <EthButton name="现在参与" :click="joinNow"/>
        </div>
    </div>
</template>

<script>
  import EthButton from './EthButton'

  export default {
    name: 'dayGuess',
    components: {EthButton},
    methods: {
      joinNow() {

      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/variable";
    @import "../assets/styles/mixin";

    .day-guess {
        padding: 20px 40px;

        .detail {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 30px 0;
            border-bottom: 1px solid $border-color;

            span {
                @include fontPrimaryColor($primary-color)
            }
        }

        .un-join {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px 0;

            label {
                margin-bottom: $space-width;
            }
        }

        .in-join{
            input{}

        }

    }
</style>