import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'
import { Popup,Picker, } from 'vant';
import echarts  from 'echarts'
import {getToken} from '@/utils/index';
import {doLogin} from '@/api/index';
 

import Home from './component/home'
import Drive from './component/driversLicense'
import FaqPage from './component/commonpro'
import BigDta from './component/bigdata'
import Filladdress from './component/filladdress'

Vue.use(VueRouter)
Vue.use(Popup);
Vue.use(Picker);
Vue.use(echarts)
Vue.prototype.$echarts = echarts


let routes = [
  {
      path:'/home',
      name:'home',
      component:Home
  },
  {
    path:'/home/drive',
    name:'drive',
    component:Drive
  },
  {
    path: '/faq',
    component: FaqPage
  },
  {
    path:'/home/fill',
    name:'fill',
    component:Filladdress
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

