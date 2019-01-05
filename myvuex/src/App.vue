<template>
  <div id="app">
    <!-- <button @click="changnum('+')">+</button>
    <span>{{num}}</span>
     <span>{{formatNum}}</span>  
    <button @click="changnum('-')">-</button> -->
    <!-- <button @click="login">登录</button> -->
 
     <!-- <BigData />   -->
     <router-view></router-view>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import JSBridge from './utils/JSBridge.js';
import DrivesLiscense from './component/driversLicense.vue'
import BigData from './component/bigdata.vue'
export default {
  name: 'app',
  data () {
    return {
    
    }
  },
  components:{
    DrivesLiscense:DrivesLiscense,
    BigData:BigData
  },
  computed:{
    ...mapState({
      num:state=>state.app.num
    }),
    ...mapGetters({
      formatNum: 'app/formatNum'
    })
  },
  methods: {
    ...mapMutations({
      changNum:'app/changeNum'
    }),
    ...mapActions({
      changeNumAsync:'app/changNumAsync'
    }),
    changnum(a){
      // this.$store.commit({
      //   type:'app/changNum',
      //   payload:a
      // })
      this.changeNumAsync(a).then(res=>{
        console.log('异步操作完成了！！！')
      })
    },
    login(){
      JSBridge.invoke('app','login',{
          loginCallBackName:res =>{
          console.log('res',res);
          },
          a:1,
          b:2,
          c:3
      })
    }
  },
}
</script>

<style lang="scss">
*{
  margin:0;
  padding:0;
}
body,html{
  width:100%;
  height:100%;
}
#app {
  width:100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>


