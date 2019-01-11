import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Inviter from './pages/Inviter.vue'
import JoinHistory from './pages/JoinHistory.vue'

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
      path: '/joinHistory',
      name: 'joinHistory',
      component: JoinHistory
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './pages/About.vue')
    }
  ]
})
