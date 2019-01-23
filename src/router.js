import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Wallet from './pages/Wallet.vue'
import Login from './pages/Login.vue'
import Inviter from './pages/Inviter.vue'
import RankingList from './pages/RankingList.vue'
import JoinHistory from './pages/JoinHistory.vue'
import GuessResult from './pages/GuessResult.vue'
import MyGuess from './pages/MyGuess.vue'
import UserCenter from './pages/UserCenter.vue'
import UserOption from './pages/UserOption.vue'
import CommonProblem from './pages/CommonProblem.vue'
import GameIntro from './pages/GameIntro.vue'
import ContactUs from './pages/ContactUs.vue'
import ChargeMoney from './pages/ChargeMoney.vue'
import Withdraw from './pages/Withdraw.vue'
import TransactionRecord from './pages/TransactionRecord.vue'
import ScanQrcode from './pages/ScanQrcode.vue'
import PhotoQrcode from './pages/PhotoQrcode.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/wallet',
            name: 'wallet',
            component: Wallet
        }, {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/inviter',
            name: 'inviter',
            component: Inviter
        }, {
            path: '/join-history',
            name: 'joinHistory',
            component: JoinHistory
        }, {
            path: '/guess-result',
            name: 'guessResult',
            component: GuessResult
        }, {
            path: '/my-guess',
            name: 'myGuess',
            component: MyGuess
        }, {
            path: '/user-center',
            name: 'userCenter',
            component: UserCenter
        },
        {
            path: '/ranking-list',
            name: 'rankingName',
            component: RankingList
        },
        {
            path: '/user-option',
            name: 'userOption',
            component: UserOption
        },
        {
            path: '/common-problem',
            name: 'commonProblem',
            component: CommonProblem
        },
        {
            path: '/game-intro',
            name: 'gameIntro',
            component: GameIntro
        },
        {
            path: '/contact-us',
            name: 'contactUs',
            component: ContactUs
        },
        {
            path: '/charge-money',
            name: 'chargeMoney',
            component: ChargeMoney
        },
        {
            path: '/withdraw',
            name: 'withdraw',
            component: Withdraw
        },
        {
            path: '/transaction-Record',
            name: 'transactionRecord',
            component: TransactionRecord
        },
        {
            path: '/scan-qrcode',
            name: 'scanQrcode',
            component: ScanQrcode
        },
        {
            path: '/photo-qrcode',
            name: 'photoQrcode',
            component: PhotoQrcode
        }

    ]
})
