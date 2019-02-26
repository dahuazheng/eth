<template>
    <div class="my-guess">
        <PopupTitle title="我的竞猜" :fixed="true" :back="close"/>
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
                    <td>{{ Number(item.numTrue) === 0 ? item.numTrue : '未开奖' }}</td>
                    <td>
                        {{ item.status | transformStatus }} <br>
                        <small>+{{ item.eth }} ETH</small>
                        <br>
                        <small>+{{ item.inc }} INC</small>
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
    import {ensureMilliseconds} from '../utils'
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
                return option && option.label || '未开奖'
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
        created() {
            this.getMyGuessList()
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .my-guess {
        padding-top: 44px;

        .list {
            margin-top: $margin-width;
            padding: 0 $space-width;
        }

        table {
            width: 100%;
            border-collapse: collapse;

            tr {
                @include fontSize($font-little);
                border-bottom: 1px solid $border-color;
            }

            th, td {
                width: 25%;
                padding: 5px 0;
                text-align: center;
                font-weight: normal;

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
