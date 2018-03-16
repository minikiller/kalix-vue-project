<!--
描述：办公自动化-任务审批组件
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  el-dialog.dialog-form(ref="kalixTaskDialog" v-bind:title="title" v-bind:visible="visible" v-bind:before-close="onClose"
  v-bind:close-on-click-modal="false")
    div(style="max-height:500px;overflow: auto;" ref="kalixCollapseWrapper")
      el-collapse(ref="bizTabs" v-model="activeNames" type="card")
        el-collapse-item(name="bizDataTab")
          template(slot="title")
            el-tag(type="success")
              i.header-icon.el-icon-date
              | &nbsp;业务数据
          el-form(v-bind:model="bizForm" ref="bizDataForm")
            component(v-bind:is="whichBizForm" v-bind:form-model="bizForm" ref="bizData")
            div(v-if="formClass.indexOf('Modify')>0" style="text-align:right;margin-top:12px;")
              el-button(type="success" v-on:click="onSubmit") 提交
        el-collapse-item(name="historyTab")
          template(slot="title")
            el-tag(type="danger")
              i.header-icon.el-icon-menu
              | &nbsp;流程历史
          kalix-paged-table(v-bind:targetURL="targetURL" v-bind:jsonStr="jsonStr")
            template(slot="tableColumnSlot")
              el-table-column(prop="activityName" label="节点名称" align="center" width="220")
              el-table-column(prop="assignee" label="执行人" align="center" width="90")
              el-table-column(prop="result" label="审批结果" align="center" width="90")
              el-table-column(prop="comment" label="审批意见" align="center" width="220")
              el-table-column
              kalix-date-column(prop="startTime" label="开始时间")
              kalix-date-column(prop="endTime" label="结束时间")
              el-table-column(prop="durationInMillis" label="持续时长" align="center" width="80")
        el-collapse-item(title="附件数据"  name="attachmentTab")
          template(slot="title")
            el-tag(type="primary")
              i.header-icon.el-icon-document
              | &nbsp;附件数据
          kalix-paged-table(v-bind:targetURL="attachTargetURL" v-bind:jsonStr="attachJsonStr")
            template(slot="tableColumnSlot")
              el-table-column(prop="attachmentName" label="名称")
                template(slot-scope="scope")
                  div.attachment-name {{scope.row.attachmentName}}
              el-table-column(label="大小" width="100")
                template(slot-scope="scope")
                  span {{setFileSize(scope.row.attachmentSize)}}
              el-table-column(prop="attachmentType" label="类型" width="116")
              kalix-date-column(prop="creationDate" label="上传日期")
              el-table-column(label="操作" width="120")
                template(slot-scope="scope")
                  a.el-button.el-button--primary.el-button--mini(v-bind:href="scope.row.attachmentPath" target="_blank" style="text-decoration:none;")
                    | 下载
        el-collapse-item(v-if="isApproveShow" title="业务审批" name="approveTab")
          template(slot="title")
            el-tag(type="warning")
              i.header-icon.el-icon-edit
              | &nbsp;业务审批
          el-form(ref="dialogForm" v-bind:model="formModel" label-width="100px")
            template(v-if="formClass.indexOf('Modify')>0")
              el-form-item(label="修改内容" prop="content" v-bind:rules="rules.content")
                el-input(v-model="formModel.content" type="textarea")
              el-form-item
                el-button(type="success" v-on:click="onReApply") 重新申请
            template(v-else)
              el-form-item(label="审批意见" prop="content" v-bind:rules="rules.content")
                el-input(v-model="formModel.content" type="textarea")
              el-form-item
                el-button(type="success" v-on:click="onAgree") 同意
                el-button(type="danger" v-on:click="onDisagree") 不同意
    div.dialog-footer(slot="footer")
      template
        el-button(type="primary" v-on:click="onClose") 关 闭
</template>

