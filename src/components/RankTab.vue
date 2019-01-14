<template>
    <div id='rank-tab'>
        <div class="rank-tab__header">
            <span :class="currTab === 'live' && 'active'" @click="checkTab('live')">24H 直推龙虎榜</span> <span
            :class="currTab === 'history' && 'active'" @click="checkTab('history')">龙虎榜历史</span> <span
            :class="currTab === 'my-rank' && 'active'" @click="checkTab('my-rank')">我的龙虎榜</span>
        </div>

        <div class="rank-tab__body">
            <ul class="live" v-show="currTab === 'live'">
                <li>
                    <span class="num">名次</span> <span class="name">昵称</span> <span class="account">奖励总额</span> <span
                    class="per">直推个数/展开</span>
                </li>
                <!--以下 同一名次对应多个用户-->
                <li v-for="(live,liveKey) in liveLists.slice(0, 5)" :key="live.rankNum">
                    <div class="listContainer" v-for="(list, index) in (live.list)" :key='list.id'
                         v-show="index===0 || live.isDrop">
                        <span class="num">
                            <span :class="['rank-icon', 'icon-'+ live.rankNum]"></span>
                        </span>
                        <span :class="['name', 'rank-color','color-' + live.rankNum]">{{ list.name }}</span>
                        <span :class="['account', 'rank-color','color-' + live.rankNum]">{{ list.ethTotal }} <br> {{ live.incTotal }}</span>
                        <span :class="['per', 'rank-color','color-' + live.rankNum]">
                            <span>{{ list.number }}</span>
                            <i v-show="live.list.length > 1 && index===0" class="toggle-arrow" @click="dropList(liveKey)"></i>
                        </span>
                    </div>
                    <!--<div class="listContainer" v-else="live.list.length && live.list.length === 1" v-for="list in (live.list)" :key="list.id">
                        <span class="num">
                            <span :class="['rank-icon', 'icon-'+ live.rankNum]"/>
                        </span>
                        <span :class="['name', 'rank-color','color-' + live.rankNum]">{{ list.name }}</span>
                        <span :class="['account', 'rank-color','color-' + live.rankNum]">{{ list.ethTotal }} <br> {{ live.incTotal }}</span>
                        <span :class="['per', 'rank-color','color-' + live.rankNum]">{{ list.number }}</span>
                    </div>-->

                </li>
            </ul>
            <ul class="history" v-show="currTab === 'history'">
                <li>
                    <span class="date">日期</span>
                    <span class="award">奖项</span>
                    <span class="player">获奖玩家</span>
                    <span class="num">直推个数</span>
                    <span class="amount">金额（eth/inc）</span>
                </li>
                <li v-for="history in historyList" :key="history.id">
                    <span class="date date-top">{{ history.date }}</span>

                    <div class="row-content">
                        <div class="row" v-for="content in history.contents" :key="content.id">
                            <span class="award">{{content.award}}</span>
                            <span class="player">{{content.player}}</span>
                            <span class="num">{{content.number}}</span>
                            <span class='amount text-green'>{{content.ethAmount}} <br> {{ content.incAmount }}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <table class="my-rank" v-show="currTab === 'my-rank'">
                <tr>
                    <td>日期</td>
                    <td>直推个数</td>
                    <td>结果</td>
                </tr>
                <tr v-for="myRank in myRankList" :key="myRank.id">
                    <td>{{ myRank.date }}</td>
                    <td>{{ myRank.number }}</td>
                    <td>{{ myRank.result }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    const data = [
        {
            rankNum: 1,
            list: [{
                name: '154360898',
                ethTotal: '0.345 ETH',
                incTotal: '0.54 INC',
                number: 4
            }]
        },
        {
            rankNum: 2,
            list: [{
                name: '2221254360898',
                ethTotal: '0.345 ETH',
                incTotal: '0.54 INC',
                number: 9
            }, {
                name: '2154360898',
                ethTotal: '0.345 ETH',
                incTotal: '0.54 INC',
                number: 7
            }, {
                name: '4154360898',
                ethTotal: '0.345 ETH',
                incTotal: '0.54 INC',
                number: 8
            }]
        },
        {
            rankNum: 3,
            list: [{
                name: '0154360898',
                ethTotal: '0.345 ETH',
                incTotal: '0.54 INC',
                number: 2
            }]
        }
    ]
    const newData = data.map(item => {
        item.isDrop = false
        return item
    })

    export default {
        name: 'rank-tab',
        data() {
            return {
                currTab: 'live',
                liveLists: newData,
                liveList: [
                    {
                        rankNum: 1,
                        name: '154360898',
                        ethTotal: '0.345 ETH',
                        incTotal: '0.54 INC'
                    }, {
                        rankNum: 2,
                        name: '1354360898',
                        ethTotal: '0.345 ETH',
                        incTotal: '0.54 INC'
                    }, {
                        rankNum: 3,
                        name: '1154360898',
                        ethTotal: '0.345 ETH',
                        incTotal: '0.54 INC'
                    }, {
                        rankNum: 4,
                        name: '1954360898',
                        ethTotal: '0.345 ETH',
                        incTotal: '0.54 INC'
                    }, {
                        rankNum: 5,
                        name: '1054360898',
                        ethTotal: '0.345 ETH',
                        incTotal: '0.54 INC'
                    }
                ],
                historyList: [
                    {
                        date: '2019-02-10',
                        contents: [
                            {
                                award: '一等奖',
                                player: '1395673975',
                                number: 4,
                                ethAmount: 0.65,
                                incAmount: 0.65
                            }, {
                                award: '二等奖',
                                player: '1395673975',
                                number: 7,
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            }, {
                                award: '三等奖',
                                player: '1395673975',
                                number: 1,
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            }, {
                                award: '四等奖',
                                player: '1395673975',
                                number: 3,
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            }]
                    },
                    {
                        date: '2019-01-07',
                        contents: [
                            {
                                award: '一等奖',
                                player: '1395673975',
                                number: 8,
                                ethAmount: 0.65,
                                incAmount: 0.65
                            },
                            {
                                award: '二等奖',
                                player: '1395673975',
                                number: 7,
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            },
                            {
                                award: '三等奖',
                                player: '1395673975',
                                number: 1,
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            },
                            {
                                award: '四等奖',
                                player: '1395673975',
                                number: 3,
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            },
                            {
                                award: '五等奖',
                                player: '71395673975',
                                number: 5,
                                ethAmount: 0.65,
                                incAmount: 0.65,
                            }]
                    }
                ],
                myRankList: [
                    {
                        date: '2019-4-30',
                        number: 2,
                        result: '第一名'
                    },
                    {
                        date: '2019-4-30',
                        number: 2,
                        result: '第一名'
                    },
                    {
                        date: '2019-4-30',
                        number: 2,
                        result: '第一名'
                    }
                ]
            }
        },
        methods: {
            checkTab(val) {
                this.currTab = val
            },

            dropList(key) {
                console.log(this.liveLists)
                console.log(key)
                this.liveLists[key].isDrop = !this.liveLists[key].isDrop
            }
        }
    }
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
            padding: 17px;
            font-size: $font-medium-s;

            span {
                display: inline-block;
                text-align: center;
                color: #9e9f9d;

                &.active {
                    @include px2rem('width', 116);
                    @include background-gradient(#af24d4, #7312b9);
                    color: $color-white;
                    padding: 10px 0;
                    border-radius: 18px;
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
                        flex-direction: column;

                        &:first-child {
                            flex-direction: row;
                            background-color: #f5f5f5;
                            color: #b1b2b0;
                            border-bottom-color: transparent;

                            span:nth-child(3) {
                                text-align: center;
                            }
                        }

                        .listContainer {
                            display: flex;
                            flex-direction: row;
                            width: 100%;
                            padding: 8px 0;
                            border-bottom: 2px solid $border-bottom-color;
                        }

                        span {
                            position: relative;
                            font-size: $font-little;
                            padding: 8px 0;

                            &:first-child {
                                @include px2rem('width', 55);
                                padding-left: 17px;
                            }

                            &:nth-child(3) {
                                text-align: right;
                            }

                            &:last-child {
                                text-align: center;
                                padding-right: 17px;
                            }

                            &.name,
                            &.account {
                                width: 25%;
                            }

                            &.per {
                                display: inline-flex;
                                flex-direction: column;
                                align-items: center;
                                width: 26%;

                                span {
                                    padding: 0;
                                }

                                .toggle-arrow {
                                    position: absolute;
                                    bottom: -12px;
                                    display: inline-block;
                                    border-top: 10px solid #ccc;
                                    border-bottom: 10px solid transparent;
                                    border-left: 9px solid transparent;
                                    border-right: 9px solid transparent;
                                }
                            }

                            .rank-icon {
                                // display: inline-block;
                                @include px2rem('width', 30);
                                @include px2rem('height', 30);
                                background-size: 100% 100%;

                                &.icon-1 {
                                    background-image: url('../assets/images/icon_one.png');
                                }

                                &.icon-2 {
                                    background-image: url('../assets/images/icon_two.png');
                                }

                                &.icon-3 {
                                    background-image: url('../assets/images/icon_three.png');
                                }

                                &.icon-4 {
                                    background-image: url('../assets/images/icon_four.png');
                                }

                                &.icon-5 {
                                    background-image: url('../assets/images/icon_five.png');
                                }
                            }

                            &.rank-color {
                                &.color-1 {
                                    color: #daa032;
                                }

                                &.color-2 {
                                    color: #b6babd;
                                }

                                &.color-3 {
                                    color: #c59567;
                                }

                                &.color-4 {
                                    color: #d0b791;
                                }

                                &.color-5 {
                                    color: #d0b791;
                                }
                            }
                        }
                    }
                }

                &.history {
                    li {
                        display: flex;
                        justify-content: space-around;
                        border-bottom: 2px solid $border-bottom-color;

                        &:first-child {
                            text-align: center;
                            font-size: $font-little-s;
                            padding-bottom: 13px;
                            border-bottom: 2px solid $border-bottom-color;

                            span {
                                padding-top: 0;
                            }
                        }

                        span {
                            display: flex;
                            align-items: flex-start;
                            font-size: $font-little-s + 1;
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
                                text-align: center;
                                font-size: $font-little-s;

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
                                border-bottom: 2px solid $border-bottom-color;

                                .text-green {
                                    color: #75c09f;
                                }

                                &:last-child {
                                   border-bottom-color: transparent;
                                }
                            }
                        }
                    }
                }
            }

            .my-rank {
                tr {
                    &:first-child {
                        border-bottom: 2px solid $border-bottom-color;

                        td {
                            font-size: $font-little-s;

                            &:first-child {
                                width: 30%;
                            }
                        }
                    }

                    td {
                        text-align: center;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        color: $color-black;

                        &:first-child {
                            padding-left: 20px;
                        }

                        &:last-child {
                            padding-right: 20px;
                        }
                    }
                }
            }
        }
    }
</style>
