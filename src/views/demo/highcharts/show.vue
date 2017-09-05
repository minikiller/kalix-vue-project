<!--
描述：使用highcharts的demo组件，访问地址http://localhost:8282/show
开发人：sunlf
开发日期：2017年8月29日
-->
<template>
  <div id="app">
    <chart :id="id" :option="option"></chart>
  </div>
</template>

<script type="text/ecmascript-6">
  import Chart from './chart'
  import options from './options'

  export default {
    components: {
      Chart
    },
    data() {
      let option = options.bar
      return {
        id: 'test',
        option: option
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
