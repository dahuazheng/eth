<template>
    <div class="day-guess">
        <div class="detail">
            <span>历史结果</span>
            <span>02:40:06</span>
            <span>我的竞猜</span>
        </div>
        <div class="un-join">
            <label>您尚未参与解锁竞猜权益！</label>
            <button>现在参与</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'dayGuess'
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
    }
</style>