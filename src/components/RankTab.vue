<template>
    <div id='rank-tab'>
        <div class="rank-tab__header">
            <span :class="currTab === 'live' && 'active'" @click="checkTab('live')">24H 直推龙虎榜</span>
            <span :class="currTab === 'history' && 'active'" @click="checkTab('history')">龙虎榜历史</span>
            <span :class="currTab === 'my-rank' && 'active'" @click="checkTab('my-rank')">我的龙虎榜</span>
        </div>

        <div class="rank-tab__body">
            <table class="live" v-show="currTab === 'live'">
                <tr>
                    <td>名次</td>
                    <td>昵称/地址</td>
                    <td>奖励总额</td>
                    <td>直推个数/展开</td>
                </tr>
                <tr v-for="live in liveList" :key="live.rankNum">
                    <td>
                        <span :class="['rank-icon', 'icon-'+ live.rankNum]"/>
                    </td>
                    <td :class="['rank-color','color-' + live.rankNum]">{{ live.name }} <br> {{ live.address }}</td>
                    <td :class="['rank-color','color-' + live.rankNum]">{{ live.ethTotal }} <br> {{ live.incTotal }}</td>
                    <td :class="['rank-color','color-' + live.rankNum]">{{ live.rankNum }}</td>
                </tr>
            </table>
            <ul class="history" v-show="currTab === 'history'">
                <li>
                    <span>日期</span>
                    <span>奖项</span>
                    <span>获奖玩家</span>
                    <span>直推个数</span>
                    <span>金额（eth/inc）</span>
                </li>
                <li v-for="history in historyList" :key="history.contents">
                    <span class="date">{{ history.date }}</span>

                    <div class="row-content">
                        <div class="row" v-for="content in history.contents">
                            <span>{{content.award}}</span>
                            <span>{{content.player}}</span>
                            <span>{{content.number}}</span>
                            <span class='text-green'>{{content.ethAmount}} <br> {{ content.incAmount }}</span>
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
                <tr v-for="myRank in myRankList" :key="myRank.rankNum">
                    <td>{{ myRank.date }}</td>
                    <td>{{ myRank.number }}</td>
                    <td>{{ myRank.result }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'rank-tab',
      data() {
        return {
          currTab: 'live',
          liveList: [
            {
              rankNum: 1,
              name: 'maizi123',
              address: '0xff89…ff60',
              ethTotal: '0.345 ETH',
              incTotal: '0.54 INC'
            }, {
              rankNum: 2,
              name: 'maizi123',
              address: '0xff89…ff60',
              ethTotal: '0.345 ETH',
              incTotal: '0.54 INC'
            }, {
              rankNum: 3,
              name: 'maizi123',
              address: '0xff89…ff60',
              ethTotal: '0.345 ETH',
              incTotal: '0.54 INC'
            }, {
              rankNum: 4,
              name: 'maizi123',
              address: '0xff89…ff60',
              ethTotal: '0.345 ETH',
              incTotal: '0.54 INC'
            }, {
              rankNum: 5,
              name: 'maizi123',
              address: '0xff89…ff60',
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
            }
          ],
          myRankList: [
            {
              date: '2019-4-30',
              number: 2,
              redult: '第一名'
            },
            {
              date: '2019-4-30',
              number: 2,
              redult: '第一名'
            },
            {
              date: '2019-4-30',
              number: 2,
              redult: '第一名'
            }
          ]
        }
      },
      methods: {
        checkTab(val) {
          this.currTab = val
        }
      }
    }
</script>

<style lang='scss' scoped>
    @import "../assets/styles/variable";
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
            table {
                width: 100%;
                border-collapse: collapse;

                &.live {
                    tr {
                        border-bottom: 2px solid $border-bottom-color;
                        padding: 5px 10px;

                        &:first-child {
                            background-color: #f5f5f5;
                            color: #b1b2b0;
                            border-bottom-color: transparent;

                            td:nth-child(3) {
                                text-align: center;
                            }
                        }

                        td {
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

                            .rank-icon {
                                display: inline-block;
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

                &.my-rank {
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

            .history {
                padding: 0 20px;

                li {
                    display: flex;
                    justify-content: space-around;

                    &:first-child {
                        text-align: center;
                        font-size: $font-little-s;
                        padding-bottom: 13px;
                        border-bottom: 2px solid $border-bottom-color;
                    }

                    span {
                        font-size: $font-little-s + 1;
                        padding-top: 3px;
                        padding-bottom: 3px;
                        color: $color-black;
                        font-weight: 500;

                        &.date {
                            padding-top: 10px;
                            text-align: center;
                            font-size: $font-little-s;
                        }
                    }

                    .row-content {
                        display: flex;
                        flex-direction: column;
                        width: 100%;

                        .row {
                            display: flex;
                            justify-content: space-around;
                            align-items: center;;
                            width: 100%;
                            border-bottom: 2px solid $border-bottom-color;

                            .text-green {
                                color: #75c09f;
                            }
                        }
                    }
                }
            }
        }
    }
</style>