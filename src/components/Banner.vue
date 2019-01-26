<template>
    <div class="banner">
        <div class="cup" @click="toRankingList">
            <img src="../assets/images/icon_cup.png" alt>
            <span>龙虎榜</span>
        </div>
        <div class="content">
            <div class="jackpot">
                <img class="logo" src="../assets/images/icon_eth_download.png" alt>
                <span>x</span>
                <img src="../assets/images/icon_eth_star.png" alt>
            </div>
            <div class="price-container" v-show="endCountDown !== 0 ">
                <div class="price-box">
                    <label>当前奖池</label>
                    <p>{{gameBonus.eth_amount || 0}} ETH / {{gameBonus.inc_amount || 0}} INC</p>
                    <div class="row">
                        <span>累计参与额</span>
                        <span>
                            {{gameBonus.order_eth_amount || 0}}
                            <img
                                class="icon-bet"
                                src="../assets/images/icon_bet_eth.png">
                        </span>
                        <span>
                            {{gameBonus.order_inc_amount || 0}}
                            <img class="icon-star" src="../assets/images/icon_bet_eth_star.png">
                        </span>
                    </div>
                    <div class="row">
                        <span>今日参与额</span>
                        <span> {{gameBonus.day_order_eth_amount || 0}}
                            <img class="icon-bet"
                                 src="../assets/images/icon_bet_eth.png">
                        </span>
                        <span>
                            {{gameBonus.day_order_inc_amount ||0}}
                            <img class="icon-star" src="../assets/images/icon_bet_eth_star.png">
                        </span>
                    </div>
                </div>
                <div class="time">{{endCountDown | displayCountDown}}</div>
                <div class="message" v-show="false">
                    <icon name="small-bell" class="icon"></icon>
                    <span></span>
                </div>
            </div>
            <div class="time-circle">
               <div class="wave">
                   <!-- <img src="../assets/images/bg_wave.svg" alt=""> -->
                   <span> 02:45:00</span>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from "mint-ui";
    import {UserApi, MainApi} from "../api";
    import {countDownMixin} from "../mixins";

    export default {
        name: "banner",
        mixins: [countDownMixin],
        data() {
            return {
                gameBonus: {}
            };
        },
        methods: {
            toRankingList() {
                if (!UserApi.isOnline()) {
                    return Toast("请先登录");
                }

                this.$router.push({name: "rankingName"});
            },
            getGameBonus() {
                MainApi.getGameBonus().then(res => {
                    if (Number(res.status) === 1) {
                        this.gameBonus = res.data;
                    }
                    console.log("game_bonus", res);
                });
            }
        },
        mounted() {
            this.getGameBonus();
        }
    };
</script>
<style lang="scss" scoped>
    @import "../assets/styles/mixin";

    .banner {
        @include px2rem("height", 292);
        @include background-gradient-diagonal($color-from, $color-to);
        position: relative;
        box-sizing: border-box;
        padding: 15px 0;

        .cup {
            position: absolute;
            top: $space-width;
            left: $space-width;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 1;

            img {
                @include px2rem("width", 35);
                @include px2rem("height", 38);
            }

            span {
                @include px2rem("height", 22);
                @include px2rem("line-height", 22);
                @include fontSize($font-little);
                margin-top: 8px;
                display: inline-block;
                padding: 0 5px;
                border-radius: 10px;
                border: 1px solid $gold-color;
                color: $gold-color;
            }
        }

        .content {
            position: relative;
            height: 100%;
            background-image: url("../assets/images/bg_eth_title.png");
            background-size: 100% 100%;
            text-align: center;

            .jackpot {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                img {
                    @include px2rem("height", 46);
                    @include px2rem("line-height", 52);

                    &.logo {
                        @include px2rem("height", 64);
                        @include px2rem("line-height", 64);
                    }
                }

                span {
                    @include px2rem("height", 20);
                    @include px2rem("line-height", 20);
                    @include fontSize($font-large);
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 6px;
                    margin: auto;
                    display: inline-block;
                    color: #ffe500;
                }
            }

            .price-container {
                .price-box {
                    @include fontSize($font-little-s);
                    color: $default-color;

                    p {
                        @include fontSize($font-medium);
                        margin: $space-width 0;
                        color: $gold-color;
                    }

                    .row {
                        @include px2rem("height", 16);
                        margin-bottom: $margin-width;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;

                        span {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            margin: $space-width;

                            img {
                                margin-left: 5px;
                                @include px2rem("width", 16);
                                @include px2rem("height", 16);
                            }

                            .icon-star {
                                @include px2rem("width", 13);
                                @include px2rem("height", 15);
                            }
                        }
                    }
                }

                .time {
                    @include fontSize($font-medium);
                    color: #94d9ff;
                    padding-top: 0.3rem;
                }

                .message {
                    @include px2rem("width", 272);
                    @include px2rem("height", 38);
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    display: inline-block;
                    border: 1px solid $border-color;
                    border-radius: 19px;

                    .icon {
                        @include px2rem("width", 22);
                        @include px2rem("height", 22);
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 10px;
                        margin: auto;
                        color: $clear-color;
                    }
                }
            }

            .time-circle {
                display: flex;
                justify-content: center;
                width: 100%;

                .wave {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    @include px2rem('width', 120);
                    @include px2rem('height', 120);
                    background-color: #fff600;
                    border-radius: 55%;
                    border: 2px solid #fff41f;
                    box-shadow: 0 0 40px #b78330, 0 0 20px #b78330 inset;
                    overflow: hidden;

                    &::before,
                    &::after{
                        content: "";
                        position: absolute;
                        width: 220px;
                        height: 220px;
                        top: 0;
                        left: 50%;
                        background-color: rgba(255, 255, 255, .8);
                        border-radius: 40%;
                        transform: translate(-50%, -70%) rotate(0);
                        animation: rotate 7s linear infinite;
                        z-index: 5;
                    }

                    &::after {
                        border-radius: 35%;
                        background-color: #7900ae;
                        transform: translate(-50%, -70%) rotate(0);
                        animation: rotate 5s linear -5s infinite;
                        z-index: 5;
                    }


                    span {
                        position: absolute;
                        z-index: 6;
                        color: #fff;
                        @include px2rem('font-size', 20);
                    }
                    
                    @keyframes rotate {
                        50% {
                            transform: translate(-50%, -73%) rotate(180deg);
                        } 100% {
                              transform: translate(-50%, -70%) rotate(360deg);
                          }
                    }
                }
            }

        }
    }
</style>
