<!--
描述：办公自动化-会议申请流程组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  div
    keep-alive
      base-table(bizKey='carapply' title='用车申请列表'
      v-bind:targetURL='targetURL'
      v-bind:formModel='formModel'
      v-bind:bizDialog='bizDialog'
      bizSearch='OaCarApplySearch'
      v-bind:isFixedColumn="isFixedColumn"
      v-bind:customTableTool="customTableTool"
      v-bind:customRender="customRender"
      v-bind:btnList='btnList')
        template(slot="tableColumnSlot")
          kalix-biz-no-column
          el-table-column(prop="title" label="名称" align="center" width="220")
          el-table-column(prop="orgName" label="申请部门" align="center" width="220")
          kalix-date-column(prop="creationDate" label="申请时间")
          el-table-column(prop="reason" label="用车事由" align="center" width="220")
          el-table-column(prop="usageCount" label="乘车人数" align="center" width="220")
          el-table-column(prop="address" label="用车起始地点" align="center" width="220")
          el-table-column(prop="cityName" label="市内用车" align="center" width="220")
          el-table-column(prop="createBy" label="经办人" align="center" width="90")
          el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
          el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
          kalix-process-status-column
    kalix-task-view(ref="kalixDialog")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {
    CarApplyURL,
    CarApplyComponent,
    CarApplyStartURL
  } from '../config.toml'
  import {registerComponent} from '@/api/register'
  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import {workflowBtnList, registerComp, customTableTool} from '@/views/oa/comp'
  import TaskView from '@/views/oa/comp/taskView'
  import BizNoColumn from '@/views/oa/comp/bizNoColumn'
  import DateColumn from 'views/oa/comp/dateColumn'

  // 注册全局组件
  registerComponent(CarApplyComponent)
  export default {
    data() {
      return {
        isFixedColumn: true,
        hasTableSelection: true,
        targetURL: CarApplyURL,
        btnList: workflowBtnList,
        bizDialog: [
          {id: 'view', dialog: 'OaMeetingApplyView'},
          {id: 'edit', dialog: 'OaMeetingApplyAdd'},
          {id: 'add', dialog: 'OaMeetingApplyAdd'},
          {id: 'progress', dialog: 'OaTaskView'}
        ],
        formModel: {
          title: '吉林动画学院会议申请表',
          orgId: '',
          orgName: '',
          creationDate: '',
          meetingAgenda: '',
          meetingTopic: '',
          meetingType: null,
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
        customTableTool(row, btnId, CarApplyStartURL, this)
      },
      customRender(_data) {
        _data.forEach(function (e) {
          e.cityName = e.city ? '是' : '否'
        })
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
