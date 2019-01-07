<template>
 <div>
  <div ref="main" :style="boxinfo"></div>
 </div>
</template>
<script>

export default {
  data() {
    return {
    }
  },
  props: ['data', 'type', 'boxinfo'], // data为图标渲染需要的数据type为图表类型boxinfo为容器的宽高
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      let { data, type } = this
      let chart = this.$echarts.init(this.$refs.main)
    //通过以上方法获取dom，无论组件复用多少次，都不需要担心id唯一的问题了。
      let { color, xAxis, yAxis, series} = data      
      let option = {
       color,
        xAxis, //x轴信息
        yAxis, //y轴信息
        dataZoom: [ //如果既想通过鼠标和滚动条控制坐标系可以向下面这样添加两种类型的控制
         {
          type: 'inside',
          xAxisIndex: [0]//里面为可以共同拖拽的坐标系下标
         },
         {
          type: 'slider',
          xAxisIndex: [0]
         }
        ],
        series: [
          {
            type,
            data:series[0].data          }
        ]
      }
      chart.setOption(option)
    }
  }}</script>
<style scoped></style>