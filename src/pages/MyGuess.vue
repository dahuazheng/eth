<template>
    <div class="my-guess">
        <PopupTitle title="我的竞猜" :back="close"/>
        <div class="list">
            <table>
                <tr>
                    <th>时间</th>
                    <th>我的竞猜</th>
                    <th>中奖数字</th>
                    <th>结果</th>
                </tr>
                <tr>
                    <td>
                        2019-01-07 <br>
                        12:30:20
                    </td>
                    <td>12</td>
                    <td>16</td>
                    <td>
                        二等奖 <br>
                        +0.0002 ETH <br>
                        +1000 INC
                    </td>
                </tr>
                <tr>
                    <td>
                        2019-01-07 <br>
                        12:30:20
                    </td>
                    <td>32</td>
                    <td>6</td>
                    <td>
                        未中奖<br>
                        +0.0002 ETH <br>
                        +1000 INC
                    </td>
                </tr>
                <tr>
                    <td>
                        2019-01-07 <br>
                        12:30:20
                    </td>
                    <td>32</td>
                    <td>6</td>
                    <td>
                        未中奖<br>
                        +0.0002 ETH <br>
                        +1000 INC
                    </td>
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
                this.$router.push({name: 'home', query: {tab: 'guess'}})
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .my-guess {
        .list {
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

                &:first-child {
                    text-align: left;
                    padding-left: 10px;

                }

                &:last-child {
                    text-align: right;
                    padding-right: 10px;
                }
            }

            th {
                padding-bottom: 10px;
            }
        }
    }

</style>
