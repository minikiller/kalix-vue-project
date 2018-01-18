<!--
描述：办公自动化-红头文件申请-查看组件
开发人：sunlf
开发日期：2017年12月20日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="sealApply" v-bind:formModel.sync="formModel" ref="kalixBizDialog" isView)
    kalix-redhead-apply-view-form(v-bind:form-model="formModel" slot="dialogFormSlot")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import RedheadApplyViewForm from './RedheadApplyViewForm'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '110px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixRedheadApplyViewForm: RedheadApplyViewForm
    },
    methods: {
    }
  }
</script>
