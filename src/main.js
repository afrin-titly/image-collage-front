// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import App from './App.vue'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import './permission.js'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// Vue.use(router)
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
