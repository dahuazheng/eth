<template>
    <div id='rank-tab'>
        <div class="rank-tab__header">
            <span>24H 直推龙虎榜</span>
            <span class='active'>龙虎榜历史</span>
            <span>我的龙虎榜</span>
        </div>

        <div class="rank-tab__body">
            <table class="live">
                <tr>
                    <td>名次</td>
                    <td>昵称/地址</td>
                    <td>奖励总额</td>
                    <td>直推个数/展开</td>
                </tr>
                <tr v-for="rankList in rankLists">
                    <td>
                        <span :class="['rank-icon', 'icon-'+ rankList.rankNum]"/>
                    </td>
                    <td :class="['rank-color','color-' + rankList.rankNum]">{{ rankList.name }} <br> {{ rankList.address }}</td>
                    <td :class="['rank-color','color-' + rankList.rankNum]">{{ rankList.ethTotal }} <br> {{ rankList.incTotal }}</td>
                    <td :class="['rank-color','color-' + rankList.rankNum]">{{ rankList.rankNum }}</td>
                </tr>
            </table>
            <table class="history"></table>
            <table class="my-list"></table>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'rank-tab',
      data() {
        return {
          rankNum: '1',
          rankLists: [
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

        }
      }
    }
</script>

<style lang='scss' scoped>
    @import "../assets/styles/variable";
    @import "../assets/styles/mixin";

    #rank-tab {
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
                    @include background-gradient(#af24d4, #7312b9);
                    color: $color-white;
                    @include px2rem('width', 116);
                    padding: 10px 0;
                    border-radius: 18px;
                }
            }
        }

        .rank-tab__body {
            table {
                width: 100%;
                border-collapse: collapse;

                tr {
                   // display: flex;
                    //align-items: flex-start;
                    //justify-content: space-between;
                    border-bottom: 1px solid $border-bottom-color;
                    padding: 5px 10px;

                    &:first-child {
                        background-color: #f5f5f5;
                        color: #b1b2b0;
                        border-bottom-color: transparent;
                    }
                    
                    td {
                        font-size: $font-little;
                        padding: 7px 0;
                        text-align: left;
                        
                        &:first-child {
                            padding-left: 17px;
                        }

                        &:last-child {
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
                            display: inline-block;
                            
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
        }
    }
</style>