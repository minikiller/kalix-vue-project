<!--
描述：办公自动化-我的流程组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    base-table(:isShowToolBar="isShowToolBar" bizKey="myprocesshistory" title='我的流程列表'
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:bizDialog="bizDialog"
    bizSearch="OaProcessHistorySearch"
    v-bind:tableRowClassName="tableRowClassName"
    v-bind:btnList="btnList")
      template(slot="tableColumnSlot")
        el-table-column(prop="name" label="编号" width="280")
          template(scope="scope")
            el-popover(trigger="hover" placement="top")
              p 业务名称: {{ scope.row.title }}
              p 启动用户: {{ scope.row.startUserId }}
              p 状态:
                span(style="color:#f00" v-if="scope.row.status === '结束'") {{ scope.row.status }}
                span(v-else) {{ scope.row.status }}
              div(slot="reference" class="name-wrapper")
                el-tag {{ scope.row.name }}
        el-table-column(prop="title" label="业务名称" width="280")
        el-table-column(prop="startUserId" label="启动用户")
        el-table-column(prop="startTime" label="开始时间")
        el-table-column(prop="endTime" label="结束时间")
        el-table-column(prop="durationInMillis" label="持续时长")
        el-table-column(prop="status" label="状态")
          template(scope="scope")
            span(style="color:#f00" v-if="scope.row.status === '结束'") {{ scope.row.status }}
            span(v-else) {{ scope.row.status }}
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {WorkflowHistoryURL, WorkflowButtonList} from '../config.toml'
  import {registerComp} from 'views/oa/comp'

  export default {
    activated() {
      console.log(this.bizKey + '  is activated')
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
    },
    data() {
      return {
        isShowToolBar: false,  // 不显示工具栏
        btnList: [],
        targetURL: WorkflowHistoryURL,
        tableFields: [
          {prop: 'name', label: '编号', width: 280},
          {prop: 'title', label: '业务名称', width: 270},
          {prop: 'startUserId', label: '启动用户'},
          {prop: 'startTime', label: '开始时间'},
          {prop: 'endTime', label: '结束时间'},
          {prop: 'durationInMillis', label: '持续时长'},
          {prop: 'status', label: '状态'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'OaHistoryView'}
        ],
        formModel: {}
      }
    },
    created() {
//      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    mounted() {
      this.btnList = WorkflowButtonList
      registerComp()
    },
    filter: {},
    methods: {
      tableRowClassName(row, index) {
        if (row.status === '结束') {
          return 'finish-row'
        }
        return ''
      }
    },
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    }
  }
</script>

<style lang="stylus">
  .el-table
    .finish-row
      td
        background-color #c9e5f5 !important
</style>
