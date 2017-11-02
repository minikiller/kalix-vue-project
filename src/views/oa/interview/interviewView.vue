<!--
描述：办公自动化-面试管理-查看组件
开发人：hqj
开发日期：2017年11月2日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="interview" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item.s-flex_item(label="应聘者姓名" prop="xm" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.xm" readonly)
      el-form-item.s-flex_item(label="初试时间" prop="dateFirst" v-bind:label-width="labelWidth")
        kalix-date-picker(v-model="formModel.dateFirst" style="width:100%" readonly)
      el-form-item.s-flex_item(label="初试面试官" prop="interviewerFirst" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.interviewerFirst" readonly)
      el-form-item.s-flex_item(label="初试面试内容" prop="interviewContentFirst" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.interviewContentFirst" readonly)
      el-form-item.s-flex_item(label="初试面试结果" prop="passFirst" v-bind:label-width="labelWidth")
        el-checkbox(v-model="formModel.passFirst" disabled) 初试是否通过
      el-form-item.s-flex_item(label="复试时间" prop="dateSecond" v-bind:label-width="labelWidth")
        kalix-date-picker(v-model="formModel.dateSecond" style="width:100%" readonly)
      el-form-item.s-flex_item(label="复试面试官" prop="interviewerSecond" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.interviewerSecond" readonly)
      el-form-item.s-flex_item(label="复试面试内容" prop="interviewContentSecond" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.interviewContentSecond" readonly)
      el-form-item.s-flex_item(label="复试面试结果" prop="passSecond" v-bind:label-width="labelWidth")
        el-checkbox(v-model="formModel.passSecond" disabled) 复试是否通过
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'
  import DatePicker from '@/components/biz/date/datepicker.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '110px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDatePicker: DatePicker
    }
  }
</script>
