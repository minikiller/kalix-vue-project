<template lang="pug">
  div
    keep-alive
      base-table(bizKey='evectionApply' title='出差申请列表' v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog' bizSearch='OaEvectionApplySearch' v-bind:btnList='btnList'
      v-bind:isFixedColumn="isFixedColumn" v-bind:customTableTool="customTableTool" v-bind:customRender="customRender")
        template(slot="tableColumnSlot")
          kalix-biz-no-column // 业务编号
          el-table-column(prop="title" label="名称" align="center" width="220")
          el-table-column(prop="processinstanceid" label="经办人" align="center" width="220")
          kalix-date-column(prop="beginDate" label="出差开始时间")
          kalix-date-column(prop="endDate" label="出差结束时间")
          el-table-column(prop="auditresult" label="审批结果" align="center" width="220")
          el-table-column(prop="currentnode" label="当前环节" align="center" width="220")
          el-table-column(prop="status" label="工作流状态" align="center" width="220")
          kalix-process-status-column
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {EvectionApplyURL, EvectionApplyComponent, EvectionApplyStartURL} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {workflowBtnList, registerComp, customTableTool} from '@/views/oa/comp'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'
  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import TaskView from '@/views/oa/comp/taskView'
  // 注册全局组件
  registerComponent(EvectionApplyComponent)

  export default {
    data() {
      return {
        isFixedColumn: true,
        hasTableSelection: true,
        btnList: workflowBtnList,
        targetURL: EvectionApplyURL,
        bizDialog: [
          {id: 'view', dialog: 'OaEvectionApplyView'},
          {id: 'add', dialog: 'OaEvectionApplyAdd'},
          {id: 'edit', dialog: 'OaEvectionApplyAdd'},
          {id: 'progress', dialog: 'OaTaskView'}
        ]
      }
    },
    mounted() {
      registerComp()
    },
    methods: {
      customTableTool(row, btnId) {
        customTableTool(row, btnId, EvectionApplyStartURL, this)
      }
    },
    components: {
      BaseTable,
      KalixBizNoColumn: BizNoColumn,
      KalixDateColumn: DateColumn,
      KalixProcessStatusColumn: ProcessStatusColumn, // 工作流状态列
      KalixTaskView: TaskView
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
