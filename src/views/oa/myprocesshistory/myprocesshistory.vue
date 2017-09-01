<!--
描述：办公自动化-我的流程组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    base-table(:isShowToolBar="isShowToolBar" bizKey="myprocesshistory" title='我的流程列表'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:bizDialog="bizDialog"
    bizSearch="OaProcessHistorySearch"
    v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {MyHistoryURL, WorkflowButtonList} from '../config.toml'
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
        btnList: WorkflowButtonList,
        targetURL: MyHistoryURL,
        tableFields: [
          {prop: 'name', label: '编号'},
          {prop: 'title', label: '业务名称'},
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
      registerComp()
    },
    filter: {},
    methods: {},
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    }
  }
</script>

<style scoped lang="stylus">

</style>
