import {tellogin,getremmendersongs,getremmenderresource} from '../services/index'

export default {

  namespace: 'dayremmend',

  state: {
    dayplaylist:null
  },

  subscriptions: {
    setup({ dispatch, history }) {   
    },
  },

  effects: {
    * getremmendersongs({payload},{call,put}){
        let songs = yield call(getremmendersongs,payload)
        console.log(songs.data)
        yield put({
          type:'daylist',
          payload:songs.data.recommend
        })
    }
  },

  reducers: {
    daylist:(state,{payload})=>{
      return {...state,dayplaylist:payload}
    }
  }

};
