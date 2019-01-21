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
                            <span class="award">{{item.status}}</span>
                            <span class="player">{{item.phone }}</span>
                            <span class="amount text-green">+{{item.eth}}<br> +{{ item.inc }}</span>
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
    import {ensureMilliseconds, encodeMobile} from "../utils"

    export default {
        components: {PopupTitle},
        data() {
            return {
                historyList: [
                    {
                        time: 1547478015,
                        awardNumber: 2,
                        contents: [
                            {
                                awardNo: '一等奖',
                                playerPhone: '1395673975',
                                ethAmount: 0.65,
                                incAmount: 0.65
                            }, {
                                awardNo: '二等奖',
                                playerPhone: '1395673975',
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            }, {
                                awardNo: '三等奖',
                                playerPhone: '1395673975',
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            }, {
                                awardNo: '四等奖',
                                player: '1395673975',
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            }]
                    },
                    {
                        time: 1547478229,
                        awardNumber: 3,
                        contents: [
                            {
                                awardNo: '一等奖',
                                playerPhone: '1395673975',
                                ethAmount: 0.65,
                                incAmount: 0.65
                            },
                            {
                                awardNo: '二等奖',
                                playerPhone: '1395673975',
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            },
                            {
                                awardNo: '三等奖',
                                playerPhone: '1395673975',
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            },
                            {
                                awardNo: '四等奖',
                                playerPhone: '1395673975',
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            },
                            {
                                award: '五等奖',
                                playerPhone: '71395673975',
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            }]
                    }
                ],
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
            }
        },
        methods: {
            close() {
                this.$router.push({name: 'home', query: {tab: 'guess'}})
            },

            getHistoryList() {
                GuessApi.getGuessHistory({}).then(res => {
                    this.historyList = res
                    console.log(this.historyList)
                }).catch(err => {
                    console.error(err)
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
