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
      v-bind:customRender="customRender"
      v-bind:btnList='btnList')
        template(slot="tableColumnSlot")
          el-table-column(prop="title" label="名称" align="center" width="220")
          el-table-column
          kalix-biz-no-column // 业务编号
          el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
          kalix-process-status-column // 工作流状态
          el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
          el-table-column(prop="weekCalanderName" label="是否周历" align="center" width="90")
          el-table-column(prop="meetingDateColumn" label="会议时间" align="center" width="220")
          el-table-column(prop="meetingroomName" label="会议地点" align="center" width="220")
          el-table-column(prop="meetingTopic" label="会议名称" align="center" width="220")
          el-table-column(prop="participant" label="参会人员" align="center" width="220")
          el-table-column(prop="orgName" label="主办部门" align="center" width="220")
          el-table-column(prop="host" label="主持人" align="center" width="90")
          el-table-column(prop="securityPerson" label="协调人" align="center" width="90")
          el-table-column
          kalix-date-column(prop="creationDate" label="创建时间")
          kalix-date-column(prop="applyDate" label="申请时间")
          el-table-column(prop="createBy" label="经办人" align="center" width="90")
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
//  import {formatDate} from 'common/typeFormat'

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
      },
      customRender(_data) {
        _data.forEach(function (e) {
          e.weekCalanderName = e.weekCalander ? '是' : '否'
//          e.meetingDateColumn = formatDate(new Date(e.meetingDate), 'yyyy-MM-dd')
          e.meetingDateColumn = e.meetingDateStr + ' ' + e.beginTimeStr + '-' + e.endTimeStr
        })
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
