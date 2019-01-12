import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Inviter from './pages/Inviter.vue'
import RankingList from './pages/RankingList.vue'
import JoinHistory from './pages/JoinHistory.vue'
import GuessResult from './pages/GuessResult.vue'

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
    }
  ]
})
