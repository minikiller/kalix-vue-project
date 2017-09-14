<template lang="pug">
  div
    keep-alive
      base-table(bizKey='sealApply' title='印章申请列表'
      v-bind:targetURL='targetURL'
      v-bind:formModel='formModel'
      v-bind:bizDialog='bizDialog'
      bizSearch='OaSealApplySearch'
      v-bind:isFixedColumn="isFixedColumn"
      v-bind:customTableTool="customTableTool"
      v-bind:btnList='btnList')
        template(slot="tableColumnSlot")
          kalix-biz-no-column  // 业务编号
          el-table-column(prop="title" label="业务名称" align="center" width="220")
          el-table-column(prop="orgName" label="申请部门" align="center" width="220")
          kalix-date-column(prop="creationDate" label="申请时间")
          el-table-column(prop="usageCount" label="用印数" align="center" width="220")
          el-table-column(prop="sealType" label="印章类别" align="center" width="220")
          el-table-column(prop="createBy" label="经办人" align="center" width="90")
          el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
          el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
          kalix-process-status-column
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {
    SealApplyURL,
    SealApplyComponent
  } from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {workflowBtnList, registerComp, customTableTool} from '@/views/oa/comp'
  import TaskView from '@/views/oa/comp/taskView'

  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'

  registerComponent(SealApplyComponent)
  export default {
    data() {
      return {
        isFixedColumn: true,
        hasTableSelection: true,
        targetURL: SealApplyURL,
        btnList: workflowBtnList,
        bizDialog: [
          {id: 'view', dialog: 'Oa120ApplyView'},
          {id: 'edit', dialog: 'Oa120ApplyAdd'},
          {id: 'add', dialog: 'Oa120ApplyAdd'},
          {id: 'progress', dialog: 'OaTaskView'}
        ],
        formModel: {
          title: '吉林动画学院印章申请表',
          orgId: '',
          orgName: '',
          creationDate: '',
          meetingTopic: '',
          meetingroomId: '',
          meetingroomName: '',
          beginTime: '',
          endTime: '',
          createBy: '',
          auditResult: '',
          currentNode: '',
          importantAttendeesName: '',
          otherAttendeesName: ''
        }
      }
    },
    mounted() {
      registerComp()
    },
    created() {
    },
    methods: {
      customTableTool(row, btnId) {
        customTableTool(row, btnId)
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
