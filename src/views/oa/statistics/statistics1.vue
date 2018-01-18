<!--
描述：办公自动化-统计管理
开发人：yangz
开发日期：2018年01月11日
-->
<template lang="pug">
  div(id="charts")
    div(style="float:left")
      base-chart(id="c4" v-bind:autoload="true" v-bind:targetUrl="targetUrl1" width="500px"
        height="400px")
    div(style="float:left")
      base-chart(id="c5" v-bind:autoload="false" v-bind:option="option" width="500px" height="400px")
    figure
      el-button(@click="getData")
    base-chart(id="c6" v-bind:autoload="false" v-bind:option="option1" width="500px" height="400px")
</template>

<script type="text/ecmascript-6">
  import BaseChart from '@/components/custom/baseChartView'
  import {RedheadStatisticUrl} from '../config.toml'

  export default {
    data() {
      return {
        targetUrl1: RedheadStatisticUrl,
        option1: undefined,
        option: {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
        }
      }
    },
    components: {
      BaseChart
    },
    created() {
    },
    mounted() {
    },
    methods: {
      getData() {
        this.$http.get(this.targetUrl1, {
          params: ''
        }).then(response => {
          let opt = response.data.data[0].option
          opt = JSON.parse(opt)
          this.option1 = opt
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
