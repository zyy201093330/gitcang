import {getUserList,updateUserInfo} from '@/api/list'

const state = {
  list: [],
  current: 1
}

const mutations = {
  updateList(state, list){
    state.list = list;
  }
}

const actions = {
  GetUserList({commit}, query){
    return new Promise((resolve, reject)=>{
      getUserList(query).then(res=>{
        if (res.data.code == 1){
          commit('updateList', res.data.data.list)
          resolve();
        }else{
          reject();
        }
      }).catch(err=>{
        reject(err);
      })
    })
  },
  GetUserUpdate({commit},data){
    return new Promise((resolve,reject)=>{
      updateUserInfo(data).then(res=>{
        console.log(res)
        if (res.data.code == 1){
          resolve(res.data.msg);
        }else{
          reject(res.data.msg);
        }
      }).catch(error=>{
        
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}