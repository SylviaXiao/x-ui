<template>
  <div id="echarts">
    <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
  </div>
</template>
<script>
// 引入基本模板
import * as echarts from 'echarts'
// let echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/line') // 柱状图
// // 下面的是需要的提示框
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
export default {
  name: 'echarts',
  data () {
    return { msg: 'Welcome to Your Vue.js App' }
  },
  computed: {},
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      var option

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }

      option && myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped></style>
