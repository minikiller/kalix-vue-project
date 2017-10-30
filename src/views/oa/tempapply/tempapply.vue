<!--
描述：办公自动化-临时申请
开发人：sunlf
开发日期：2017年10月30日
-->
<template lang="pug">
  div
    keep-alive
      base-table(title='临时申请列表'
      bizKey="tempApply"
      v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog'
      bizSearch='OaTempApplySearch'
      v-bind:isFixedColumn="isFixedColumn"
      v-bind:customTableTool="customTableTool"
      v-bind:btnList='btnList')
        template(slot="tableColumnSlot")
          kalix-biz-no-column  // 业务编号
          el-table-column(prop="title" label="业务名称" align="center" width="220")
          el-table-column(prop="orgName" label="申请部门" align="center" width="220")
          kalix-date-column(prop="creationDate" label="创建时间")
          kalix-date-column(prop="applyDate" label="申请时间")
          el-table-column(prop="content" label="申请内容" align="center" width="220")
          el-table-column(prop="targetDuty" label="审批领导职务" align="center" width="220")
          el-table-column(prop="createBy" label="经办人" align="center" width="90")
          el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
          el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
          kalix-process-status-column
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {
    TempApplyURL,
    TempApplyComponent,
    TempApplyStartURL
  } from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {workflowBtnList, registerComp, customTableTool} from '@/views/oa/comp'
  import TaskView from '@/views/oa/comp/taskView'

  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'

  registerComponent(TempApplyComponent)
  export default {
    data() {
      return {
        isFixedColumn: true,
        hasTableSelection: true,
        targetURL: TempApplyURL,
        btnList: workflowBtnList,
        bizDialog: [
          {id: 'view', dialog: 'OaTempApplyView'},
          {id: 'edit', dialog: 'OaTempApplyAdd'},
          {id: 'add', dialog: 'OaTempApplyAdd'},
          {id: 'progress', dialog: 'OaTaskView'}
        ]
      }
    },
    mounted() {
      registerComp()
    },
    created() {
    },
    methods: {
      customTableTool(row, btnId) {
        customTableTool(row, btnId, TempApplyStartURL, this)
      }
    },
    components: {
      BaseTable,
      KalixTaskView: TaskView,
      KalixProcessStatusColumn: ProcessStatusColumn, // 工作流状态列
      KalixBizNoColumn: BizNoColumn,
      KalixDateColumn: DateColumn
    }
  }
</script>

<style scoped lang="stylus">

</style>
