import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/app'
import upload from './module/upload'
import cityPicker from './module/cityPicker'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        upload,
        cityPicker
    }
})