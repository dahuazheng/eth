import Vue from 'vue'
import Vuex from 'vuex'
import balance from './modules/balance'
import user from './modules/user'
// import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        balance,
    }
})
