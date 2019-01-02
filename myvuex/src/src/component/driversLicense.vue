<template>
    <div class="drive">
        <header class="header"></header>
        <section class="section">
            <nav class="nav">
                <span class="bg">订单提交</span>
                <span>填写收货地址</span>
                <span>正在办理</span>
                <span>办理完成</span>
            </nav>
            <div class="image">
                <img src="http://169.254.125.23:8082/banner@3x.png" />
            </div>
            <div class="photo">
                <dl>
                    <dt></dt>
                    <dd>身份证正面</dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>身份证反面</dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>驾驶证正页</dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>驾驶证副页</dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>白底半身照</dd>
                </dl>
            </div>
            <ul class="ulist">
                <li>
                    <p>服务类型</p>
                    <p>换驾照<span>﹥</span></p>
                </li>
                <li>
                    <p>当前驾照签发城市</p>
                    <p style="color:#999" @click="currentClick">请选择签发地</p>
                    
                </li>
                 <li>
                    <p>可补换的签发城市  {{this.flag}}</p>
                    <p style="color:#999" @click="replaceClick">请选择签发地</p>
                               
                </li>
                <li>
                    <p>服务费</p>
                    <p>￥399</p>
                </li>
                <li>
                    <p>优惠</p>
                    <p>登陆后查看优惠券<span>></span></p>
                </li>
            </ul>
            <a href="#">常见问题</a>
        </section>        
        <footer class="footer">
            <p>
                实付：
                <span>￥399</span>
            </p>

            <button>立即支付</button>
        </footer>
        <div class="pick"  ><mt-picker :slots="slots" @change="onValuesChange"></mt-picker></div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Picker} from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.component(Picker.name, Picker)
export default {
    data(){
        return {
            slots: [
                {
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                    className: 'slot1',
                    textAlign: 'right'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 2,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                    className: 'slot3',
                    textAlign: 'left'
                }
            ],
            flag:false,
            az:'shenhua'
        }
    },
    components:{

    },
    methods:{
        onValuesChange(picker, values) {
            console.log(values)
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        },
        currentClick(){
            this.flag = true
        },
        replaceClick(){

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
.drive{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.header{
    width:100%;
    height:1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 10px;
    box-sizing: border-box;
    border-bottom:1px solid #ccc;
}
.section{
    flex:1;
    overflow: auto;
}
.nav{
    width:100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #F0F0EF;
}
.nav>span{
    display: block;
    width:100%;
    height:100%;
    line-height: 40px;
    border-right:1px solid #F0F0EF;
}
.bg{
    background: #3AAFFC;
    color:#fff;
}
.image{
    width:100%;
    height:120px;
    background: rgba(0,0,0,.5)
}
.image>img{
    width:100%;
    height:100%;
}
.photo{
    width:100%;
    height:auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:20px 0;
}
.photo>dl{
    width:17%;
    height:auto;
}
.photo dt{
    width:30px;
    height: 30px;
    border:1px solid #ccc;
    border-radius: 10px;
    margin:0 auto;
}
.photo dd{
    margin-top:5px;
}
.ulist{
    width:100%;
    height: auto;
}
.ulist>li{
    width:100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px;
    box-sizing: border-box;
}
.footer{
    width:100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left:10px;
}
.footer>button{
    width:100px;
    height:100%;
    color:#fff;
    background: #333;
    border:0;
    box-shadow: none;
}
.pick{
    width:100%;
    height:40px;
    background: red;
    position: fixed;
    left:0;
    bottom:0px;
    color:#000;
    z-index:100;
}
</style>
