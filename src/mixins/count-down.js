import {ensureMilliseconds, zerofill} from '../utils'
import {OrderApi} from '../api'
import moment from 'moment'

const countDownMixin = {
    data() {
        return {
            startCountDown: 0,
            endCountDown: 0,
            gussCountDown: 0,
            gameStatus: 2,
            startTime: null,
            endTime: null,
            startTimer: null,
            endTimer: null,
            guessTimer: null,
        }
    },
    methods: {
        // 倒计时格式化
        displayCountDown(value) {
            value = parseInt(value / 1000)
            const day = parseInt(value / (3600 * 24)),
                hour = parseInt((value / 3600) % 24), //这里是计算还剩多少小时
                minutes = parseInt((value / 60) % 60), //这里是计算还剩多少分钟
                second = parseInt(value % 60); //这里是计算还剩多少秒数

            return zerofill(day * 24 + hour) + ':' + zerofill(minutes) + ':' + zerofill(second)
        },

        // 游戏开始时间倒计时
        getStartCountDown() {
            this.startTimer = setTimeout(() => {
                const currentTime = +new Date()
                const startTime = this.startTime

                if (currentTime >= startTime) {
                    this.startCountDown = 0
                    return
                }

                this.startCountDown = startTime - currentTime
                this.getStartCountDown()
            }, 1000)
        },

        // 游戏结束时间倒计时
        getEndCountDown() {
            this.endTimer = setTimeout(() => {
                const currentTime = +new Date()
                const endTime = this.endTime

                if (currentTime >= endTime) {
                    this.endCountDown = 0
                    return
                }

                this.endCountDown = endTime - currentTime
                this.getEndCountDown()
            }, 1000)
        },

        // 竞猜时间倒计时
        getGuessCountDown() {
            this.guessTimer = setTimeout(() => {
                const currentTime = +new Date()
                const endDate = moment().endOf('date').valueOf()

                if (currentTime >= endDate) {
                    this.gussCountDown = 0
                    return
                }

                this.gussCountDown = endDate - currentTime
                this.getGuessCountDown()
            }, 1000)
        },
        getGameTime() {
            OrderApi.getGameTime().then(res => {
                if (Number(res && res.status) !== 1) return

                this.gameStatus = res.data && Number(res.data.game_status)

                if (this.gameStatus === 1) {
                    this.endTime = +new Date(ensureMilliseconds(res.data && res.data.time))
                    this.getEndCountDown()
                } else {
                    this.startTime = +new Date(ensureMilliseconds(res.data && res.data.time))
                    this.getStartCountDown()

                }
            })
        },
        init(){
            this.getGameTime()
            this.getGuessCountDown()
        }
    },
    mounted() {
        this.init()

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState == 'hidden') {
                clearTimeout(this.startTimer)
                clearTimeout(this.endTimer)
                clearTimeout(this.guessTimer)
                this.startTimer = null
                this.endTimer = null
                this.guessTimer = null

            } else {
                this.getGameTime()
                this.getGuessCountDown()
            }
        }, false)
    }
}

export default countDownMixin
