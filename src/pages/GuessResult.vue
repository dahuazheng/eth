<template>
    <div class="guess-result">
        <PopupTitle title="历史结果" :fixed="true" :back="close"/>
        <div class="list">
            <div class="row">
                <div class="date">日期</div>
                <div class="number">中奖数字</div>
                <div class="award">奖项</div>
                <div class="player">中奖玩家</div>
                <div class="amount">奖金（eth/inc）</div>
            </div>
            <ul>
                <li v-for="(history, hKey) in historyList" :key="hKey">
                    <div class="row" v-for="(item, key) in history.list" :key="key">
                        <div class="date top">{{ key === 0 ? history.date : ''}}</div>
                        <div class="number top">{{ key === 0 ? history.numTrue : '' }}</div>

                        <div class="award">{{item.status | transformStatus}}</div>
                        <div class="player">{{item.phone }}</div>
                        <div class="amount text-green">+{{item.eth}}<br> +{{item.inc }}</div>
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
        padding-top: 44px;

        .list {
            padding: $margin-width;
        }

        ul {
            @include clearUl();
            width: 100%;

            li {
                border-bottom: 1px solid $border-bottom-color;
            }
        }

        .row {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

            > div {
                @include fontSize($font-little-s + 1);
                height: 46px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: $color-black;
                text-align: center;
                border-bottom: 1px solid $border-bottom-color;

                &:last-child {
                    justify-content: flex-end;
                    text-align: right;
                }

                &.top {
                    border-bottom: none
                }

                &.date {
                    width: 20%;
                }

                &.number {
                    width: 16%;
                }

                &.award {
                    width: 17%;

                }

                &.player {
                    width: 25%;
                }

                &.amount {
                    width: 30%;
                }
            }

            &:last-child > div {
                border-bottom: none;
            }
        }
    }

</style>
