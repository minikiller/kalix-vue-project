<!--
描述：办公自动化-报销申请
开发人：hqj
开发日期：2017年10月30日
-->
<template lang="pug">
  div
    keep-alive
      base-table(bizKey='reimbursementApply' title='报销申请列表' v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog' bizSearch='OaReimbursementApplySearch' v-bind:btnList='btnList'
      v-bind:isFixedColumn="isFixedColumn" v-bind:customTableTool="customTableTool")
        template(slot="tableColumnSlot")
          kalix-biz-no-column // 业务编号
          el-table-column(prop="title" label="名称" align="center" width="220")
          kalix-date-column(prop="creationDate" label="创建时间")
          el-table-column(prop="orgName" label="申请部门" align="center" width="220")
          kalix-date-column(prop="applyDate" label="申请时间")
          el-table-column(prop="createBy" label="出差人" align="center" width="220")
          el-table-column(prop="reason" label="出差事由" align="center" width="220")
          el-table-column(prop="projectName" label="项目名称" align="center" width="220")
          el-table-column(prop="payeeUser" label="领款人" align="center" width="220")
          kalix-date-column(prop="reimbursementDate" label="报销日期")
          el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
          el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
          kalix-process-status-column
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {ReimbursementApplyURL, ReimbursementApplyComponent, ReimbursementApplyStartURL} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {workflowBtnList, registerComp, customTableTool} from '@/views/oa/comp'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'
  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import TaskView from '@/views/oa/comp/taskView'

  // 注册全局组件
  registerComponent(ReimbursementApplyComponent)

  export default {
    data() {
      return {
        isFixedColumn: true,
        hasTableSelection: true,
        btnList: workflowBtnList,
        targetURL: ReimbursementApplyURL,
        bizDialog: [
          {id: 'view', dialog: 'OaReimbursementApplyView'},
          {id: 'edit', dialog: 'OaReimbursementApplyAdd'},
          {id: 'add', dialog: 'OaReimbursementApplyAdd'},
          {id: 'progress', dialog: 'OaTaskView'}
        ]
      }
    },
    components: {
      BaseTable,
      KalixBizNoColumn: BizNoColumn,
      KalixDateColumn: DateColumn,
      KalixProcessStatusColumn: ProcessStatusColumn, // 工作流状态列
      KalixTaskView: TaskView
    },
    created() {
    },
    mounted() {
      registerComp()
    },
    methods: {
      customTableTool(row, btnId) {
        customTableTool(row, btnId, ReimbursementApplyStartURL, this)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
