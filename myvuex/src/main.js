import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'

import Drive from './driversLicense/index'

Vue.use(VueRouter)

let routes = [
  {
      path:'/home',
      name:'home',
      component:Drive
  }
]

let router  =  new VueRouter({
  routes
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

