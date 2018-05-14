<!--
描述：硬件检测-统计信息
开发人：fwb
开发日期：2018年01月30日
-->
<template lang="pug">
  div(id="charts")
    keep-alive
      base-chart(bizKey="statisticView" title="统计图表" v-bind:autoload="false"
      v-bind:chartTargetUrl="targetUrl" width="100%" height="500px"
      bizSearch="OaStatisticSearch" )
</template>

<script type="text/ecmascript-6">
  import BaseChart from '@/components/custom/baseChart'
 // import Cache from 'common/cache'
  import {HardwareStatisticsURL, StatisticsComponent} from '../config.toml'
  import {registerComponent} from '@/api/register'
  registerComponent(StatisticsComponent)
  export default {
    data() {
      return {
        prop: undefined,
        path: undefined,
        option: undefined,
        workflowStatus: undefined,
        targetUrl: HardwareStatisticsURL
      }
    },
    computed: {
    },
    components: {
      BaseChart
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus">

</style>
