<!--
描述：办公自动化-系统管理-文号管理-发文组件
开发人：hqj
开发日期：2018年01月17日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="document" ref="kalixBizDialog" v-bind:form-model.sync="formModel"
  v-bind:targetURL="targetURL" v-bind:submitCustom="submitCustom")
    template(slot="dialogFormSlot")
      div.el-form.kalix-form-table
        div.table-title 文号信息
        div
          el-form-item.kalix-form-table-td(label="文号" prop="businessNo" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.businessNo" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="文号类型" prop="docType" v-bind:label-width="labelWidth")
            kalix-dict-select(v-model="formModel.docType" appName="oa" dictType="文号类型" disabled)
          el-form-item.s-flex_item.kalix-form-table-td(label="年份" prop="year" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.year" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="文号状态" prop="status" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.status" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="编号" prop="number" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.number" readonly)
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="创建时间" prop="creationDate" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.creationDate" readonly)
          el-form-item.s-flex_item.kalix-form-table-td(label="更新时间" prop="updateDate" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.updateDate" readonly)
      div.el-form.kalix-form-table
        div.table-title 文件信息
      kalix-redhead-apply-view-form(v-bind:formModel.sync="redheadapplyFormModel" v-bind:isRequest="true" v-bind:bizId="formModel.redheadId")
      div.el-form.kalix-form-table
        div.table-title 发文信息
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="发文部门" prop="docDeptId" v-bind:rules="rules.docDeptId" v-bind:label-width="labelWidth")
            kalix-org-select(v-model="formModel.docDeptId" v-on:selectChange="onOrgIdChange")
          el-form-item.s-flex_item.kalix-form-table-td(label="发文日期" prop="docDate" v-bind:rules="rules.docDate" v-bind:label-width="labelWidth")
            kalix-date-picker(v-model="formModel.docDate")
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="打印人" prop="printer" v-bind:rules="rules.printer" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.printer")
          el-form-item.s-flex_item.kalix-form-table-td(label="校对人" prop="checker" v-bind:rules="rules.checker" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.checker")
        div.s-flex
          el-form-item.s-flex_item.kalix-form-table-td(label="页数" prop="page" v-bind:label-width="labelWidth")
            el-input-number(v-model="formModel.page" v-bind:min="1" style="width:100%")
          el-form-item.s-flex_item.kalix-form-table-td(label="份数" prop="copy" v-bind:label-width="labelWidth")
            el-input-number(v-model="formModel.copy" v-bind:min="1" style="width:100%")
        div(v-if="false")
          el-form-item.kalix-form-table-td(label="抄送" prop="other" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.other")
</template>

<script>
  import FormModel from './model'
  import {DocumentPublishURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import UserOrgSelect from '@/components/biz/select/UserOrgSelect'
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import redheadapplyFormModel from '../redheadapply/model'
  import RedheadApplyViewForm from '../redheadapply/RedheadApplyViewForm.vue'
  import Message from 'common/message'
  import {ON_REFRESH_DATA} from '@/components/custom/event.toml'
  import EventBus from 'common/eventbus'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          docDeptId: [{type: 'number', required: true, message: '请选择发文部门', trigger: 'change'}],
          docDate: [{required: true, message: '请选择发文日期', trigger: 'change'}],
          printer: [{required: true, message: '请输入打印人', trigger: 'blur'}],
          checker: [{required: true, message: '请输入校对人', trigger: 'blur'}]
        },
        targetURL: DocumentPublishURL,
        redheadapplyFormModel: Object.assign({}, redheadapplyFormModel),
        labelWidth: '140px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixOrgSelect: UserOrgSelect,
      KalixDatePicker: DatePicker,
      KalixRedheadApplyViewForm: RedheadApplyViewForm
    },
    methods: {
      submitCustom (dialog) {
        dialog.$refs.dialogForm.validate((valid) => {
          if (valid) {
            if (this.formModel.id) {
              this.axios.request({
                method: 'POST',
                url: this.targetURL + this.formModel.id,
                data: this.formModel,
                params: {}
              }).then((res) => {
                Message.processResult(res)
                dialog.$refs.dialogForm.resetFields()
                // 刷新列表
                EventBus.$emit(ON_REFRESH_DATA)
                dialog._afterDialogClose()
              })
            }
          } else {
            Message.error('请检查输入项！')
            return false
          }
        })
      },
      onOrgIdChange(item) {
        this.formModel.docDept = item.name
      }
    }
  }
</script>
