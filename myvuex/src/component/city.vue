<template>
  <div>
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
        <li  @click="cityClick">
            <p>当前驾照签发城市</p>
            <p style="color:#999" >{{city.join(' ')}}</p>
        </li>
        <van-popup v-model="showCity" position="bottom">
        <van-picker :columns="cityColumns" show-toolbar title="选择签发城市"
          ref="cityPicker" @change="cityChange" @cancel="cityCancel" @confirm="cityConfirm"/>
        </van-popup>
        <li @click="costClick">
            <p>可补换的签发城市</p>
            <p style="color:#999" >{{cost.join(' ')}}</p>   
        </li>
        <van-popup v-model="showCost" position="bottom">
            <van-picker :columns="costColumns" show-toolbar title="选择补换城市"
            ref="costPicker" @change="costChange" @cancel="costCancel" @confirm="costConfirm"/>
        </van-popup>
        <li>
            <p>服务费</p>
            <p>￥399</p>
        </li>
        <br />
        <li>
            <p>优惠</p>
            <p>登陆后查看优惠券<span>></span></p>
        </li>
    </ul>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex';
export default {
  name: 'CityPicker',
  data(){
    return {
        // 控制当前驾照
        showCity: false,
        // 控制可补换驾照
        showCost: false,
        // 签发地多列选择配置
        cityColumns: [],
        // 可补换地多列选择配置
        costColumns: [{values:[]}, {values: []}],
        current:{},
        showMask:false,
        showType: false,
        typeArray: ["补驾照", "换驾照"],
        type: '换驾照',
    }
  },
  created(){
    // 获取签发城市，然后更新选择配置
    this.getCityList().then(res=>{
      this.cityColumns = [
        {
          values: this.cityList.map(item=>item.name)
        },
        {
          values: this.cityList[0].list.map(item=>item.name)
        }
      ]
    })
  },
  computed: {
    ...mapState({
      cityList: state=>state.cityPicker.cityList,
      costList: state=>state.cityPicker.costList,
      city: state=>state.cityPicker.city,
      cost: state=>state.cityPicker.cost
    })
  },
  methods: {
    ...mapActions({
      getCityList: 'cityPicker/getCityList',
      getCostList: 'cityPicker/getCostList'
    }),
    ...mapMutations({
      updateState: 'cityPicker/updateState'
    }),
    onCancel(e){
        this.showType = false;
    },
    onConfirm(value){
        this.type = value;
        this.onCancel();    
    },
    clickType(){
        this.showType = true;
    },
    // 显示选择器
    cityClick(){
      this.showCity = true;
    },
    // 当省份改变的时候更新城市数据
    cityChange(picker, values){
      // 获取当前省份的下标
      let index = this.cityList.findIndex(item=>item.name == values[0]);
      // 调用api更新城市数据
      this.$refs.cityPicker.setColumnValues(1, this.cityList[index].list.map(item=>item.name));
    },
    cityCancel(){
      this.showCity = false;
    },
    cityConfirm(values){
      console.log('values...', values);
      // 触发mutation更新城市数据
      this.updateState({city: values})
      this.cityCancel();
    },
    async costClick(){
      if (!this.city.length){
        alert('请选择签发城市');
      }else{
        await this.getCostList();
        this.costColumns = [
          {
            values: this.costList.map(item=>item.name)
          },
          {
            values: this.costList[0].list.map(item=>item.name)
          }
        ]
        this.showCost = true;
        //  // 调用api更新城市数据
        //  console.log('this.$refs...', this, this.$refs)
        // this.$refs.costPicker.setColumnValues(0, this.costList.map(item=>item.name));
        // this.$refs.costPicker.setColumnValues(1, this.costList[0].list.map(item=>item.name));
      }
    },
    costCancel(){
      this.showCost = false;
    },
    costConfirm(values){
      // 触发mutation更新城市数据
      this.updateState({cost: values})
      this.costCancel();
    },
    costChange(picker, values){
       // 获取当前省份的下标
      let index = this.costList.findIndex(item=>item.name == values[0]);
      console.log('vaules...', values, index);
      // 调用api更新城市数据
      this.$refs.costPicker.setColumnValues(1, this.costList[index].list.map(item=>item.name));
    }
  }
}
</script>
<style>
.ulist{
    width:100%;
    height: auto;
    margin-top:10px;
}
.ulist>li{
    width:100%;
    height:50px;
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
</style>
