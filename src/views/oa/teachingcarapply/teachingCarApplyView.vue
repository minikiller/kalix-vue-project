<!--
描述：办公自动化-教学用车申请-查看组件
开发人：hqj
开发日期：2018年03月23日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="teachingCarapply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    kalix-teaching-car-apply-view-form(v-bind:formModel="formModel" slot="dialogFormSlot")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import TeachingCarApplyViewForm from './TeachingCarApplyViewForm.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixTeachingCarApplyViewForm: TeachingCarApplyViewForm
    }
  }
</script>
