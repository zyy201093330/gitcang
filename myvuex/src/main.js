import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import Router from './router/index'

new Vue({
  el: '#app',
  store,
  Router,
  render: h => h(App)
})

