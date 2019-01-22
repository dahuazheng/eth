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
                <tr v-for="item in myAwardList" :key="item.id">
                    <td>
                        {{ item.addTime | formatDate}}
                    </td>
                    <td>{{ item.numGuess }}</td>
                    <td>{{ item.numTrue }}</td>
                    <td>
                        {{ item.status | transformStatus }} <br>
                        +{{ item.eth }} ETH <br>
                        +{{ item.inc }} INC
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import PopupTitle from '../components/PopupTitle'
    import {GuessApi} from '../api'
    // import Cookies from 'js-cookie'
    import moment from 'moment'
    import { ensureMilliseconds } from '../utils'
    import {rewardLevels} from '../utils/options'

    export default {
        components: {PopupTitle},
        data() {
            return {
                myAwardList: []
            }
        },
        filters: {
            formatDate(value) {
                if (!value) return
                const formatDate = 'YYYY-M-DD'
                return moment(ensureMilliseconds(value)).format(formatDate)
            },
            // 状态值转换中奖等级
            transformStatus(value) {
                const option = rewardLevels.find(reward => reward.value === String(value))
                return option && option.label || '未中奖'
            },
        },
        methods: {
            close() {
                this.$router.push({name: 'home', query: {tab: 'guess'}})
            },

            // 请求我的竞猜
            getMyGuessList() {
                GuessApi.getMyGuessList().then(res => {
                    this.myAwardList = res
                }).catch(err => {
                    console.error(err)
                })
            }
        },
        mounted() {
            this.getMyGuessList()
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
