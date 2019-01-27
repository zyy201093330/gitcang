<template>
  <div class="chart-container">
      <ve-line :data="commitlist"></ve-line>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'KeyboardChart',
  data(){
    return {
      chartData: {
          columns: ['日期', '访问用户', '下单用户','下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
      },
      commitlist:{
        columns:[],
        rows:[]
      }
    }
  },
  created(){
    Axios.get('http://123.206.55.50:15000/users/commit').then(res=>{
      console.log(res.data)
      let columns = ['date','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
      let rows = res.data[0].commit;
      rows.forEach((v,i)=>{
        let date = v.date
        v['1月'] = res.data[0].commit[date-1] && res.data[0].commit[date-1].commit
        v['2月'] = res.data[1].commit[date-1] && res.data[1].commit[date-1].commit
        v['3月'] = res.data[2].commit[date-1] && res.data[2].commit[date-1].commit
        v['4月'] = res.data[3].commit[date-1] && res.data[3].commit[date-1].commit
        v['5月'] = res.data[4].commit[date-1] && res.data[4].commit[date-1].commit
        v['6月'] = res.data[5].commit[date-1] && res.data[5].commit[date-1].commit
        v['7月'] = res.data[6].commit[date-1] && res.data[6].commit[date-1].commit
        v['8月'] = res.data[7].commit[date-1] && res.data[7].commit[date-1].commit
        v['9月'] = res.data[8].commit[date-1] && res.data[8].commit[date-1].commit
        v['10月'] = res.data[9].commit[date-1] && res.data[9].commit[date-1].commit
        v['11月'] = res.data[10].commit[date-1] && res.data[10].commit[date-1].commit
        v['12月'] = res.data[11].commit[date-1] && res.data[11].commit[date-1].commit
      })
      this.commitlist = {
        columns,
        rows 
      }
    })
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

