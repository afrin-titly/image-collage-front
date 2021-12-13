import Vue from 'vue'
import Vuex from 'vuex'
import login from './module/login'
import sidebar from './module/sidebar'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
      login,
      sidebar,
    }
  })

  export default store