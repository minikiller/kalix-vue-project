<!--
描述：使用vue2-highcharts组件，访问地址http://localhost:8282/competitionPie
开发人：zangyanming
开发日期：2017年9月13日
-->
<template lang="pug">
  div.kalix-article
    div.kalix-search
      div.kalix-search-hd
        i.iconfont.icon-query
        | 查询
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
            el-select(v-model="view" v-on:change="selectOnChange" style="margin-left:8px;")
              el-option(value="1" label="饼状图")
              el-option(value="2" label="柱状图")
    div.kalix-wrapper(style="top:120px")
      div.kalix-wrapper-hd
        i.iconfont.icon-query
        | {{showTitle}}
      div.kalix-wrapper-bd
        div.kalix-table-container
          vue-highcharts(v-show="isPie" v-bind:options="optionsPie" ref="chartsPie" v-bind:Highcharts="Highcharts")
          vue-highcharts(v-show="isColumn" v-bind:options="optionsColumn" ref="chartsColumn" v-bind:Highcharts="Highcharts")
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
        view: '1',
        isPie: true,
        isColumn: false,
        showTitle: '展示不同类型作品所占百分比'
      }
    },
    methods: {
      selectOnChange(val) {
        if (val === '1') {
          this.onPie()
        } else if (val === '2') {
          this.onColumn()
        }
      },
      beginChange(val) {
        this.beginDate_begin = val
      },
      endChange(val) {
        this.beginDate_end = val
      },
      onQuery() {
        let queryStr = {'compStartTime:begin:gt': this.beginDate_begin, 'compEndTime:end:lt': this.endDate_end, 'statisticsType': 0}
        let jsonParam =
          {
            params: {jsonStr: JSON.stringify(queryStr)}
          }
        this.$http.get(StatisticsPieURL, jsonParam).then((response) => {
          let _data = response.data.data
          console.log(response)
          let _dataPie = []
          let _dataColumn = []

          _data.forEach(item => {
            _dataPie.push({name: item.label, y: item.percentage})
            _dataColumn.push({name: item.label, y: item.cnt})
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
        this.showTitle = '展示不同类型作品所占百分比'
        this.isPie = true
        this.isColumn = false
      },
      onColumn() {
        this.showTitle = '展示不同类型作品数量'
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
  @import "~@/assets/stylus/baseTable"
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
