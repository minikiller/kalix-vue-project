<!--
描述：办公自动化-入职申请-查看组件
开发人：hqj
开发日期：2017年11月3日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="employapply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      kalix-employ-apply-view-form(v-bind:formModel="formModel")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import EmployApplyViewForm from './EmployApplyViewForm.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixEmployApplyViewForm: EmployApplyViewForm
    }
  }
</script>
