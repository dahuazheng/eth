import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SvgIcon from 'vue-svgicon'
import 'mint-ui/lib/style.css'
import './assets/icons'
import './assets/styles/common.scss'

Vue.use(SvgIcon, {
  tagName: 'icon'
})

import './registerServiceWorker'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
