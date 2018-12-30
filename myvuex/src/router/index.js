import Vue from 'vue'
import router from 'vue-router'

Vue.use(router)

import Home from '../App.vue'

let routes = [
    {
        path:'/home',
        name:'home',
        component:Home
    }
]

export default new router({
    routes
})