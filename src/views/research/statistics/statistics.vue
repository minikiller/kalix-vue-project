<!--
描述：使用vue2-highcharts组件，访问地址http://localhost:8282/competitionPie
开发人：zangyanming
开发日期：2017年9月13日
-->
<template lang="pug">
  div.kalix-search
    div.kalix-search-hd
      i.iconfont.icon-query
      | 统计信息
    div.kalix-search-bd
      el-form.search-container(ref="searchForm" v-bind:inline="true")
        slot(name="searchFormSlot")
          el-form-item(label="开始时间")
            el-date-picker(v-model="beginDate_begin" v-on:change="beginChange" placeholder="选择日期" type="date")
          el-form-item(label="结束时间")
            el-date-picker(v-model="endDate_end" v-on:change="endChange" placeholder="选择日期" type="date")
        el-form-item
          el-button( type="primary" v-on:click="onQuery")
            i.iconfont.icon-query
            | 统计
          el-button(type="success" v-on:click="onResetClick")
            i.iconfont.icon-reset
            | 重置
    div.kalix-search-hd
      i.iconfont.icon-query
      | 饼状图
    vue-highcharts(v-show="isPie" v-bind:options="optionsPie" ref="chartsPie" v-bind:Highcharts="Highcharts")
    vue-highcharts(v-show="isColumn" v-bind:options="optionsColumn" ref="chartsColumn" v-bind:Highcharts="Highcharts")
    el-form.search-container(v-bind:inline="true")
      el-form-item
        el-button( type="primary" v-on:click="onPie")
          i.iconfont.icon-query
          | 饼状图
        el-button(type="success" v-on:click="onColumn")
          i.iconfont.icon-reset
          | 柱状图
</template>
<script>
  import VueHighcharts from 'vue2-highcharts'
  import HighCharts from 'highcharts'
  import HighCharts3d from 'highcharts/highcharts-3d'
  import pieOptions from './pie-options'
  import columnOptions from './column-options'
  import { StatisticsPieURL } from '../config.toml'

  HighCharts3d(HighCharts)

  export default {
    components: {
      VueHighcharts
    },
    data() {
      return {
        Highcharts: HighCharts,
        optionsPie: pieOptions.bar,
        optionsColumn: columnOptions.bar,
        beginDate_begin: '',
        endDate_end: '',
        pieData: {
          data: []
        },
        columnData: {
          colorByPoint: true,
          data: []
        },
        isPie: true,
        isColumn: false
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
        let queryStr = {'compStartTime:begin:gt': this.beginDate_begin, 'compEndTime:end:lt': this.endDate_end}
        let jsonParam =
          {
            params: {jsonStr: JSON.stringify(queryStr)}
          }
        this.$http.get(StatisticsPieURL, jsonParam).then((response) => {
          let _data = response.data.data
          let _dataPie = []
          let _dataColumn = []

          _data.forEach(item => {
            _dataPie.push({name: item.type, y: item.percentage})
            _dataColumn.push({name: item.type, y: item.cnt})
          })

          this.pieData.data = _dataPie
          this.columnData.data = _dataColumn

          this.optionsPie = pieOptions.bar
          this.optionsPie.tooltip = {
            pointFormat: '{point.name}: <b>{point.percentage:.2f}%</b>'
          }

          let chartsPie = this.$refs.chartsPie
          chartsPie.removeSeries()
          chartsPie.addSeries(this.pieData)

          this.optionsColumn = columnOptions.bar
          this.optionsColumn.tooltip = {
            pointFormat: '<b>{point.name}</b>'
          }

          let chartsColumn = this.$refs.chartsColumn
          chartsColumn.removeSeries()
          chartsColumn.addSeries(this.columnData)

          this.isPie = true
          this.isColumn = false
        })
      },
      onPie() {
        this.isPie = true
        this.isColumn = false
      },
      onColumn() {
        this.isPie = false
        this.isColumn = true
      },
      // 重置条件
      onResetClick() {
        this.beginDate_begin = null
        this.beginDate_end = null
      }
    }
  }
</script>

<style lang='stylus' type='text/stylus'>
  @import "~@/assets/stylus/color.styl"
  .kalix-search
    margin 5px
    border 1px solid border-color_1
    .kalix-search-hd
      background-color #5fa2dd
      color txt-color_1
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-search-bd
      border-top 1px solid border-color_1
      font-size 0
      padding 5px 15px
      text-align left
      .search-container
        display flex

    .el-button
      .iconfont
        font-size 14px
</style>

<!-- {"chart":{"type":"pie","options3d":{"enabled":true,"alpha":45,"beta":0}},"title":{"text":"展示不同类型作品数量"},"tooltip":{"pointFormat":"{series.name}: <b>{point.percentage:.2f}%</b>"},"plotOptions":{"pie":{"allowPointSelect":true,"cursor":"pointer","depth":35,"dataLabels":{"enabled":true,"format":"{point.name}"}}},"series":[]}-->
<!-- {"chart":{"type":"pie","options3d":{"enabled":true,"alpha":45,"beta":0}},"title":{"text":"展示不同类型作品数量"},"tooltip":{"pointFormat":"<b>{point.name}</b>"}                          ,"plotOptions":{"pie":{"allowPointSelect":true,"cursor":"pointer","depth":35,"dataLabels":{"enabled":true,"format":"{point.name}"}}},"series":[]}-->
<!-- {"chart":{"type":"column","options3d":{"enabled":false,"alpha":0,"beta":0}},"title":{"text":"展示不同类型作品数量"},"xAxis":{"type":"category"},"yAxis":{"allowDecimals":false,"title":{"text":"数量"}},"legend":{"enabled":false},"plotOptions":{"series":{"borderWidth":0,"dataLabels":{"enabled":true,"format":"{point.y}"}}},"tooltip":{"pointFormat":"<b>{point.name}</b>"},"series":[],"pointInterval":1}-->
<!-- {"data":[{"name":"漫画类","y":0.375},{"name":"动画电影","y":0.25},{"name":"动画系列连续片","y":0.25},{"name":"动画类","y":0.125}],"_colorIndex":0}-->
<!-- {"data":[{"name":"漫画类","y":0.375},{"name":"动画电影","y":0.25},{"name":"动画系列连续片","y":0.25},{"name":"动画类","y":0.125}],"_colorIndex":0}-->
