<!--
描述：使用vue2-highcharts组件，访问地址http://localhost:8282/competitionPie
开发人：zangyanming
开发日期：2017年9月13日
-->
<template>
  <div>
    <el-form :inline="true" style="text-align: center">
      <el-form-item label="开始时间">
        <el-date-picker v-model="beginDate_begin" v-on:change="beginChange" placeholder="选择日期"
                        type="date">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="endDate_end" v-on:change="endChange" placeholder="选择日期"
                        type="date">
        </el-date-picker>
      </el-form-item>

      <el-button @click="onQuery">查询</el-button>
    </el-form>
    <vue-highcharts :options="options" ref="lineCharts" :Highcharts="Highcharts"></vue-highcharts>
  </div>
</template>
<script>
  import VueHighcharts from 'vue2-highcharts'
  import HighCharts from 'highcharts'
  import HighCharts3d from 'highcharts/highcharts-3d'
  import chatOptions from './competition-options'
  import { StatisticsPieURL } from '../config.toml'

  HighCharts3d(HighCharts)

  export default {
    components: {
      VueHighcharts
    },
    data() {
      return {
        Highcharts: HighCharts,
        options: chatOptions.bar,
        beginDate_begin: '',
        endDate_end: '',
        syncData: {
          type: 'pie',
          name: '数量',
          data: [
          ]
        }
      }
    },
    methods: {
      beginChange(val) {
        this.beginDate_begin = val
      },
      endChange(val) {
        this.beginDate_end = val
      },
      onQuery() {
        console.log('onquery ')
        var queryStr = {'compStartTime:begin:gt': this.beginDate_begin, 'compEndTime:end:lt': this.endDate_end}
        var jsonParam =
          {
            params: {jsonStr: JSON.stringify(queryStr)}
          }
        this.$http.get(StatisticsPieURL, jsonParam).then((response) => {
          let _data = response.data.data
          let _data2 = []

          _data.forEach(item => {
            _data2.push({name: item.type, y: item.percentage})
          })

          this.syncData.data = _data2
          console.log(this.syncData)

          let lineCharts = this.$refs.lineCharts
          lineCharts.removeSeries()
          lineCharts.addSeries(this.syncData)
        })
      }
    },
    mounted() {
      let lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', '加载中...')
      let scope = this
      setTimeout(() => {
        lineCharts.addSeries(scope.syncData)
        lineCharts.hideLoading()
      }, 500)
    }
  }
</script>
