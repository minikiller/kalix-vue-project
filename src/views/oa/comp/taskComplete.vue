<!--
描述：办公自动化-任务审批组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  div
    kalix-dialog(v-bind:title="title" v-bind:visible="visible" ref="kalixBizDialog" v-bind:isView="isView"
    v-bind:close-on-click-modal="false" v-bind:formModel="formModel" v-bind:before-close="onClose")
      div(slot="dialogFormSlot")
        el-tabs
          el-tab-pane(label="业务审批")
            el-form(ref="form" v-bind:model="form" label-width="80px")
              el-form-item(label="审批意见")
                el-input(v-model="form.content" type="textarea")
              el-form-item
                el-button(type="success") 同意
                el-button(type="danger") 不同意
          el-tab-pane(label="业务数据")
            component(:is="whichBizForm" v-bind:form-model="bizForm")
          el-tab-pane(label="流程历史")
            el-table(:data="taskActivityData" stripe style="width:100%" border fit)
              el-table-column(prop="activityName" label="节点名称" align="center" width="200")
              el-table-column(prop="assignee" label="执行人" align="center")
              kalix-date-column(prop="startTime" label="开始时间")
              kalix-date-column(prop="endTime" label="结束时间")
              el-table-column(prop="durationInMillis" label="持续时长" align="center")
              el-table-column(prop="result" label="审批结果" align="center")
              el-table-column(prop="comment" label="审批意见" align="center")
          el-tab-pane(label="附件数据")
</template>

<script type="text/ecmascript-6">
  import {TaskActivitiesURL, TaskFormURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import EventBus from 'common/eventbus'
  import {ON_INIT_DIALOG_DATA} from '@/components/custom/event.toml'
  import DateColumn from 'views/oa/comp/dateColumn'
  //  import Message from 'common/message'
  const baseFormUrl = '/camel/rest/'
  const _import = require('@/api/_import_' + process.env.NODE_ENV)

  export default {
    data() {
      return {
        taskActivityData: [], // 流程历史
        bizData: {}, // 流程业务的动态返回配置信息
        bizForm: {}, // 流程数据信息
        title: '',
        visible: false,
        isView: true,
        formModel: {},
        bizKey: 'taskComplete',
        whichBizForm: '', // 动态加载业务view
        form: {}
      }
    },
    mounted() {
      EventBus.$on(this.bizKey + '-' + ON_INIT_DIALOG_DATA, this.initData)
    },
    components: {
      KalixDialog: Dialog,
      KalixDateColumn: DateColumn
    },
    methods: {
      onClose() {
        EventBus.$off(this.bizKey + '-' + ON_INIT_DIALOG_DATA)
      },
      initData(row) {
        this.title = '流程审批-' + row.name
        this.getTaskActivity(row)
        this.getBizData(row)
      },
      getTaskActivity(row) { // 获得流程历史
        this.axios.request({
          method: 'GET',
          url: TaskActivitiesURL + row.processInstanceId,
          params: {},
          data: {}
        }).then((res) => {
          this.taskActivityData = res.data.data
//          Message.processResult(res)
        })
      },
      getBizData(row) {
        this.axios.request({
          method: 'GET',
          url: TaskFormURL + row.id,  // 流程业务的动态返回配置信息
          params: {},
          data: {}
        }).then((res) => {
          this.bizData = res.data
          console.log('config data is ', this.bizData)
          let formUrl = baseFormUrl + this.bizData.processDefinitionId + 's/' + row.entityId // 组成请求form数据的地址
          // "formClass" : "kalix.workflow.meetingApply.view.MeetingApplyViewForm",
          this.formClass = this.bizData.formClass.split('.')[4]  // get MeetingApplyViewForm
          console.log('config formUrl is ', formUrl)
          return this.axios.request({
            method: 'GET',
            url: formUrl,  // entityId
            params: {},
            data: {}
          })
        }).then((res) => {
          this.bizForm = res.data
          console.log('config this.bizForm is ', this.bizForm)
          console.log('config form address is ', `oa/${this.bizData.processDefinitionId}/${this.formClass}`)
//          setTimeout(() => {
          this.whichBizForm = _import(`oa/${this.bizData.processDefinitionId}/${this.formClass}`)
//          }, 20)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
