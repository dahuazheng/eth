<template>
    <div class="user-center">
        <header>
            <span class="nav-back" @click="$router.go(-1)"></span>
            <span>个人中心</span>
            <icon name="home" @click="$router.push('/')" class="icon-home"></icon>
        </header>
        <div class="banner">
            <div class="user">
                <div class="name">
                    <label>专属昵称</label>
                    <span>{{user.invite_code || ''}}</span>
                </div>
                <p>{{user.address  && user.address}}</p>
            </div>
            <ul>
                <li>
                    <span>{{userBonus.allEth || 0}} ETH</span>
                    <span>{{userBonus.allInc || 0}} INC</span>
                    <label @click.stop="showAwardDetail = true">
                        奖励总额
                        <img src="../assets/images/icon_total_eth.png">
                    </label>
                </li>
                <li>
                    <span>{{joinCount}}</span>
                    <label>参与次数</label>
                </li>
                <li>
                    <span>{{pushCount}}</span>
                    <label>直推个数</label>
                </li>
            </ul>
        </div>
        <ul class="tabs">
            <li v-for="tab in tabs"
                :key="tab.value"
                :class="{active:tab.value===action}"
                @click="changeTab(tab.value)">
                {{tab.label}}
            </li>
        </ul>
        <ul class="items">
            <li v-show="action === 'push'">
                <table class="push">
                    <tr>
                        <th>昵称</th>
                        <th>参与次数</th>
                        <th>直推个数</th>
                    </tr>
                    <tr v-for="item in pushList" :key="item.id">
                        <td>{{ item.phone }}</td>
                        <td>{{ item.orderCount }}</td>
                        <td>{{ item.pushCount }}</td>
                    </tr>
                </table>
            </li>
            <li v-show="action === 'winner'">
                <table class="winner">
                    <tr>
                        <th>日期</th>
                        <th>直推个数</th>
                        <th>结果</th>
                    </tr>
                    <tr v-for="(item, key) in winnerList" :key="key">
                        <td>{{ item.date }}</td>
                        <td>{{ item.pushCount }}</td>
                        <td>
                            {{ item.rank | transformStatus }} <br>
                            +{{ item.eth }} ETH <br>
                            +{{ item.inc }} INC
                        </td>
                    </tr>
                </table>
            </li>
            <li v-show="action === 'guess'">
                <table class="guess">
                    <tr>
                        <th>时间</th>
                        <th>我的竞猜</th>
                        <th>中奖数字</th>
                        <th>结果</th>
                    </tr>
                    <tr v-for="item in guessList" :key="item.id">
                        <td>
                            {{ item.addTime | formatDate}}
                        </td>
                        <td>{{ item.numGuess }}</td>
                        <td>{{ item.numTrue }}</td>
                        <td>
                            {{ item.status | transformStatus }} <br>
                            <small>+{{ item.eth }} ETH</small>
                            <br>
                            <small>+{{ item.inc }} INC</small>
                        </td>
                    </tr>
                </table>
            </li>
        </ul>
        <div class="award-detail"
             v-show="showAwardDetail"
             @click="showAwardDetail=false">

            <div class="content" @click.stop>
                <ul>
                    <li>
                        <label>静态分红奖</label>
                        <span>{{userBonus.staticEth || 0}} ETH</span>
                        <span>{{userBonus.staticInc || 0}} INC</span>
                    </li>
                    <li>
                        <label>动态分红奖</label>
                        <span>{{userBonus.dynamicEth || 0}} ETH</span>
                        <span>{{userBonus.dynamicInc || 0}} INC</span>
                    </li>
                    <li>
                        <label>高级经理奖</label>
                        <span>{{userBonus.topManagerEth || 0}} ETH</span>
                        <span>{{userBonus.topManagerInc || 0}} INC</span>
                    </li>
                    <li>
                        <label>每日竞猜奖</label>
                        <span>{{userBonus.dayGuessEth || 0}} ETH</span>
                        <span>{{userBonus.dayGuessInc || 0}} INC</span>
                    </li>
                    <li>
                        <label>24H 直推龙虎榜</label>
                        <span>{{userBonus.dayPushEth || 0}} ETH</span>
                        <span>{{userBonus.dayPushInc || 0}} INC</span>
                    </li>
                    <li>
                        <label>其他奖励</label>
                        <span>{{userBonus.otherEth || 0}} ETH</span>
                        <span>{{userBonus.otherInc || 0}} INC</span>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {GuessApi, RankApi, UserApi, OrderApi} from '../api'
    import moment from 'moment'
    import {ensureMilliseconds} from '../utils'
    import {rewardLevels} from '../utils/options'

    export default {
        name: 'userCenter',
        data() {
            return {
                showAwardDetail: false,
                action: 'winner',
                joinCount: 0,
                pushCount: 0,
                tabs: [
                    {label: '直推表', value: 'push'},
                    {label: '龙虎榜', value: 'winner'},
                    {label: '竞猜', value: 'guess'},
                ],
                pushList: [],
                winnerList: [],
                guessList: [],
                userBonus: {}
            }
        },
        filters: {
            formatDate(value) {
                if (!value) return
                const formatDate = 'YYYY-MM-DD'
                return moment(ensureMilliseconds(value)).format(formatDate)
            },

            // 状态值转换中奖等级
            transformStatus(value) {
                const option = rewardLevels.find(reward => reward.value === String(value))
                return option && option.label || '未中奖'
            },
        },
        computed: {
            ...mapState({
                user: state => state.user,
            })
        },
        methods: {
            changeTab(value) {
                this.action = value
                this.action === 'push' && this.getPushList()
                this.action === 'winner' && this.getWinnerList()
                this.action === 'guess' && this.getMyGuessList()
            },

            // 获取直推表数据
            getPushList() {
                RankApi.getPushList({
                    page: '1',
                    limit: '20'
                }).then(res => {
                    this.pushList = res
                }).catch(err => {
                    console.error(err)
                })
            },

            // 获取参与次数
            getOrderList() {
                OrderApi.getOrderList({page: '1', limit: '1'}).then(res => {
                    this.joinCount = res.data && res.data.count
                }).catch(err => {
                    console.error(err)
                })
            },

            // 获取龙虎榜数据
            getWinnerList() {
                RankApi.getWinnerList({}).then(res => {
                    // console.log('res',res)
                    this.winnerList = res
                }).catch(err => {
                    console.error(err)
                })
            },

            // 获取竞猜数据
            getMyGuessList() {
                GuessApi.getMyGuessList().then(res => {
                    this.guessList = res
                }).catch(err => {
                    console.error(err)
                })
            },

            // 我的直推个数
            getAllPushCount() {
                RankApi.getAllPushCount().then(res => {
                    this.pushCount = res
                })
            },

            // 奖励总额
            getUserBonus() {
                UserApi.getUserBonus().then(res => {
                    this.userBonus = res
                }).catch(err => {
                    console.error(err)
                })
            },

            // 获取参与次数
            getUserInfo() {
                UserApi.getUserInfo().then(res => {
                    this.joinCount = res.orderCount
                }).catch(err => console.error(err))
            }
        },
        mounted() {
            this.action === 'push' && this.getPushList()
            this.action === 'winner' && this.getWinnerList()
            this.action === 'guess' && this.getMyGuessList()
            this.getAllPushCount()
            this.getUserBonus()
            this.getOrderList()
            this.getUserInfo()
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .user-center {
        ul {
            @include clearUl;
        }

        header {
            @include fontSize($font-medium);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 39px;
            box-sizing: border-box;
            padding: 0 20px;
            line-height: 39px;
            color: $clear-color;

            .nav-back {
                @include px2rem('width', 20);
                @include px2rem('height', 20);
                @include background-image;
                text-decoration: none;
                background-image: url('../assets/images/icon_back_white.png');
            }
        }

        .banner {
            @include px2rem('height', 228);
            width: 100%;
            padding-top: 40px;
            background-image: url('../assets/images/bg_persenter_title.png');
            background-size: 100% 100%;

            .user {
                @include px2rem('padding-top', 20);
                display: flex;
                flex-direction: column;
                align-items: center;

                .name {
                    @include px2rem('width', 167);
                    @include px2rem('height', 58);
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    box-sizing: border-box;
                    padding-top: 12px;
                    text-align: center;
                    background-image: url('../assets/images/icon_user_nickname.png');
                    background-size: 100% 100%;

                    label {
                        @include fontSize($font-little);
                        color: #865149;
                    }

                    span {
                        text-align: center;
                        color: $primary-color;
                    }
                }

                p {
                    @include clearBack;
                    @include fontSize($font-medium-s - 1);
                    margin-top: 5px;
                    color: #fcb2ff;
                }
            }

            ul {
                @include clearUl;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: flex-end;
                margin-top: 20px;

                li {
                    @include fontSize($font-little);
                    display: flex;
                    flex-direction: column;
                    justify-content: end;
                    align-items: center;
                    width: 33.333%;
                    color: $clear-color;
                    line-height: 1.8;

                    label {
                        @include fontSize($font-little);
                        margin-top: 5px;
                        color: #EFA795;

                        img {
                            @include px2rem('width', 19);
                            @include px2rem('height', 19);
                            vertical-align: middle;
                        }
                    }
                }
            }
        }

        .tabs {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            margin-top: 8px;

            li {
                width: 33%;
                @include px2rem('height', 52);
                @include px2rem('line-height', 36);
                @include fontSubColor($font-sub-color);
                @include fontSize($font-medium-s);
                text-align: center;

                &.active {
                    background-image: url('../assets/images/bg_bet.png');
                    color: $clear-color;
                    @include background-image();
                }
            }
        }

        .items {
            padding-bottom: 30px;
            table.push {
                width: 100%;
                border-collapse: collapse;

                tr {
                    @include px2rem('height', 35);
                    @include fontSize($font-little);
                    @include fontSubColor($font-sub-color);
                    border-bottom: 1px solid $border-color;

                    &:first-child {
                        background: #f5f5f5;
                        border-bottom-color: transparent;
                    }
                }

                th, td {
                    box-sizing: border-box;
                    padding: 0 5px;
                    font-weight: normal;
                    word-wrap: break-word;
                    word-break: break-all;
                    text-align: center;

                    &:nth-child(1) {
                        padding-left: $common-list-padding;
                    }

                    &:nth-child(2) {
                        width: 40%;
                    }

                    &:last-child {
                        padding-right: $common-list-padding;
                    }
                }

                td {
                    padding: 6px 5px;
                }
            }

            table.guess, table.winner {
                width: 100%;
                border-collapse: collapse;
                padding-bottom: 50px;

                tr {
                    @include fontSize($font-little);
                    @include fontSubColor(#2d2d2d);
                    @include px2rem('height', 35);
                    border-bottom: 1px solid $border-color;
                }

                th, td {
                    text-align: center;
                    padding: 5px;
                    font-weight: normal;

                    &:first-child {
                        padding-left: $common-list-padding;
                    }

                    &:last-child {
                        padding-right: $common-list-padding;
                    }
                }

                &.winner th, &.winner td {
                    box-sizing: border-box;
                    width: 33.333%;
                }
                &.guess th, &.guess td {
                    box-sizing: border-box;
                    //width: 25%;
                }
            }
        }

        .award-detail {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 999;

            .content {
                width: 80%;
                @include px2rem('height', 200);
                position: absolute;
                top: 30px;
                bottom: 30px;
                left: 0;
                right: 0;
                margin: auto;
                border-radius: 10px;
                background: $clear-color;
                background-size: 100% 100%;

                ul {
                    @include clearUl;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    vertical-align: middle;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 15px 0;

                    > li {
                        @include fontSize($font-little);

                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 33.333%;
                        line-height: 1.6;

                        label {
                            margin-bottom: 5px;
                            @include fontColor($font-color)
                        }

                        span {
                            color: #3f1964;
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }
</style>
