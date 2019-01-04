<template>
    <div class="drive">
        <header class="header"></header>
        <section class="section">
            <nav class="nav">
                <p class="bg">订单提交 <span></span></p>
                <p>填写收货地址</p>
                <p>正在办理</p>
                <p>办理完成</p>
            </nav>
            <div class="image">
                <img src="http://169.254.125.23:8082/banner@3x.png" />
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
                <li @click="clickType">
                    <p>服务类型</p>
                    <p>
                        <span>{{type}}</span>
                        <span>﹥</span>
                    </p >
                </li>
                <van-popup v-model="showType" position="bottom" overlay>
                    <van-picker :columns="typeArray" @cancel="onCancel" show-toolbar title="请选择服务类型" @confirm="onConfirm"/>
                </van-popup>
                <li @click="currentClick">
                    <p>当前驾照签发城市</p>
                    <p style="color:#999" >{{text[0]}}-{{text[1]}}</p>
                </li>
                <van-popup v-model="iscity" position="bottom" overlay >
                    <van-picker :columns="cityArray" ref="cityPicker" @change="cityChange" @cancel="cityCancel" show-toolbar title="请选择城市" @confirm="cityConfirm"/>
                </van-popup>
                <li @click="replaceClick">
                    <p>可补换的签发城市</p>
                    <p style="color:#999" >{{text1[0]}}-{{text1[1]}}</p>   
                </li>
                 <van-popup v-model="iscost" position="bottom" overlay>
                    <van-picker :columns="cityArray" @cancel="costCancel" show-toolbar title="请选择城市" @confirm="costConfirm"/>
                </van-popup>
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
    </div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex';
import {uploadImg,cityList,costList} from '@/api/index';
import add from '@/assets/add.png';
export default {
    data(){
        return {
            text:'',
            text1:'',
            current:{},
            showMask:false,
            showType: false,
            typeArray: ["补驾照", "换驾照"],
            type: '换驾照',
            cityList:[],
            cityArray:[],
            iscity:false,
            costList:[],
            costArray:[],
            iscost:false
        }
    },
    created(){
        this.getCityList()
       
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
        async getCityList(){
            let res = await cityList();
            res.data.forEach(i=>{
                i.list.forEach(v=>{
                    delete v.list
                })
            })
            this.cityList = res.data
            this.cityArray = [{
                values:this.cityList.map(item => item.name)
            },{
                values:this.cityList[0].list.map(item => item.name)
            }]
            console.log(this.cityArray.values)
        },
        async getCostList(){
            let res = await costList({
                type:1,
                city_id:12010000000,
                pro_id:120
            });
            console.log(res)
            res.data.forEach(i=>{
               i.list.forEach(v=>{
                   delete v.list
               })
            })
            console.log(res)
             this.cityList = res.data
            this.cityArray = [{
                values:this.cityList.map(item => item.name)
            },{
                values:this.cityList[0].list.map(item => item.name)
            }]
        },
        ...mapMutations({
            updataList: 'upload/upadteList'
        }),
        cityChange(picker,values){
            let index = this.cityList.findIndex(item=>item.name == values[0]);
            this.cityArray[1].values = this.cityList[index].list.map(item=>item.name)
            this.$refs.cityPicker.setColumnValues(1,this.cityList[index].list.map(item=>item.name))
        },
        onCancel(e){
            this.showType = false;
        },
        cityCancel(){
            this.iscity = false
        },
        costCancel(){
            this.iscost = false
        },
        onConfirm(value){
            this.type = value;
            this.onCancel();
            
        },
        cityConfirm(value){
            this.text = value
            this.getCostList()
            this.cityCancel();
        },
        costConfirm(value){
            this.text1 = value
            this.costCancel();
        },
        clickType(){
            this.showType = true;
        },
        onValuesChange(picker, values) {
            console.log(values)
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
            this.text = values
            this.text1 = values
        },
        currentClick(){
            this.iscity = true
        },
        replaceClick(){
             this.iscost = true
        },
        click(index){
            this.current = this.list[index];
            this.showMask = true;
        },
        cancel(){
            this.showMask = false;
        },
        async upload(type){
            let res = await uploadImg(type);
            if (res.result == 1){
                this.updataList({
                    src: res.data.url,
                    index: this.list.findIndex(item=>item==this.current)
                })
                this.showMask = false;
            }else{
                alert('上传图片失败');
            }
            console.log('res...', res);
        },
        // upload(type){
        //     uploadImg(type).then(res=>{
        //         if (res.code == 0){
        //             let src = '';
        //             if (/picture.eclicks.cn/.test(res.data.image01)) {
        //                 src = res.data.image01.replace('http://', '//');
        //             } else {
        //                 src = '//picture.eclicks.cn/' + res.data.image01;
        //             }
        //             this.updataList({
        //                 src,
        //                 index: this.list.findIndex(item=>item==this.current)
        //             })
        //         }else{
        //             alert(res.msg);
        //         }
        //     })
        // }
        
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
.nav>p{
    display: block;
    width:100%;
    height:100%;
    line-height: 40px;
    border-right:1px solid #F0F0EF;
    position: relative;
    margin-right:8px;
}
.nav>p:first-child::after{
    content: '';
    display: block;
    position: absolute;
    border-top: .41rem solid #fff;
    border-bottom: .41rem solid #fff;
    border-left: .15rem solid #3AAFFC;
    top:0;
    left:85px;
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



    