<!--
描述：办公自动化-会议申请流程组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  div
    keep-alive
      base-table(bizKey='meetapply' title='会议申请列表'
      v-bind:targetURL='targetURL'
      v-bind:formRules="formRules"
      v-bind:bizDialog='bizDialog'
      bizSearch='OaMeetingApplySearch'
      v-bind:isFixedColumn="isFixedColumn"
      v-bind:customTableTool="customTableTool"
      v-bind:btnList='btnList')
        template(slot="tableColumnSlot")
          kalix-biz-no-column
          el-table-column(prop="title" label="名称" align="center" width="220")
          el-table-column(prop="orgName" label="申请部门" align="center" width="220")
          kalix-date-column(prop="creationDate" label="申请时间")
          el-table-column(prop="meetingTopic" label="会议议题" align="center" width="220")
          el-table-column(prop="meetingroomName" label="会议地点" align="center" width="220")
          kalix-date-column(prop="beginTime" label="会议开始时间")
          kalix-date-column(prop="endTime" label="会议结束时间")
          el-table-column(prop="createBy" label="经办人" align="center" width="90")
          el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
          el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
          kalix-process-status-column
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {
    MeetingApplyURL,
    MeetingApplyComponent,
    MeetingApplyStartURL
  } from '../config.toml'
  import {registerComponent} from '@/api/register'
  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import {workflowBtnList, registerComp, customTableTool} from '@/views/oa/comp'
  import TaskView from '@/views/oa/comp/taskView'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'

  // 注册全局组件
  registerComponent(MeetingApplyComponent)
  export default {
    data() {
      return {
        isFixedColumn: true,
        hasTableSelection: true,
        targetURL: MeetingApplyURL,
        btnList: workflowBtnList,
        bizDialog: [
          {id: 'view', dialog: 'OaMeetingApplyView'},
          {id: 'edit', dialog: 'OaMeetingApplyAdd'},
          {id: 'add', dialog: 'OaMeetingApplyAdd'},
          {id: 'progress', dialog: 'OaTaskView'}
        ],
        formRules: {
          meetingTopic: [
            {required: true, message: '请输入议题', trigger: 'blur'}
          ],
          meetingAgenda: [
            {required: true, message: '请输入议程', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      registerComp()
    },
    created() {
//      this._initDict(`${'UserOrgs'.toUpperCase()}-KEY`, UserOrgsURL.replace('[usersId]', Cache.get('id')))
//      this._initDict(`${'MeetingRooms'.toUpperCase()}-KEY`, MeetingRoomsURL)
    },
    methods: {
      customTableTool(row, btnId) {
        customTableTool(row, btnId, MeetingApplyStartURL, this)
      }
    },
    components: {
      BaseTable,
      KalixProcessStatusColumn: ProcessStatusColumn, // 工作流状态列
      KalixTaskView: TaskView,
      KalixBizNoColumn: BizNoColumn,
      KalixDateColumn: DateColumn
    }
  }
</script>

<style scoped lang="stylus">

</style>