<script type="text/ecmascript-6">
  import {TaskActivitiesURL, TaskFormURL} from '../config.toml'
  import {AttachmentURL} from 'config/global.toml'
  import Dialog from '@/components/custom/baseDialog'
  import {ON_REFRESH_DATA} from '@/components/custom/event.toml'
  import EventBus from 'common/eventbus'
  import Message from 'common/message'
  import DateColumn from 'views/oa/comp/dateColumn'
  import {Loading} from 'element-ui'
  import prettyBytes from 'pretty-bytes'
  import Vue from 'vue'

  const baseFormUrl = '/camel/rest/'
  const _import = require('@/api/_import_' + process.env.NODE_ENV)
  let loadingInstance

  export default {
    created() {
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    props: {
      isApproveShow: { // 是否显示审批tab
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        attachTargetURL: AttachmentURL,
        attachJsonStr: '',
        taskActivityData: [], // 流程历史
        visible: false,
        targetURL: '',
        jsonStr: {},
        formClass: '',
        rules: {
          content: [{required: true, message: '请输入审批意见', trigger: 'blur'}]
        },
        bizData: {}, // 流程业务的动态返回配置信息
        bizForm: {}, // 流程数据信息
        title: '',
        /* activeNames: ['bizDataTab', 'approveTab', 'historyTab', 'attachmentTab'], */
        activeNames: ['bizDataTab', 'attachmentTab'],
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
      KalixDateColumn: DateColumn
    },
    watch: {
      visible(newValue) {    // 根据dialog的状态重置表单
        if (!newValue) {
          Object.assign(this.formModel, JSON.parse(this.tempFormModel))
          if (this.isApproveShow) {
            this.$refs.dialogForm.resetFields()
          }
        } else {
          // this.activeNames = ['bizDataTab', 'approveTab', 'historyTab', 'attachmentTab']
          this.activeNames = ['bizDataTab', 'approveTab']
        }
      }
    },
    methods: {
      onTabClick(tab, event) {
//        this.
      },
      setFileSize(size) {
        return prettyBytes(size)
      },
      open(row) {
        loadingInstance = Loading.service(
          {
            target: this.$refs.kalixTaskDialog.$el.querySelector('.el-dialog')
          })
        this.visible = true
        if (this.isApproveShow) {
          this.title = '流程审批-' + row.name
        } else {
          this.title = '流程历史-' + row.name
        }
        this.targetURL = TaskActivitiesURL + row.processInstanceId
        this.attachJsonStr = `{mainId:${row.entityId}}`
        console.log('targetUrl is ', this.targetURL, 'this.attachJsonStr', this.attachJsonStr)
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
                comment: this.formModel.content,
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
      onSubmit() { // 修改业务数据
        // console.log('this.whichBizForm', this.whichBizForm)
        // console.log('this.$refs.bizDataForm', this.$refs.bizDataForm)
        this.$refs.bizDataForm.validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            Vue.axios.request({
              method: 'PUT',
              url: this.$refs.bizData.targetURL + '/' + this.$refs.bizData.formModel.id,
              data: this.$refs.bizData.formModel
            }).then(response => {
              if (response.data.success) {
                Message.success(response.data.msg)
              } else {
                Message.error(response.data.msg)
              }
              EventBus.$emit(ON_REFRESH_DATA)
            })
          } else {
            Message.error('请检查输入项！')
            return false
          }
        })
      },
      onAgree() {
        this.completeTask('同意')
      },
      onDisagree() {
        this.completeTask('不同意')
      },
      onReApply() {
        this.completeTask('')
      },
      onClose() {
        this.visible = false
        this.$refs.kalixCollapseWrapper.scrollTop = 0
        console.log('close event')
      },
      getBizData(row) {
        this.taskId = row.id
        let historyUrl = 'camel/rest/workflow/bizDataForm?processDefinitionId=' + row.processDefinitionId
        console.log('history Url is ', historyUrl)
        this.axios.request({
          method: 'GET',
          url: this.isApproveShow ? TaskFormURL + row.id : historyUrl,  // 流程业务的动态返回配置信息,流程历史和审批请求的地址不同
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
          loadingInstance.close()
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
