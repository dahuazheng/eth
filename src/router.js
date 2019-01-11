import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Inviter from './pages/Inviter.vue'
import RankingList from './pages/RankingList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/inviter',
      name: 'inviter',
      component: Inviter
    },
    {
      path: '/ranking-list',
      name: 'rankingName',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './pages/About.vue')
      component: RankingList
    }
  ]
})
