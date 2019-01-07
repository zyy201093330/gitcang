import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'
import { Popup,Picker, } from 'vant';
import echarts  from 'echarts'
 

import Drive from './component/driversLicense'
import FaqPage from './component/commonpro'
import BigDta from './component/bigdata'

Vue.use(VueRouter)
Vue.use(Popup);
Vue.use(Picker);
Vue.use(echarts)
Vue.prototype.$echarts = echarts


let routes = [
  {
      path:'/',
      name:'home',
      component:BigDta
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

