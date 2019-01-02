import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/app'
import upload from './module/upload'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        upload
    } 
})