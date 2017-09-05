<template>
  <div class="x-bar">
    <div :id="id" :option="option"></div>
  </div>
</template>
<script>
//    import HighCharts from 'highcharts'
//    import 'highcharts/highcharts-3d'
  var Highcharts = require('highcharts')
  require('highcharts/highcharts-3d')(Highcharts)

  export default {
    // 验证类型
    props: {
      id: {
        type: String
      },
      option: {
        type: Object
      }
    },
    mounted() {
      Highcharts.chart(this.id, this.option)
    }
  }
</script>
