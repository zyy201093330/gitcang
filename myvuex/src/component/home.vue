<template>
    <div>
        <nav class="nav">
            <p :class="idx==1?'bg':''" @click="clicknav(1)"><router-link to="/home/drive">订单提交</router-link></p>
            <p :class="idx==2?'bg':''" @click="clicknav(2)"><router-link to="/home/fill">填写收货地址</router-link> </p>
            <p :class="idx==3?'bg':''" @click="clicknav(3)">正在办理</p>
            <p :class="idx==4?'bg':''" @click="clicknav(4)">办理完成</p>
        </nav>
      
        <router-view></router-view>
       
    </div>
    
</template>

<script>

export default {
    data(){
        return {
            idx:'1',
            isconupn:false
        }
    }, 
    methods:{
        clicknav(i){
            this.idx = i
        },
      
      
    }
}
</script>

<style lang="scss" scoped>

.nav{
    width:100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #F0F0EF;
    background: #fff;
}
.nav>p{
    display: block;
    width:100%;
    height:100%;
    line-height: 40px;
    border-right:1px solid #F0F0EF;
    position: relative;
    margin-right:8px;
}
.bg{
    background: #3AAFFC;
    color:#fff;
}
.bg::after{
    content: '';
    display: block;
    position: absolute;
    border-top: .41rem solid #fff;
    border-bottom: .41rem solid #fff;
    border-left: .15rem solid #3AAFFC;
    top:0;
    left:80px;
}

 
</style>



    