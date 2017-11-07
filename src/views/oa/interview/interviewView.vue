<!--
描述：办公自动化-面试管理-查看组件
开发人：hqj
开发日期：2017年11月2日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="interview" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      kalix-interview-view-form(v-bind:formModel="formModel")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import InterviewViewForm from './InterviewViewForm.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixInterviewViewForm: InterviewViewForm
    }
  }
</script>
