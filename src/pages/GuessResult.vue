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
                <li v-for="result in resultList" :key="result.id">
                    <span class="date date-top">{{ result.time | formatDate}}</span>
                    <span class="number date-top">{{ result.awardNumber }}</span>

                    <div class="row-content">
                        <div class="row" v-for="item in result.contents" :key="item.id">
                            <span class="award">{{item.awardNo}}</span>
                            <span class="player">{{item.playerPhone | formatPhoneNumber}}</span>
                            <span class="amount text-green">+{{item.ethAmount}}<br> +{{ item.incAmount }}</span>
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
    import { ensureMilliseconds, encodeMobile } from "../api/utils"

    export default {
        components: {PopupTitle},
        data() {
             return {
                 resultList: [
                     {
                         time: 1547478015,
                         awardNumber: 2,
                         contents: [
                             {
                                 awardNo: '一等奖',
                                 playerPhone: '1395673975',
                                 number: 4,
                                 ethAmount: 0.65,
                                 incAmount: 0.65
                             }, {
                                 awardNo: '二等奖',
                                 playerPhone: '1395673975',
                                 number: 7,
                                 ethAmount: 0.65,
                                 incAmount: 0.65,
                             }, {
                                 awardNo: '三等奖',
                                 playerPhone: '1395673975',
                                 number: 1,
                                 ethAmount: 0.65,
                                 incAmount: 0.65,
                             }, {
                                 awardNo: '四等奖',
                                 player: '1395673975',
                                 number: 3,
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
                                 number: 8,
                                 ethAmount: 0.65,
                                 incAmount: 0.65
                             },
                             {
                                 awardNo: '二等奖',
                                 playerPhone: '1395673975',
                                 number: 7,
                                 ethAmount: 0.65,
                                 incAmount: 0.65,
                             },
                             {
                                 awardNo: '三等奖',
                                 playerPhone: '1395673975',
                                 number: 1,
                                 ethAmount: 0.65,
                                 incAmount: 0.65,
                             },
                             {
                                 awardNo: '四等奖',
                                 playerPhone: '1395673975',
                                 number: 3,
                                 ethAmount: 0.65,
                                 incAmount: 0.65,
                             },
                             {
                                 award: '五等奖',
                                 playerPhone: '71395673975',
                                 number: 5,
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
                const formatDate = 'YYYY-MM-DD HH:mm:ss'
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
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .guess-result {
        .list {
            margin-top: $margin-width;
        }

        ul{
            @include clearUl();
            width: 100%;

            li {
                display: flex;
                // justify-content: space-around;
                border-bottom: 1px solid $border-bottom-color;

                &:first-child {
                    text-align: center;
                    font-size: $font-little-s;
                    padding-bottom: 13px;
                    border-bottom: 1px solid $border-bottom-color;

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
                    &.number {
                        display: inline;
                        width: 17%;
                        text-align: left;
                        font-size: $font-little-s;

                        &.date-top {
                            text-align: center;
                            padding-top: 10px;
                        }
                    }

                    &.date {
                        padding-left: 15px;
                    }

                    &.award,
                    &.player {
                        width: 16%;
                    }

                    &.player,
                    &.number {
                        transform: translateX(-10%);
                    }

                    &.amount {
                        width: 20%;
                    }
                }

                .row-content {
                    display: flex;
                    flex-direction: column;
                    width: 80%;

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
