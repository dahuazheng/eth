<template>
    <div id="rank-tab">
        <div class="rank-tab__header">
            <span :class="{active: currTab === 'live'}" @click="checkTab('live')">24H 直推龙虎榜</span>
            <span :class="{active: currTab === 'history'}" @click="checkTab('history')">龙虎榜历史</span>
            <span :class="{active: currTab === 'my-rank'}" @click="checkTab('my-rank')">我的龙虎榜</span>
        </div>

        <div class="rank-tab__body">
            <!--24小时直推龙虎榜-->
            <ul class="live" v-show="currTab === 'live'">
                <li>
                    <span class="num">名次</span>
                    <span class="name">手机号</span>
                    <span class="account">奖励总额</span>
                    <span class="per">直推个数/展开</span>
                </li>
                <!--以下 同一名次对应多个用户-->
                <li v-for="(live, liveKey) in liveList" :key="liveKey" :class="'color-' + liveKey">
                    <span class="num">
                        <span class="icon" :class="'icon-' + liveKey"></span>
                    </span>
                    <span class="name">{{ live.phone}}</span>
                    <span class="account">
                        {{ live.eth_amount }} ETH
                        <br>
                        {{ live.inc_amount }} INC
                    </span>
                    <span class="per">{{ live.push_count }}</span>
                </li>
            </ul>

            <!--龙虎榜历史-->
            <ul class="history" v-show="currTab === 'history'">
                <li>
                    <span class="date">日期</span>
                    <span class="award">奖项</span>
                    <span class="player">获奖玩家</span>
                    <span class="num">直推个数</span>
                    <span class="amount">金额（eth/inc）</span>
                </li>
                <li v-for="history in dayPushHistoryList" :key="history.date">
                    <span class="date date-top">{{ history.date}}</span>

                    <div class="row-content">
                        <div class="row" v-for="row in history.list" :key="row.user_id">
                            <span class="award">{{row.rank | transformStatus}}</span>
                            <span class="player">{{row.phone}}</span>
                            <span class="num">{{row.push_count}}</span>
                            <span class="amount text-green">
                                +{{row.eth_amount}}
                                <br>
                                +{{row.inc_amount}}
                            </span>
                        </div>
                    </div>
                </li>
            </ul>

            <!--我的龙虎榜-->
            <table class="my-rank" v-show="currTab === 'my-rank'">
                <tr>
                    <td>日期</td>
                    <td>直推个数</td>
                    <td>结果</td>
                </tr>
                <tr v-for="myRank in myRankList" :key="myRank.date">
                    <td>{{ myRank.date }}</td>
                    <td>{{ myRank.pushCount }}</td>
                    <td>{{ myRank.rank | transformStatus }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import {ensureMilliseconds, encodeMobile} from "../utils";
    import {rewardLevels} from '../utils/options'
    import {RankApi} from "../api";


    export default {
        name: "rank-tab",
        data() {
            return {
                currTab: 'live',
                liveList: [],
                dayPushHistory: {},
                myRankList: []
            };
        },
        computed: {
            dayPushHistoryList() {
                const dayPushHistory = Object.keys(this.dayPushHistory)
                if (!this.dayPushHistory || !dayPushHistory.length) {
                    return []
                }

                return dayPushHistory.map(dayPushKey => {
                    return {
                        date: dayPushKey,
                        list: this.dayPushHistory[dayPushKey]
                    }
                })
            }
        },
        filters: {
            formatDate(value) {
                if (!value) return;
                const formatDate = "YYYY-M-DD";
                return moment(ensureMilliseconds(value)).format(formatDate)
            },

            formatPhoneNumber(val) {
                if (!val) return;
                return encodeMobile(val);
            },

            // 状态值转换中奖等级
            transformStatus(value) {
                const option = rewardLevels.find(reward => reward.value === String(value));
                return option && option.label || '未中奖'
            },
        },
        methods: {
            checkTab(val) {
                this.currTab = val;
            },

            // 24h 直推龙虎榜
            getDayPush() {
                RankApi.getDayPush().then(res => {
                    if(Number(res.status)===1){
                        this.liveList = res.data && res.data.list
                    }
                });
            },

            // 龙虎榜历史
            getDayPushHistory() {
                RankApi.getDayPushHistory().then(res => {
                    // this.dayPushHistory = res.data && res.data.list;
                });
            },

            // 我的龙虎榜
            getWinnerList() {
                RankApi.getWinnerList().then(res => {
                    this.myRankList = res
                })

            }
        },
        mounted() {
            this.getDayPush();
            this.getDayPushHistory();
            this.getWinnerList();
        }
    };
</script>

<style lang='scss' scoped>
    @import "../assets/styles/mixin";

    #rank-tab {
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .rank-tab__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            @include fontSize($font-little);

            span {
                display: inline-block;
                padding: 10px;
                text-align: center;
                color: #9e9f9d;
                @include px2rem("width", 105);
                @include px2rem("height", 35);

                &.active {
                    background-image: url("../assets/images/bg_bet.png");
                    color: $color-white;
                    @include background-image();
                }
            }
        }

        .rank-tab__body {
            ul {
                width: 100%;

                &.live {
                    li {
                        display: flex;
                        align-items: center;
                        flex-direction: row;
                        justify-content: space-around;
                        border-bottom: 1px solid $border-color;

                        .icon {
                            @include px2rem("width", 30);
                            @include px2rem("height", 30);
                            display: inline-block;
                            background-size: 100% 100%;
                            padding: 0;

                            &.icon-0 {
                                background-image: url("../assets/images/icon_one.png");
                            }

                            &.icon-1 {
                                background-image: url("../assets/images/icon_two.png");
                            }

                            &.icon-2 {
                                background-image: url("../assets/images/icon_three.png");
                            }

                            &.icon-3 {
                                background-image: url("../assets/images/icon_four.png");
                            }

                            &.icon-4 {
                                background-image: url("../assets/images/icon_five.png");
                            }
                        }

                        span {
                            position: relative;
                            @include fontSize($font-little);
                            padding: 8px 0;
                            box-sizing: border-box;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            &.num {
                                width: 20%;
                            }

                            &.name {
                                width: 30%;
                            }

                            &.account {
                                width: 20%;
                            }

                            &.per {
                                width: 30%;
                            }
                        }

                        &.color-0 {
                            color: #daa032;
                        }

                        &.color-1 {
                            color: #b6babd;
                        }

                        &.color-2 {
                            color: #c59567;
                        }

                        &.color-3 {
                            color: #d0b791;
                        }

                        &.color-4 {
                            color: #d0b791;
                        }
                    }
                }

                &.history {
                    li {
                        display: flex;
                        justify-content: space-around;
                        border-bottom: 1px solid $border-bottom-color;
                        padding: 10px 0;

                        &:first-child {
                            text-align: center;
                            @include fontSize($font-little-s);
                            padding-bottom: 13px;
                            border-bottom: 1px solid $border-bottom-color;

                            span {
                                padding-top: 0;
                            }
                        }

                        span {
                            display: flex;
                            align-items: flex-start;
                            @include fontSize($font-little);
                            padding-top: 3px;
                            padding-bottom: 3px;
                            color: $color-black;
                            font-weight: 500;
                            text-align: center;

                            &.date,
                            &.player {
                                display: inline;
                                width: 20%;
                            }

                            &.award,
                            &.num {
                                width: 13%;
                            }

                            &.date {
                                padding-left: 15px;
                                text-align: left;
                                @include fontSize($font-little-s);

                                &.date-top {
                                    padding-top: 10px;
                                }
                            }
                        }

                        .row-content {
                            display: flex;
                            flex-direction: column;
                            width: 100%;

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

            table.my-rank {
                width: 100%;
                border-collapse: collapse;

                tr {
                    border-bottom: 1px solid $border-bottom-color;
                    @include fontSize($font-little - 1);
                    font-weight: 500;

                    &:first-child {
                        td {
                            @include fontSize($font-little-s);

                            &:first-child {
                                width: 30%;
                            }
                        }
                    }

                    td {
                        text-align: center;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        color: $color-black;
                    }
                }
            }
        }
    }
</style>
