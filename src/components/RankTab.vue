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
                        {{ live.ethAmount }} ETH
                        <br>
                        {{ live.incAmount }} INC
                    </span>
                    <span class="per">{{ live.pushCount }}</span>
                </li>
            </ul>

            <!--龙虎榜历史-->
            <div class="history" v-show="currTab === 'history'">
                <div class="row top">
                    <span class="date">日期</span>
                    <span class="award">奖项</span>
                    <span class="player">获奖玩家</span>
                    <span class="num">直推个数</span>
                    <span class="amount">金额（eth/inc）</span>
                </div>
                <ul v-for="history in dayPushHistoryList" :key="history.date + '-label'">
                    <li class="row" v-for="(row, key) in history.list" :key="row.userId + key">
                        <span class="date date-top">{{ key === 0 ? history.date : ''}}</span>
                        <span class="award">{{row.rank | transformStatus}}</span>
                        <span class="player">{{row.phone}}</span>
                        <span class="num">{{row.pushCount}}</span>
                        <span class="amount text-green">
                            +{{row.ethAmount}}<br>
                            +{{row.incAmount}}
                        </span>
                    </li>
                </ul>
            </div>

            <!--我的龙虎榜-->
            <table class="my-rank" v-show="currTab === 'my-rank'">
                <tr>
                    <th>日期</th>
                    <th>直推个数</th>
                    <th>结果</th>
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
                dayPushHistoryList: [],
                myRankList: []
            };
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
                    this.liveList = res
                })
            },

            // 龙虎榜历史
            getDayPushHistory() {
                RankApi.getDayPushHistory().then(res => {
                    this.dayPushHistoryList = res
                }).catch(err => console.log(err))
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
            @include clearUl
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

            .live {
                width: 100%;

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
                        @include fontSize($font-little);
                        position: relative;
                        padding: 8px 0;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;

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

            .history {
                .row {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    padding: 0 $space-width;

                    &.top {
                        border-bottom: 1px solid #f0f0f0;
                    }

                    span {
                        @include fontSize($font-little);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 44px;
                        color: $color-black;
                        text-align: center;
                        border-bottom: 1px solid #f0f0f0;

                        &.date {
                            justify-content: flex-start;
                            width: 21%;
                            border-bottom: none;
                        }

                        &.player {
                            width: 21%;
                        }

                        &.award,
                        &.num {
                            width: 15%;
                        }

                        &.amount {
                            justify-content: flex-end;
                            width: 26%;
                            text-align: right;
                        }
                    }

                    &:last-child,
                    &.top span,
                    &:last-child span {
                        border-bottom: none;
                    }
                }

                ul {
                    border-bottom: 1px solid #f0f0f0;
                }
            }

            table.my-rank {
                width: 100%;
                border-collapse: collapse;

                tr {
                    @include fontSize($font-little);
                    border-bottom: 1px solid $border-bottom-color;

                    th,
                    td {
                        height: 44px;
                        padding: 0 15px;
                        text-align: center;
                        color: $color-black;
                        font-weight: normal;

                        &:first-child {
                            text-align: left;
                        }
                    }
                }
            }
        }
    }
</style>
