<!--
描述：办公自动化-会议室申请
开发人：sunlf
开发日期：2017年10月30日
-->
<template lang="pug">
  div
    keep-alive
      base-table(title='会议室申请列表'
      bizKey="meetingroomApply"
      v-bind:targetURL='targetURL'
      v-bind:bizDialog='bizDialog'
      bizSearch='OaMeetingroomApplySearch'
      v-bind:isFixedColumn="isFixedColumn"
      v-bind:customTableTool="customTableTool"
      v-bind:btnList='btnList')
        template(slot="tableColumnSlot")
          kalix-biz-no-column  // 业务编号
          el-table-column(prop="title" label="业务名称" align="center" width="220")
          el-table-column(prop="orgName" label="申请部门" align="center" width="220")
          kalix-date-column(prop="creationDate" label="创建时间")
          kalix-date-column(prop="applyDate" label="申请时间")
          el-table-column(prop="meetingroomId" label="会议地点" align="center" width="220")
          el-table-column(prop="meetingTopic" label="会议名称" align="center" width="220")
          el-table-column(prop="requireType" label="宣传需求（企划中心）" align="center" width="220")
          el-table-column(prop="host" label="主持人" align="center" width="220")
          el-table-column(prop="meetingDate" label="会议日期" align="center" width="220")
          el-table-column(prop="participant" label="参会人员" align="center" width="220")
          el-table-column(prop="attendance" label="出席人数" align="center" width="220")
          el-table-column(prop="equipmentRequirement" label="设备要求" align="center" width="220")
          el-table-column(prop="securityPerson" label="联系人（安全责任人）" align="center" width="220")
          el-table-column(prop="securityTel" label="联系人电话" align="center" width="220")
          el-table-column(prop="operatorPhone" label="申请人联系电话" align="center" width="220")
          el-table-column(prop="createBy" label="经办人" align="center" width="90")
          el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
          el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
          el-table-column(prop="weekCalander" label="是否周历" align="center" width="90")
          kalix-process-status-column
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {MeetingroomApplyURL, OaMeetingroomApplyComponent, MeetingroomApplyStartURL} from '../config.toml'
  import {registerComponent} from '@/api/register'
  import {workflowBtnList, registerComp, customTableTool} from '@/views/oa/comp'
  import TaskView from '@/views/oa/comp/taskView'

  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'

  registerComponent(OaMeetingroomApplyComponent)
  export default {
    data() {
      return {
        isFixedColumn: true,
        hasTableSelection: true,
        targetURL: MeetingroomApplyURL,
        btnList: workflowBtnList,
        bizDialog: [
          {id: 'view', dialog: 'OaMeetingroomApplyView'},
          {id: 'edit', dialog: 'OaMeetingroomApplyAdd'},
          {id: 'add', dialog: 'OaMeetingroomApplyAdd'},
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
        customTableTool(row, btnId, MeetingroomApplyStartURL, this)
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
