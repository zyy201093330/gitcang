<template>
    <div class="fill">
        <div class="address">收货地址</div>
        <ul>
            <li @click="currentClick">
                <p>联系省市</p>
                <p>{{text[0]}}-{{text[1]}}</p>
            </li>

            <li>
                <P>详细地址</P>
                <P><input type="text"></P>
            </li>
            <li>
                <P>联系电话</P>
                <P><input type="text" placeholder="请输入电话" /></P>
            </li>
            <li>
                <p>联系人</p>
                <p><input type="text" placeholder="请输入联系人" /></p>
            </li>
        </ul>
        <button class="btn" disabled>确认</button>
        <div class="coupon" @click="maskcoupon"><img src="../assets/ee-icon.png" alt=""></div>
        <div :class="isconupn==true?'maskcoupon show':'hide'">
            <div>
                <p>分享后自己能够获得优惠券</p>
                <p>自己和好友都能得</p>
                <img src="../assets/coupon.png" />
                <div class="maskbtn">
                    <button @click="delcoupon">给钱都不要</button>
                    <button @click="fenxiang">果断分享</button>
                </div>
            </div>    
        </div>
        <van-popup v-model="iscity" position="bottom" overlay >
            <van-picker :columns="cityArray" ref="cityPicker" @change="cityChange" @cancel="cityCancel" show-toolbar title="请选择城市" @confirm="cityConfirm"/>
        </van-popup>
    </div>
</template>

<script>
import {uploadImg,cityList,costList,doShare} from '@/api/index'
export default {
    data(){
        return {
            isconupn:false,
            text:'',
            iscity:false,
            cityList:[],
            cityArray:[]
        }
    },
    created(){
        window['CHELUN_SHARE_DATA_WXTIMElINE'] = {
            title:'分享一张大图',
            imgUrl:'http://pics.sc.chinaz.com/files/pic/pic9/201812/bpic9612.jpg',
            type:'phtot'
        }
        window['CHELUN_SHARE_DATA_WXMESSAGE'] = {
            title: '五年工作经验，一年模拟',
            desc: '微信分享秘籍',
            link: 'https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419317332&token=&lang=zh_CN',
            imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546919682884&di=4dceaceab6cc8f5763a9a4e384b54843&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2017%2F04%2F30%2F149348371823762056.JPEG'
        }
        this.getCityList()
    },
    methods:{
        fenxiang(){
            doShare()
        },
        maskcoupon(){
            this.isconupn = true
        },
        delcoupon(){
            this.isconupn = false
        },
        async getCityList(){
            let res = await cityList();
            res.data.forEach(i=>{
                i.list.forEach(v=>{
                    delete v.list
                })
            })
            this.cityList = res.data
            console.log(this.cityList)
            this.cityArray = [{
                values:this.cityList.map(item => item.name)
            },{
                values:this.cityList[0].list.map(item => item.name)
            }]
            console.log(this.cityArray)
        },
        cityChange(picker,values){
            let index = this.cityList.findIndex(item=>item.name == values[0]);
            this.cityArray[1].values = this.cityList[index].list.map(item=>item.name)
            this.$refs.cityPicker.setColumnValues(1,this.cityList[index].list.map(item=>item.name))
        },  
        cityCancel(){
            this.iscity = false
        },
        cityConfirm(value){
            console.log(value)
            this.text = value
            this.cityCancel();
        },
        currentClick(){
            this.iscity = true
        },
    }
}
</script>

<style  >
.show{
    display: block;
}
.hide{
    display: none;
}
input{
    height:40px;
    border:0;
    box-shadow: none;
}
.fill{
    width:100%;
    height:auto;
    background: #eee;
}
.address{
    width:100%;
    height:40px;
    line-height: 40px;
}
.fill>ul li{
    width:100%;
    height:50px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding:0 10px;
}
.btn{
    width:100%;
    height:50px;
    border:0;
    box-shadow: none;
    color:#fff;
    font-size:18px;
    background: #999;
    position: fixed;
    bottom:0;
    left:0;
}
.coupon{
    width:50px;
    height:50px;
    border-radius: 50%;
    position: fixed;
    right:10px;
    bottom:80px;
}
.coupon>img{
    width:100%;
    height:100%;
}
.maskcoupon{
    width:100%;
    height:100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    left:0;
    top:0;
}
.maskcoupon>div{
    width:80%;
    height:300px;
    background: #fff;
    padding:10px;
    margin:200px auto;
}
.maskcoupon>div img{
    width:100%;
    height:200px;
}
.maskbtn{
    width:100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.maskbtn>button{
    width:100%;
    height:100%;
}
</style>
