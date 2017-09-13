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
        kalix-biz-no-column(name="name")
        el-table-column(prop="title" label="业务名称" width="280" align="center")
        el-table-column(prop="startUserId" label="启动用户" align="center")
        el-table-column(prop="startTime" label="开始时间" align="center" width="220")
          template(scope="scope")
            i(class="el-icon-time")
            span {{scope.row.startTime}}
        el-table-column(prop="endTime" label="结束时间" align="center"  width="220")
          template(scope="scope")
            i(class="el-icon-time")
            span {{scope.row.endTime}}
        el-table-column(prop="durationInMillis" label="持续时长" align="center")
        el-table-column(prop="status" label="状态" align="center")
          template(scope="scope")
            el-tag(:type="scope.row.status | statusFilter") {{scope.row.status}}
            <!--span(style="color:#f00" v-if="scope.row.status === '结束'") {{ scope.row.status }}-->
            <!--span(v-else) {{ scope.row.status }}-->
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {WorkflowHistoryURL, WorkflowButtonList} from '../config.toml'
  import {registerComp} from 'views/oa/comp'
  import BizNoColumn from 'views/oa/comp/bizNoColumn'

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
        btnList: WorkflowButtonList,
        targetURL: WorkflowHistoryURL,
        bizDialog: [
          {id: 'view', dialog: 'OaProcessHistoryView'}
        ],
        formModel: {}
      }
    },
    created() {
//      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    mounted() {
      registerComp()
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          结束: 'success',
          进行中: 'gray',
          停止: 'danger'
        }
        return statusMap[status]
      }
    },
    methods: {
      tableRowClassName(row, index) {
        if (row.status === '结束') {
          return 'finish-row'
        }
        return ''
      }
    },
    components: {
      BaseTable,
      KalixBizNoColumn: BizNoColumn
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
