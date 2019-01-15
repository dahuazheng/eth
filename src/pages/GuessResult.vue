<template>
    <div class="guess-result">
        <PopupTitle title="历史结果" :back="close"/>
        <div class="list">
            <table>
                <tr>
                    <th>日期</th>
                    <th>中奖数字</th>
                    <th>奖项</th>
                    <th>中奖玩家</th>
                    <th>奖金（eth/inc）</th>
                </tr>
                <tr>
                    <td>
                        2019-01-07 <br>
                        12:30:20
                    </td>
                    <td>1</td>
                    <td>二等奖</td>
                    <td>183****5040</td>
                    <td class="text-green">+0.65<br> +0.65</td>
                </tr>
                <tr>
                    <td>
                        2019-01-07 <br>
                        12:30:20
                    </td>
                    <td>1</td>
                    <td>二等奖</td>
                    <td>183****5040</td>
                    <td class="text-green">+0.65<br> +0.65</td>
                </tr>
                <tr>
                    <td>
                        2019-01-07 <br>
                        12:30:20
                    </td>
                    <td>1</td>
                    <td>二等奖</td>
                    <td>183****5040</td>
                    <td class="text-green">+0.65<br> +0.65</td>
                </tr>
            </table>
        </div>
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
    @import "../assets/styles/mixin";

    .guess-result {
        .list{
            margin-top: $margin-width;
            padding: 0 $space-width;
        }

        table {
            width: 100%;
            border-collapse: collapse;

            tr {
                @include fontSize($font-little-s);
                border-bottom: 1px solid $border-color;
            }

            th, td {
                padding: 5px 0;
                text-align: center;
                font-weight: 500;

                &:first-child{
                    text-align: left;
                }

                &:last-child{
                    text-align: right;
                }
            }

            th {
                padding-bottom: 10px;

                &:first-child{
                    padding-left: 10px;
                }
            }

            td {
                &:last-child {
                    padding-right: 10px;
                }
            }
        }
    }

</style>
