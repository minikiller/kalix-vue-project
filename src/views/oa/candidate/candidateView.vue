<!--
描述：办公自动化-用车申请-查看组件
开发人：hqj
开发日期：2017年10月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="candidate" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      kalix-candidate-view-form(v-bind:formModel="formModel")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import CandidateViewForm from './CandidateViewForm.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '110px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixCandidateViewForm: CandidateViewForm
    }
  }
</script>
