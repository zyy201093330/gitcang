const state = {
    userlist:[]
}

const mutations = {
    getuserlist(state,action){
        let res = fetch('http://123.206.55.50:15000/users/list').then(res=>res.json()).then(res=>res)
        console.log(res)

    }
}

export default {
    state,
    mutations
}