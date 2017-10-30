<!--
描述：办公自动化-报销申请-查看组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="reimbursementApply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      kalix-reimbursement-apply-view-form(v-bind:formModel="formModel")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import ReimbursementApplyViewForm from './ReimbursementApplyViewForm.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixReimbursementApplyViewForm: ReimbursementApplyViewForm
    }
  }
</script>
