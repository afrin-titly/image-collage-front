import Vue from 'vue'
import Vuex from 'vuex'
import login from './module/login'
import navbar from './module/navbar'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
      login,
      navbar,
    }
  })

  export default store