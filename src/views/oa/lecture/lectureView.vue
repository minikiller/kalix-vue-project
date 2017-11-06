<!--
描述：办公自动化-试讲管理-查看组件
开发人：hqj
开发日期：2017年11月2日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="lecture" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      kalix-lecture-view-form(v-bind:formModel="formModel")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import LectureViewForm from './LectureViewForm.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixLectureViewForm: LectureViewForm
    }
  }
</script>
