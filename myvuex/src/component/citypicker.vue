<template>
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
</template>

<script>
import {uploadImg,cityList,costList} from '@/api/index';
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

        cityChange(picker,values){
            let index = this.cityList.findIndex(item=>item.name == values[0]);
            this.cityArray[1].values = this.cityList[index].list.map(item=>item.name)
            this.$refs.cityPicker.setColumnValues(1,this.cityList[index].list.map(item=>item.name))
        },
      
        cityCancel(){
            this.iscity = false
        },
        costCancel(){
            this.iscost = false
        },
       
        cityConfirm(value){
            this.text = value
            this.cityCancel();
        },
        costConfirm(value){
            this.text1 = value
            this.costCancel();
        },
        onValuesChange(picker, values) {
            console.log('1',values)
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
       
    }
}
</script>

<style>

</style>
