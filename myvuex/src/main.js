import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'
import { Popup,Picker, } from 'vant';
 

import Drive from './component/driversLicense'
import FaqPage from './component/commonpro'

Vue.use(VueRouter)
Vue.use(Popup);
Vue.use(Picker);


let routes = [
  {
      path:'/',
      name:'home',
      component:Drive
  },
  {
    path: '/faq',
    component: FaqPage
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

