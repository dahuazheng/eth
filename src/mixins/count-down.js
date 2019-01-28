import {ensureMilliseconds, zerofill} from '../utils'
import {OrderApi, UserApi} from '../api'

const countDownMixin = {
    data() {
        return {
            startCountDown: 0,
            endCountDown: 0,
            gameStatus: 2,
            startTime: null,
            endTime: null
        }
    },
    filters: {
        displayCountDown(value) {
            value = parseInt(value / 1000)
            const hour = parseInt((value / 3600) % 24), //这里是计算还剩多少小时
                minutes = parseInt((value / 60) % 60), //这里是计算还剩多少分钟
                second = parseInt(value % 60); //这里是计算还剩多少秒数

            return zerofill(hour) + ':' + zerofill(minutes) + ':' + zerofill(second)
        }
    },
    methods: {
        // 游戏开始时间倒计时
        getStartCountDown() {
            setTimeout(() => {
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

        // 游戏时间倒计时
        getEndCountDown() {
            setTimeout(() => {
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
        getGameTime() {
            OrderApi.getGameTime().then(res => {
                if (Number(res && res.status) !== 1) return

                this.gameStatus = res.data && Number(res.data.game_status)

                if (this.gameStatus === 1) {
                    this.endTime = +new Date(ensureMilliseconds(res.data && res.data.time))
                } else {
                    this.startTime = +new Date(ensureMilliseconds(res.data && res.data.time))
                }
            })
        }

    },
    mounted() {
        console.log('jhj', UserApi.isOnline())
        if (!UserApi.isOnline()) {
            this.$router.push({name: 'login'})
            return
        }

        this.getGameTime()
        this.getStartCountDown()
        this.getEndCountDown()
    }
}

export default countDownMixin
