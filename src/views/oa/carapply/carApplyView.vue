<!--
描述：办公自动化-用车申请-查看组件
开发人：hqj
开发日期：2017年10月19日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="carapply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    kalix-car-apply-view-form(v-bind:formModel="formModel" slot="dialogFormSlot")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import CarApplyViewForm from './CarApplyViewForm.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixCarApplyViewForm: CarApplyViewForm
    }
  }
</script>
