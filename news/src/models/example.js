import {routerRedux} from 'dva/router'
import {getToken,setToken} from '../utils/user'
import {tellogin,getseach,getsongsurl,getdetail,getlyric} from '../services/index'

export default {

  namespace: 'example',

  state: {
    songCount: 0,
    list:[],
    tellist:null,
    resourcelist:[],
    seachlist:[],
    songsurllist:[],
    info:{},
    detail:{},
    mode:2,
    current:0,
    url:'',
    id:0,
    picUrl:'',
    datalyric:null,
    // playlist:JSON.parse(window.localStorage.getItem('playlist'))||[]
    playList: JSON.parse(window.localStorage.getItem('playList'))||[]  // 播放列表
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
    *getlyric({payload},{call,put}){
      console.log(payload)
      let res = yield call(getlyric,payload);
      console.log(res)
      yield put({
        type:'datalyric',
        payload:{
          datalyric:res.data.lrc.lyric                      
        }
      })
    },
    *getUrl({payload}, {call, put}){
      let response = yield call(getsongsurl, payload);
      let detail = yield call(getdetail, payload);

      console.log('url response...', response);
      console.log('url detail...', detail);

      let obj = {info:response.data.data[0]};
      obj.id = payload;
      obj.url = response.data.data[0].url;
      obj.detail = detail.data.songs[0];
      yield put({
        type: 'updateState',
        payload: obj
      })
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
      obj.picUrl = detail.data.songs[0].al.picUrl
      obj.id = detail.data.songs[0].al.id
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
    },
    * getUrls({payload}, {call, put}){
      console.log('getUrls payload', payload);
   
      let responses = yield call(getsongsurl, payload.join(','));
       
      let details = yield call(getdetail, payload.join(','));
      console.log('urls response...', responses);
      console.log('urls detail...', details);
      responses = responses.data.data;
      details = details.data.songs;
      let playList = [];
      details.forEach(item=>{
        playList.push({
          detail: item,
          info: responses.filter(value=>value.id==item.id)[0]
        })
      })
      window.localStorage.setItem('playList', JSON.stringify(playList));
      yield put({
        type: 'updateState',
        payload: {playList}
      })
    },
    * distinguishSong({payload},{call,put}){
      console.log(payload)
      let songList = [],ids = [];
      while(true){
        let id = Math.floor(Math.random()*payload.length);
        if (ids.indexOf(payload[id]) == -1){
          ids.push(payload[id]);
          if (ids.length == 10){
            break;
          }
        }
      }
      console.log('ids',ids)
      let responses = yield call(getsongsurl, ids.join(','));
      let details = yield call(getdetail, ids.join(','));
      responses = responses.data.data;
      details = details.data.songs;
      details.forEach(item=>{
        songList.push({
          name: item,
          url: responses.filter(value=>value.id==item.id)[0].url
        })
      })

      console.log('songList...', songList);
      yield put({
        type: 'updateState',
        payload: {
          distiguishList: songList
        }
      })
      window.localStorage.setItem('distiguishList', JSON.stringify(songList));
      yield put(routerRedux.push({
        pathname: `/DistinguishPage`,
      }))
    
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
      return {...state,...payload}
    },
    changePlay(state, {payload}){
      let newState = {...state};

      if (!state.playList.length || state.mode == 1){
        return newState;
      }
   
      if (state.mode == 2){
        let index = Math.floor(Math.random()*(state.playList.length-1));
        newState.current = index;
      }else{

        if (payload == 'prev'){
          if (state.current == 0){
            newState.current = state.playList.length-1;
          }else{
            newState.current--;
          }
        }else{
          if (state.current == state.playList.length-1){
            newState.current = 0;
          }else{
            newState.current++;
          }
        }
      }

      newState.id = state.playList[newState.current].info.id;
      newState.url = state.playList[newState.current].info.url;
      newState.info = state.playList[newState.current].info;
      newState.detail = state.playList[newState.current].detail;
      newState.picUrl = state.playList[newState.current].detail.al.picUrl
      console.log(newState.id)
      return newState;
    },
    changeMode(state){
      let newState = {...state};
      newState.mode = (newState.mode)%3+1;
      return newState;
    },
    updateState(state, action){
      return {...state, ...action.payload}
    },
    datalyric(state,action){
      console.log(action)
      return {...state,...action.payload}
    }
  }

};
