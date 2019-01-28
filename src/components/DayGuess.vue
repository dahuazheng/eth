<template>
    <div class="day-guess">
        <div class="detail">
            <span @click="toGuess('guessResult')">历史结果</span>
            <span>{{startCountDown | displayCountDown}}</span>
            <span @click="toGuess('myGuess')">我的竞猜</span>
        </div>
        <div v-if="gameStatus === 1">
            <div class="un-join" v-show="guessStatus === 0">
                <div class="row">
                    <label>您尚未参与，请立即参与解锁竞猜权益！</label>
                    <EthButton name="现在参与" :click="toJoin"/>
                </div>
            </div>
            <div class="in-join" v-show="guessStatus === 1">
                <div style="text-align: center">
                    <input type="number"
                           v-model="guessValue"
                           placeholder="明天参与游戏的单日ETH总个数是多少？">
                    <EthButton name="提交" borderRadios="21px" :click="submitGuess"/>
                </div>

            </div>
            <div class="end-join" v-show="guessStatus === 2">
                <div class="guess-value">
                    <img src="../assets/images/icon_king.png">
                    本次竞猜：{{ guessValue }}
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <p style="margin:30px; text-align: center">等待游戏开始</p>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import EthButton from './EthButton'
    import {GuessApi} from '../api'
    import {countDownMixin} from '../mixins'

    export default {
        name: 'dayGuess',
        components: {EthButton},
        mixins: [countDownMixin],
        props: ['toJoin'],
        data() {
            return {
                guessValue: '',  // 我的竞猜数字
                start: true,
                guessStatus: 0  // 竞猜状态  0未投注未竞猜，1已投注未竞猜，2已投注已竞猜
            }
        },
        watch: {
            $route(to, from) {

            }
        },
        methods: {
            toGuess(name) {
                this.$router.push({name})
            },

            // 获取竞猜状态
            getGuessStatus() {
                GuessApi.getGuessStatus()
                    .then(res => {
                        if (Number(res && res.status) < 0) return

                        this.guessStatus = res && res.status
                        this.getMyAward()
                    })
                    .catch(err => console.error(err))
            },

            // 获取本次竞猜数字
            getMyAward() {
                if (Number(this.guessStatus) !== 2) return

                GuessApi.getMyGuessList().then(res => {
                    this.guessValue = res.length && res[0].numGuess
                }).catch(err => console.error(err))
            },

            // 参与竞猜
            submitGuess() {
                if (!this.guessValue) {
                    return Toast('请输入您的竞猜数额')
                }
                GuessApi.joinGuess({
                    num_guess: this.guessValue
                }).then(res => {
                    if (Number(res && res.status) < 1) return Toast(res.msg)

                    if (Number(res && res.status) === 2) {
                        Toast(res.msg)
                    }

                    this.guessStatus = 2
                    this.getMyAward()
                }).catch(err => console.error(err))
            },
        },
        mounted() {
            this.getGuessStatus()
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/mixin";

    .day-guess {
        padding: 20px 40px;

        .detail {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid $border-color;

            span {
                border: 1px solid #6813ae;
                border-radius: 10px;
                padding: 9px 15px;
                @include fontSize($font-little + 1);
                @include fontPrimaryColor($primary-color);

                &:nth-child(2) {
                    border: none;
                    padding: 0;
                }
            }
        }

        .un-join .row {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px 0;

            label {
                margin-bottom: $space-width;
                color: #474747;
            }
        }

        .in-join {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px 0;

            input {
                @include fontSize($font-medium-s);
                width: 100%;
                margin-bottom: 20px;
                padding: 7px 0;
                border: none;
                border-bottom: 1px solid $border-color;
            }
        }

        .end-join {
            @include fontColor($gold-color);
            padding: 30px 0;
            text-align: center;

            .guess-value {
                @include px2rem('width', 237);
                @include px2rem('height', 84);
                @include px2rem('padding-top', 20);
                display: inline-block;
                box-sizing: border-box;
                background-image: url('../assets/images/bg_bet.png');
                background-size: cover;
                background-position: top center;
            }

            img {
                @include px2rem('width', 17);
                @include px2rem('height', 15);
            }
        }
    }
</style>
