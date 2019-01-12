import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Inviter from './pages/Inviter.vue'
import RankingList from './pages/RankingList.vue'
import JoinHistory from './pages/JoinHistory.vue'
import GuessResult from './pages/GuessResult.vue'
import UserCenter from './pages/UserCenter.vue'
import CommonProblem from './pages/CommonProblem.vue'
import SelectLang from './pages/SelectLang.vue'
import GameIntro from './pages/GameIntro.vue'
import ContactUs from './pages/ContactUs.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
    },
    {
      path: '/ranking-list',
      name: 'rankingName',
      component: RankingList
    },
    {
      path: '/user-center',
      name: 'userCenter',
      component: UserCenter
    },
    {
      path: '/common-problem',
      name: 'commonProblem',
      component: CommonProblem
    },
    {
      path: '/select-lang',
      name: 'selectLang',
      component: SelectLang
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
    }
  ]
})
