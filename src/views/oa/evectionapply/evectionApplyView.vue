<!--
描述：办公自动化-出差申请-查看组件
开发人：fj
开发日期：2017年11月03日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="evectionapply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      kalix-evection-apply-view-form(v-bind:formModel="formModel")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import EvectionApplyViewForm from './EvectionApplyViewForm.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixEvectionApplyViewForm: EvectionApplyViewForm
    }
  }
</script>
