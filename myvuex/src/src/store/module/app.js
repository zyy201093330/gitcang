const state = {
    num:1000
}

const getters = {
    formatNum:()=>{
        const re=/(?=(?!(\b))(\d{3})+$)/g;
        let str = state.num.toString().replace(re,',');
        return str
    }
}
//同步
const mutations = {
    changNum(state,action){
        state.num = action.payload=='+'?state.num+1:state.num-1;
    }
}
//异步
const actions = {
    changNumAsync({commit},action){
        return new Promise((resolve,rejects)=>{
            setTimeout(()=>{
                commit({
                    type:'changNum',
                    payload:action.payload
                })
            },1000)
            resolve()
        })
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    getters,
    actions
}