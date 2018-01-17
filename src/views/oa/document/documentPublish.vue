<!--
描述：办公自动化-系统管理-文号管理-发文组件
开发人：hqj
开发日期：2018年01月17日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="document" ref="kalixBizDialog" v-bind:form-model.sync="formModel"
  v-bind:targetURL="targetURL" v-bind:submitCustom="submitCustom")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="打印人" prop="printer" v-bind:rules="rules.printer" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.printer")
        el-form-item.s-flex_item.kalix-form-table-td(label="校对" prop="checker" v-bind:rules="rules.checker" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.checker")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="页数" prop="page" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.page")
        el-form-item.s-flex_item.kalix-form-table-td(label="份数" prop="copy" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.copy")
      div
        el-form-item.kalix-form-table-td(label="抄送" prop="other" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.other")
</template>

<script>
  import FormModel from './model'
  import {DocumentPublishURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import Message from 'common/message'
  import {ON_REFRESH_DATA} from '@/components/custom/event.toml'
  import EventBus from 'common/eventbus'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          printer: [{required: true, message: '请输入打印人', trigger: 'blur'}],
          checker: [{required: true, message: '请输入校对', trigger: 'blur'}]
        },
        targetURL: DocumentPublishURL,
        labelWidth: '140px'
      }
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      submitCustom (dialog) {
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
      }
    }
  }
</script>
