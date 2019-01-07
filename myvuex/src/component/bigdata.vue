<template>
    <div class="bigdata">
        <div class="header">
            <div class="chelun">车轮</div>
            <nav :class="flag == true?'show nav':'hide nav'" >
                <span>产品</span>
                <span>关于我们</span>
                <span>大数据</span>
                <span>新闻</span>
                <span>招聘</span>
                <span>商城</span>
                <span>登录/注册</span>
            </nav>
            <div class="navlist"  @click="listShow">列表</div>
        </div>
        <div class="images"><img src="http://localhost:8081/bigdata.png" /></div>
        <div class="bigdata_section">
            <div class="sec_left">
                <div class="left_nav">
                    <span>分析评论</span>
                    <span>趋势榜单</span>
                    <span>研究报告</span>
                </div>
            </div>
            <div class="sec_right"></div>
        </div>
        <Echarts />
    </div>
</template>
<script>
import echarts from 'echarts'
import mbox from '../echarts/index.vue'
export default {
    data(){
        return {
            flag:false
        }
    },
    components:{
        Echarts:mbox
    },
    mounted(){
        window.addEventListener("scroll", function(a){
            console.log('scrolling');
        })
    },
    methods:{
        listShow(){
            this.flag = true
        }
    }
}
</script>

<style>
.show{
    display: block;
}
.hide{
    display: none;
}
@media screen and (min-width: 768px) {
    .header{
        width:100%;
        height:100px;
        position: fixed;
        top:0;
        left:0;
    }
    .images{
        width:100%;
        height:700px;
    }
    .images>img{
        width:100%;
        height:100%;
    }
    .chelun{
        position: absolute;
        left:200px;
        top:35px;
        font-size:22px;
    }
    .header>nav{
        position: absolute;
        top:0px;
        width:100%;
        height:100px;
        padding:0 200px;
        padding-left:300px;
        box-sizing: border-box;
        border-bottom:1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size:22px;
    }
    .navlist{
        display: none;
    }
    .nav>span{
        white-space: nowrap;
    }
    .nav>span:last-child{
        font-size:16px;
    }
    .bigdata_section{
        width:100%;
        height:auto;
        display: flex;
        padding:0 8%;
    }
    .sec_left{
        width:50%;
        height:auto;
    }
    .left_nav{
        width:100%;
        height:50px;
        font-size:14px;
        font-weight: bold;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .sec_right{
        width:50%;
        height:auto;
        background: red;
    }
}
@media screen and (max-width: 963px) {
    .header{
        width:100%;
        height:40px;
        background: #fff;    
        margin-bottom:20px;
    }
    .images>img{
        width:100%;
        height:200px;
    }
    .images>img{
        width:100%;
        height:100%;
    }
    .chelun{
        position: absolute;
        left:20%;
        top:15px;
        font-size:22px;
    }
    .header>nav{
        width:100%;
        height:100%;
        box-sizing: border-box;
        background: slateblue;
        font-size:18px;
        position: fixed;
        top:0px;
        right:0px;
        padding:0 10%;
    }
    .nav>span{
        display: block;
        height:50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        text-align:left;
    }
    .navlist{
        display: block;
        font-size:22px;
        line-height:65px;
        text-align: right;
        box-sizing: border-box;
        padding-right:10px;
    }
}
</style>
