import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import SvgIcon from 'vue-svgicon'
import './assets/icons'
import './assets/styles/common.scss'

Vue.use(SvgIcon, {
  tagName: 'icon'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
