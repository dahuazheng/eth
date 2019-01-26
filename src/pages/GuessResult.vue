<template>
    <div class="guess-result">
        <PopupTitle title="历史结果" :back="close"/>
        <div class="list">
            <ul>
                <li>
                    <span class="date">日期</span>
                    <span class="number">中奖数字</span>
                    <span class="award">奖项</span>
                    <span class="player">中奖玩家</span>
                    <span class="amount">奖金（eth/inc）</span>
                </li>
                <li v-for="(history, hKey) in historyList" :key="hKey">
                    <span class="date date-top">{{ history.add_time | formatDate}}</span>
                    <span class="number date-top">{{ history.num_true }}</span>

                    <div class="row-content">
                        <div class="row" v-for="(item, key) in history.list" :key="key">
                            <span class="award">{{item.status | transformStatus}}</span>
                            <span class="player">{{item.phone }}</span>
                            <span class="amount text-green">+{{formatDecimal(item.eth, PRECISION.ETH)}}<br> +{{ formatDecimal(item.inc, PRECISION.INC) }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import PopupTitle from '../components/PopupTitle'
    import moment from 'moment'
    import {GuessApi} from '../api'
    import {ensureMilliseconds, encodeMobile, formatDecimal} from '../utils/index'
    import {rewardLevels} from '../utils/options'

    export default {
        components: {PopupTitle},
        data() {
            return {
                historyList: [],
            }
        },
        filters: {
            formatDate(value) {
                if (!value) return
                const formatDate = 'YYYY-MM-DD'
                return moment(ensureMilliseconds(value)).format(formatDate)
            },

            formatPhoneNumber(val) {
                if (!val) return
                return encodeMobile(val)
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

            // 获取历史结果
            getHistoryList() {
                GuessApi.getGuessHistory({}).then(res => {
                    console.log('3245', res)
                    this.historyList = res
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        mounted() {
            this.getHistoryList()
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .guess-result {
        .list {
            margin-top: $margin-width;
        }

        ul {
            @include clearUl();
            width: 100%;

            li {
                display: flex;
                border-bottom: 1px solid $border-bottom-color;

                &:first-child {
                    text-align: center;
                    border-bottom: 1px solid $border-bottom-color;

                    span {
                        font-size: $font-little-s;
                        font-weight: 500;
                    }
                }

                span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: $font-little-s;
                    color: $color-black;
                    text-align: center;
                    padding: 8px 0;

                    &.date {
                        width: 20%;
                    }

                    &.number {
                        width: 15%;

                        &.date-top {
                            text-align: center;
                        }
                    }

                    &.award {
                        width: 15%;

                    }

                    &.player {
                        width: 25%;
                    }

                    &.amount {
                        width: 25%;
                    }
                }

                .row-content {
                    display: flex;
                    flex-direction: column;
                    width: 65%;

                    .row {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        width: 100%;
                        border-bottom: 1px solid $border-bottom-color;

                        &:last-child {
                            border-bottom-color: transparent;
                        }
                    }
                }
            }
        }
    }

</style>
