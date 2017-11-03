<template lang="pug">
  keep-alive
    base-table(bizKey="evectionApply" title='出差申请列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:bizSearch="'OaEvectionApplySearch'" v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {EvectionApplyURL, ToolButtonList, EvectionApplyComponent} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(EvectionApplyComponent)

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: EvectionApplyURL,
        tableFields: [
          {prop: 'processinstanceid', label: '经办人'},
          {prop: 'beginDate', label: '出差开始时间'},
          {prop: 'endDate', label: '出差结束时间'},
          {prop: 'auditresult', label: '审批结果'},
          {prop: 'currentnode', label: '当前环节'},
          {prop: 'status', label: '工作流状态'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'OaEvectionApplyView'},
          {id: 'add', dialog: 'OaEvectionApplyAdd'},
          {id: 'edit', dialog: 'OaEvectionApplyAdd'}
        ]
      }
    },
    methods: {
    },
    components: {
      BaseTable
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
