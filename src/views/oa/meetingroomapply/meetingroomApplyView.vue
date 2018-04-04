<!--
描述：人员管理-会议室申请-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="tempApply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    kalix-temp-apply-view-form(v-bind:form-model="formModel" slot="dialogFormSlot")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import TempApplyViewForm from './MeetingroomApplyViewForm'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel)
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog,
      KalixTempApplyViewForm: TempApplyViewForm
    },
    methods: {
      init(dialogOption, row) {
        let meetingDate = row.meetingDateStr
        this.formModel.beginTime = new Date(meetingDate + ' ' + row.beginTimeStr)
        this.formModel.endTime = new Date(meetingDate + ' ' + row.endTimeStr)
      }
    }
  }
</script>
