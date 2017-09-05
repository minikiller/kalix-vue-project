<!--
描述：使用vue2-highcharts的demo组件，访问地址http://localhost:8282/vueshow
开发人：sunlf
开发日期：2017年8月29日
-->
<template>
  <div>
    <vue-highcharts :options="options" ref="lineCharts" :Highcharts="Highcharts"></vue-highcharts>
    <div align="center">
      <el-button @click="load">load</el-button>
    </div>
  </div>
</template>
<script>
  import VueHighcharts from 'vue2-highcharts'
  import HighCharts from 'highcharts'
  import HighCharts3d from 'highcharts/highcharts-3d'
  import chatOptions from './options'
  //  var Highcharts = require('highcharts')
  //  require('highcharts/highcharts-3d')(Highcharts)
  HighCharts3d(HighCharts)
  const syncData = {
    type: 'pie',
    name: '浏览器占比',
    data: [
      ['Firefox', 45.0],
      ['IE', 26.8],
      {
        name: 'Chrome',
        y: 12.8,
        sliced: true,
        selected: true
      },
      ['Safari', 8.5],
      ['Opera', 6.2],
      ['Others', 0.7]
    ]
  }
  export default {
    components: {
      VueHighcharts
    },
    data() {
      return {
        Highcharts: HighCharts,
        options: chatOptions.bar
      }
    },
    methods: {
      load() {
        let lineCharts = this.$refs.lineCharts
        lineCharts.delegateMethod('showLoading', '加载中...')
        setTimeout(() => {
          lineCharts.addSeries(syncData)
          lineCharts.hideLoading()
        }, 500)
      }
    }
  }
</script>
