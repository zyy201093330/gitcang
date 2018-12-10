import {routerRedux} from 'dva/router'
import {getToken,setToken} from '../utils/user'
import {tellogin,getseach,getsongsurl,getdetail} from '../services/index'

export default {

  namespace: 'example',

  state: {
    list:[],
    tellist:null,
    resourcelist:[],
    seachlist:[],
    songsurllist:[],
    info:{},
    detail:{},
    mode:1,
    current:0,
    playlist:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname})=>{
        if(pathname !== '/tellogin'){
          if(!getToken){
            dispatch(routerRedux.replace({
              pathname:'/tellogin'
            }))
          }
        }
      })
    },
  },

  effects: {
    * getUrl({payload},{call,put}){
      
    },
    * tellogin({payload},{call,put}){
      console.log(payload)
      let res = yield call(tellogin,payload)
      console.log(res.data.account.id)
      setToken(res.data.account.id)
      yield put({
        type:'updatatel',
        payload:res.data
      })
    },
    * getseach({payload},{call,put}){
      let res =  yield call(getseach,payload)
      yield put({
        type:'seachlist',
        payload:res.data.result.songs
      })
    },
    * getsongsurl({payload},{call,put}){
      let res = yield call(getsongsurl,payload)
      let detail = yield call(getdetail,payload)
      let obj = {}
      obj.url = res.data.data[0].url
      obj.picurl = detail.data.songs[0].al.picUrl
      yield put({
        type:'songsurl',
        payload:obj
      })
    },
    * getlist({payload} , {call,put}){
        let res = yield call(()=>{
          return fetch('http://123.206.55.50:14000/banner')
          .then(res=>res.json())
          .then(ress=>ress)
        })
        yield put({
          type:'uplist',
          payload:res.banners
        })
    },
    * resourcelist({payload},{call,put}){
      let res = yield call(()=>{
        return fetch('http://123.206.55.50:14000/personalized').then(res=>res.json()).then(ress=>ress)
      })
      yield put({
        type:'resource',
        payload:res.result
      })
    }
  },

  reducers: {
    uplist:(state,{payload})=>{
      return {...state,list:payload}
    },
    updatatel:(state,{payload})=>{
      return {...state,tellist:payload}
    },
    resource:(state,{payload})=>{
      return {...state,resourcelist:payload}
    },
    seachlist:(state,{payload})=>{
      return {...state,seachlist:payload}
    },
    songsurl:(state,{payload})=>{
      return {...state,songsurllist:payload}
    },
    changePlay:(state,{payload})=>{
      console.log(state,payload)
      let newState = {...state};
      if(!state.playlist.length || state.mode == 1){
        return newState
      }

      if(payload == 'prev'){
        if(state.current == 0){
          newState.current = state.playlist.length-1
        }else{
          newState.current--
        }
      }else{
        if(state.current == state.playlist.length-1){
          newState.current = 0
        }else{
          newState.current++
        }
      }
      newState.id = state.playlist[newState.current].info.id;
      newState.url = state.playlist[newState.current].info.url;
      newState.infp = state.playlist[newState.current].info;
      newState.detail = state.playlist[newState.current].detail;

      return newState;
    }
  }

};
