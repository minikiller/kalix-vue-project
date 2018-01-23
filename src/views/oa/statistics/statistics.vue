<!--
描述：办公自动化-统计管理
开发人：yangz
开发日期：2018年01月11日
-->
<template lang="pug">
  div(id="charts")
    keep-alive
      base-chart(bizKey="statistic1" title="统计图表" v-bind:autoload="false"
      v-bind:chartTargetUrl="targetUrl" width="100%" height="400px"
      bizSearch="OaStatisticSearch" v-on:selectVal="makeUrl" v-on:getProp="getProp" v-bind:appendCondition="[chartTitleStr,workflowStatus]")
</template>

<script type="text/ecmascript-6">
  import BaseChart from '@/components/custom/baseChart'
  import Cache from 'common/cache'
  // import {RedheadStatisticUrl, StatisticsComponent} from '../config.toml'
  import {StatisticsComponent} from '../config.toml'
  import {registerComponent} from '@/api/register'
  registerComponent(StatisticsComponent)
  export default {
    data() {
      return {
        prop: undefined,
        path: undefined,
        option: undefined,
        workflowStatus: undefined
      }
    },
    computed: {
      targetUrl() {
        if (this.path) {
          return 'camel/rest/' + this.path + 's/statistic'
        } else {
          return ''
        }
      },
      chartTitleStr() {
        if (this.path) {
          // {"%name%": "\u53d1\u653e"}
          if (this.path === 'carapply') {
            return '"chartTitle": "公务用车"'
          }
          if (this.path === 'employapply') {
            return '"chartTitle": "入职审批"'
          }
          if (this.path === 'recruitapply') {
            return '"chartTitle": "用工招聘"'
          }
          if (this.path === 'meetingapply') {
            return '"chartTitle": "会议招聘"'
          }
          if (this.path === 'meetingroomapply') {
            return '"chartTitle": "会议室使用"'
          }
          if (this.path === 'evectionapply') {
            return '"chartTitle": "出差"'
          }
          if (this.path === 'reimbursementapply') {
            return '"chartTitle": "报销"'
          }
          if (this.path === 'tempapply') {
            return '"chartTitle": "临时使用"'
          }
          if (this.path === 'redheadapply') {
            return '"chartTitle": "红头文件"'
          }
        } else {
          return '"chartTitle": ""'
        }
      }
    },
    components: {
      BaseChart
    },
    created() {
    },
    mounted() {
      this.workflowStatus = this.getWorkflowStatus()
    },
    methods: {
      makeUrl(val) {
        if (val) {
          let path = val.toLowerCase()
          this.path = path
        }
      },
      getProp(val) {
        this.prop = val
      },
      getWorkflowStatus() {
        let data_ = JSON.parse(Cache.get('OA-DICT-KEY'))
        let statusObj = data_.filter(item => {
          return item.type === '工作流状态'
        })
        let newStatus = '"workflowStatus":['
        if (statusObj && statusObj.length > 0) {
          // newStatus = statusObj.map(item => {
          //   return {'label': item.label, 'value': item.value}
          // })
          for (var i = 0; i < statusObj.length; i++) {
            if (i !== 0) {
              newStatus += ','
            }
            newStatus += '{"label": "' + statusObj[i].label + '","value": "' + statusObj[i].value + '"}'
          }
        }
        newStatus += ']'
        return newStatus
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
