<!--
描述：办公自动化-任务审批组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  el-dialog.dialog-form(v-bind:title="title" v-bind:visible="visible" v-bind:before-close="onClose"
  v-bind:close-on-click-modal="false")
    template
      el-tabs(v-model="activeName" type="card")
        el-tab-pane(label="业务审批" name="approveTab")
          el-form(ref="dialogForm" v-bind:model="formModel" label-width="80px")
            el-form-item(label="审批意见" prop="content" v-bind:rules="rules.content")
              el-input(v-model="formModel.content" type="textarea")
            el-form-item
              el-button(type="success" v-on:click="onAgree") 同意
              el-button(type="danger" v-on:click="onDisagree") 不同意
        el-tab-pane(label="业务数据" name="bizDataTab")
          el-form(v-bind:model="formModel")
            component(v-bind:is="whichBizForm" v-bind:form-model="bizForm")
        el-tab-pane(label="流程历史" name="historyTab")
          kalix-paged-table(v-bind:targetURL="targetURL")
            template(slot="tableColumnSlot"  v-bind:jsonStr="jsonStr")
              el-table-column(prop="activityName" label="节点名称" align="center" width="220")
              el-table-column(prop="assignee" label="执行人" align="center"  width="90")
              kalix-date-column(prop="startTime" label="开始时间")
              kalix-date-column(prop="endTime" label="结束时间")
              el-table-column(prop="durationInMillis" label="持续时长" align="center"  width="220")
              el-table-column(prop="result" label="审批结果" align="center"  width="220")
              el-table-column(prop="comment" label="审批意见" align="center"  width="220")
        el-tab-pane(label="附件数据"  name="attachmentTab")
    div.dialog-footer(slot="footer")
      template
        el-button(type="primary" v-on:click="onClose") 关 闭
</template>

<script type="text/ecmascript-6">
  import {TaskActivitiesURL, TaskFormURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog'
  import EventBus from 'common/eventbus'
  import {ON_REFRESH_DATA} from '@/components/custom/event.toml'
  import DateColumn from 'views/oa/comp/dateColumn'
  import PagedTable from '@/components/custom/pagedTable'
  import Message from 'common/message'

  const baseFormUrl = '/camel/rest/'
  const _import = require('@/api/_import_' + process.env.NODE_ENV)

  export default {
    created() {
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    data() {
      return {
        taskActivityData: [], // 流程历史
        visible: false,
        targetURL: '',
        jsonStr: {},
        rules: {
          content: [{required: true, message: '请输入审批意见', trigger: 'blur'}]
        },
        bizData: {}, // 流程业务的动态返回配置信息
        bizForm: {}, // 流程数据信息
        title: '',
        activeName: 'approveTab',
        isView: true,
        bizKey: 'taskComplete',
        whichBizForm: '', // 动态加载业务view
        totalCount: 0,
        formModel: {content: ''}
      }
    },
    mounted() {
    },
    components: {
      KalixDialog: Dialog,
      KalixDateColumn: DateColumn,
      KalixPagedTable: PagedTable
    },
    watch: {
      visible(newValue) {    // 根据dialog的状态重置表单
        if (!newValue) {
          Object.assign(this.formModel, JSON.parse(this.tempFormModel))
          this.activeName = 'approveTab'
          this.$refs.dialogForm.resetFields()
        }
      }
    },
    methods: {
      open(row) {
        this.visible = true
        this.title = '流程审批-' + row.name
        this.targetURL = TaskActivitiesURL + row.processInstanceId
        this.getBizData(row)
      },
      completeTask(value) { // 完成工作流
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            const TaskCompleteURL = `/camel/rest/${this.bizData.processDefinitionId}s/workflow/completeTask`
            this.axios.request({
              method: 'GET',
              url: TaskCompleteURL,
              params: {
                accepted: value,
                comment: this.form.content,
                taskId: this.taskId
              }
            }).then((res) => {
              Message.processResult(res)
              this.onClose()
              EventBus.$emit(ON_REFRESH_DATA)
            })
          }
        })
      },
      onAgree() {
        this.completeTask('同意')
      },
      onDisagree() {
        this.completeTask('不同意')
      },
      onClose() {
        this.visible = false
        console.log('close event')
      },
      getBizData(row) {
        this.taskId = row.id
        this.axios.request({
          method: 'GET',
          url: TaskFormURL + row.id,  // 流程业务的动态返回配置信息
          params: {}
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
          this.whichBizForm = _import(`oa/${this.bizData.processDefinitionId}/${this.formClass}`)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
