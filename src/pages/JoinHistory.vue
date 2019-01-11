<template>
    <div class="join-history">
        <PopupTitle title="短信验证" :back="close"/>
        <ul>
            <li>
                <span>时间</span>
                <span>序列</span>
            </li>
            <li>
                <span>2019-01-07 12:30:20</span>
                <span>1</span>
            </li>
            <li>
                <span>2019-01-07 12:30:20</span>
                <span>2</span>
            </li>
            <li>
                <span>2019-01-07 12:30:20</span>
                <span>3</span>
            </li>
        </ul>
    </div>
</template>

<script>
  import PopupTitle from '../components/PopupTitle'

  export default {
    components: {PopupTitle},
    methods: {
      close() {
        this.$router.push({name: 'home'})
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/variable";
    @import "../assets/styles/mixin";

    .join-history {
        ul {
            @include clearUl;
            padding: $margin-width;

            li {
                @include px2rem('height', 40);
                @include fontSize($font-little);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0 $space-width;
                border-bottom: 1px solid $border-color;
            }
        }
    }

</style>