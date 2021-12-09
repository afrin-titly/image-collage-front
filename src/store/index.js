import { createStore } from 'vuex'
import login from './module/login'

const store = createStore({
    modules: {
        login
    }
  })

  export default store