<!--
描述：办公自动化-会议申请流程组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey='meetapply' title='会议申请列表'
    v-bind:targetURL='targetURL'
    v-bind:formModel.sync='formModel'
    v-bind:bizDialog='bizDialog'
    v-bind:customRender='customRender'
    bizSearch='OaMeetingApplySearch'
    v-bind:isFixedColumn="isFixedColumn"
    v-bind:btnList='btnList')
      template(slot="tableColumnSlot")
        el-table-column(prop="title" label="名称" align="center" width="220")
        el-table-column(prop="orgName" label="申请部门" align="center" width="220")
        el-table-column(prop="creationDate" label="申请时间" align="center" width="220")
        el-table-column(prop="meetingTopic" label="会议议题" align="center" width="220")
        el-table-column(prop="meetingroomName" label="会议地点" align="center" width="220")
        el-table-column(prop="beginTime" label="会议开始时间" align="center" width="220")
        el-table-column(prop="endTime" label="会议结束时间" align="center" width="220")
        el-table-column(prop="createBy" label="经办人" align="center" width="90")
        el-table-column(prop="auditResult" label="审批结果" align="center" width="220")
        el-table-column(prop="currentNode" label="当前环节" align="center" width="220")
        kalix-process-status-column
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {
    MeetingApplyURL,
    MeetingApplyComponent,
    WorkflowToolButtonList,
    MeetingRoomsURL,
    UserOrgsURL
  } from '../config.toml'
  import {registerComponent} from '@/api/register'
  import ProcessStatusColumn from '@/views/oa/comp/processStatusColumn.vue'
  import Cache from 'common/cache'

  // 注册全局组件
  registerComponent(MeetingApplyComponent)

  const REQUEST_DATA = {page: 1, start: 0, limit: 20}
  export default {
    data() {
      return {
        isFixedColumn: true,
        hasTableSelection: true,
        btnList: WorkflowToolButtonList,
        targetURL: MeetingApplyURL,
        bizDialog: [
          {id: 'view', dialog: 'OaMeetingApplyView'},
          {id: 'edit', dialog: 'OaMeetingApplyAdd'},
          {id: 'add', dialog: 'OaMeetingApplyAdd'}
        ],
        formModel: {
          title: '吉林动画学院会议申请表',
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
    },
    created() {
      this._initDict(`${'UserOrgs'.toUpperCase()}-KEY`, UserOrgsURL.replace('[usersId]', Cache.get('id')))
      this._initDict(`${'MeetingRooms'.toUpperCase()}-KEY`, MeetingRoomsURL)
    },
    methods: {
      customRender() {
      },
      _initDict(DictKey, reqUrl) {
        if (!Cache.get(DictKey)) {
          this.$http
            .get(reqUrl, {params: REQUEST_DATA})
            .then(res => {
              Cache.save(DictKey, JSON.stringify(res.data.data))
            })
        }
      }
    },
    components: {
      BaseTable,
      KalixProcessStatusColumn:
      ProcessStatusColumn
    }
  }
</script>

<style scoped lang="stylus">

</style>
