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
                <img src="http://169.254.125.23:8081/banner@3x.png" />
            </div>
            <ul class="ulists">
                <li v-for="(item, index) in list" :key="index" @click="click(index)">
                <img v-if="item.src" :src="item.src">
                <img v-else class="add" :src="addImg">
                <p>{{item.desc}}</p>
                </li>
                <div v-show="showMask" class="mask">
                <img :src="current.demo">
                <div>
                    <button @click="upload(1)">拍照</button>
                    <button @click="upload(2)">相册</button>
                    <button @click="cancel">取消</button>
                </div>
                </div>
            </ul>
            <ul class="ulist">
                <li>
                    <p>服务类型</p>
                    <p>换驾照<span>﹥</span></p>
                </li>
                <li>
                    <p>当前驾照签发城市</p>
                    <p style="color:#999" @click="currentClick">{{text[0]}}</p>
                    
                </li>
                 <li>
                    <p>可补换的签发城市  {{this.flag}}</p>
                    <p style="color:#999" @click="replaceClick"> </p>
                               
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
       
        <div class="pick" v-show="flag">
            <button>确定</button>
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Picker} from 'mint-ui'
import 'mint-ui/lib/style.css';
import {mapState, mapMutations} from 'vuex';
import {uploadImg} from '@/api/index';
import add from '@/assets/add.png';
Vue.component(Picker.name, Picker)
export default {
    data(){
        return {
            slots: [
                {
                    flex: 1,
                    values: ['北京','山西','山东','河北','上海','杭州'],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            flag:false,
            text:'',
            text1:'',
            current:{},
            showMask:false
        }
    },
    components:{

    },
    computed:{
        ...mapState({
            list:state=>state.upload.list
        }),
        addImg(){
            return add
        }
    },
    methods:{
        ...mapMutations({
            updataList: 'upload/upadteList'
        }),
        onValuesChange(picker, values) {
            console.log(values)
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
            this.text = values
            this.text1 = values
        },
        currentClick(){
            this.flag = true
        },
        replaceClick(){
             
        },
        click(index){
            this.current = this.list[index];
            this.showMask = true;
        },
        cancel(){
            this.showMask = false;
        },
        upload(type){
            uploadImg(type).then(res=>{
                if (res.code == 0){
                    let src = '';
                    if (/picture.eclicks.cn/.test(res.data.image01)) {
                        src = res.data.image01.replace('http://', '//');
                    } else {
                        src = '//picture.eclicks.cn/' + res.data.image01;
                    }
                    this.updataList({
                        src,
                        index: this.list.findIndex(item=>item==this.current)
                    })
                }else{
                    alert(res.msg);
                }
            })
        }
        
    }
}
</script>

<style lang="scss" scoped>
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
    background: #eee;
}
.nav{
    width:100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #F0F0EF;
    background: #fff;
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
    background: rgba(0,0,0,.5);
    margin-bottom:10px;
}
.image>img{
    width:100%;
    height:100%;
}
.ulist{
    width:100%;
    height: auto;
    margin-top:10px;
}
.ulist>li{
    width:100%;
    height:40px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px;
    box-sizing: border-box;
    border-bottom:1px solid #ccc;
}
.ulist>li:last-child{
    margin-top:10px;
    margin-bottom:10px; 
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
    background: #ccc;
    padding-bottom:100px;
    position: fixed;
    left:0;
    bottom:0px;
    z-index: 100;
}


.ulists{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.ulists>li{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img{
    border-radius: .15rem;
    width: .9rem;
    height: .7rem;
    border: 1px solid #c0c0c0;
  }
  p{
    font-size: .26rem;
    padding: .1rem .3rem;
    text-align: center;
  }
}
.add{
  width: .5rem;
  height: .5rem;
  padding: .1rem .2rem;
}
.mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  img{
    width: 90%;
    margin-top: 20%;
  }
  div{
    display: flex;
    width: 90%;
    flex-direction: column;
    align-items: center;
    button{
      width: 100%;
      height: .9rem;
      font-size: .4rem;
      letter-spacing: .1rem;
      border-radius: .15rem;
      color: #3aafc0;
    }
    button:first-child{
      border-radius: .15rem .15rem 0 0;
    }
    button:nth-child(2){
      border-radius: 0 0 .15rem .15rem;
    }
    button:last-child{
      margin: .15rem 0;
    }
  }
}
</style>



    