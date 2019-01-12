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
                <tr v-for="">
                    <td>
                        <span :class="['rank-icon', 'icon-'+rankNum]"/>
                    </td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
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
           rankNum: '1'
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
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    border-bottom: 1px solid $border-bottom-color;
                    padding: 5px 10px;

                    &:first-child {
                        background-color: #f5f5f5;
                        color: #b1b2b0;
                        border-bottom-color: transparent;
                    }
                    
                    td {
                        font-size: $font-little;
                        padding: 10px 0;
                        text-align: center;
                        
                        &:first-child {
                            text-align: left;
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
                    }
                }
            }
        }
    }
</style>