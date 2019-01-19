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
                <tr v-for="result in resultList" :key="result.id">
                    <td>{{ result.time | formatDate}}</td>
                    <td>{{ result.awardNumber }}</td>
                    <td>{{ result.awardNo }}</td>
                    <td>{{ result.playerPhone | formatPhoneNumber}}</td>
                    <td class="text-green">+{{result.ethAmount}}<br> +{{ result.incAmount }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import PopupTitle from '../components/PopupTitle'
    import moment from 'moment'
    import { ensureMilliseconds, encodeMobile } from "../utils"

    export default {
        components: {PopupTitle},
        data() {
             return {
                 resultList: [
                     {
                         time: '21312342134',
                         awardNumber: 2,
                         awardNo: 1,
                         playerPhone: '1827283000',
                         ethAmount: 0.67,
                         incAmount: 0.67
                     },
                     {
                         time: '2131234234',
                         awardNumber: 2,
                         awardNo: 2,
                         playerPhone: '1827283000',
                         ethAmount: 0.67,
                         incAmount: 0.67
                     },
                     {
                         time: '21312342134',
                         awardNumber: 2,
                         awardNo: 3,
                         playerPhone: '1827283000',
                         ethAmount: 0.67,
                         incAmount: 0.67
                     }
                 ]
             }
        },
        filters: {
            formatDate(value) {
                if (!value) return
                const formatDate = 'YYYY-MM-DD HH:mm:ss'
                return moment(ensureMilliseconds(value)).format(formatDate)
            },

            formatPhoneNumber(val) {
                if (!val) return
                return encodeMobile(val)
            }
        },
        methods: {
            close() {
                this.$router.push({name: 'home', query: {tab: 'guess'}})
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .guess-result {
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
                    width: 20%;
                    text-align: left;
                }

                &:last-child {
                    text-align: right;
                }
            }

            th {
                padding-bottom: 10px;

                &:first-child {
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
