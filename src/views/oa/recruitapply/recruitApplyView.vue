<!--
描述：办公自动化-用人申请-查看组件
开发人：hqj
开发日期：2017年10月23日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="recruitApply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      kalix-recruit-apply-view-form(v-bind:formModel="formModel")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import RecruitApplyViewForm from './RecruitApplyViewForm.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixRecruitApplyViewForm: RecruitApplyViewForm
    }
  }
</script>
