<!--
描述：人员管理-会议申请-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="meetapply" ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      div.table-title 吉林动画学院会议申请表
      el-form-item(label="名称" label-width="100px")
        el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" label-width="100px")
          el-input(v-model="formModel.title")
        el-form-item.s-flex_item.kalix-form-table-td(label="会议地点" label-width="100px")
          el-input(v-model="formModel.title")
      el-form-item(label="会议议题" label-width="100px")
        el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="开始时间" label-width="100px")
          el-input(v-model="formModel.title")
        el-form-item.s-flex_item.kalix-form-table-td(label="结束时间" label-width="100px")
          el-input(v-model="formModel.title")
      div.s-flex
        el-form-item.s-flex_item.kalix-form-table-td(label="会议类型" label-width="100px")
          el-input(v-model="formModel.title")
        el-form-item.s-flex_item.kalix-form-table-td(label="会议纪要人员" label-width="100px")
          el-input(v-model="formModel.title")
      el-form-item(label="重要出席人" label-width="100px")
        el-input(v-model="formModel.title")
      el-form-item(label="其他出席人" label-width="100px")
        el-input(v-model="formModel.title")


</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import UserSelect from '@/components/biz/userselect/userselect'
  import {TeacherURL} from '../config.toml'

  export default {
    props: {
      formModel: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        params: {userType: 1},
        rules: {},
        targetURL: TeacherURL
      }
    },
    created() {
      console.log('[teacherAdd.vue created] this.formModel:', this.formModel)
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixUserSelect: UserSelect
    },
    methods: {}
  }
</script>

<style lang="stylus">

  borderStyle = 1px solid #000000

  .kalix-form-table
    border 1px solid #000000
    & > div
      border-bottom borderStyle
      &:last-child
        border-bottom 0
    .table-title
      text-align center
      font-size 18px
      font-weight bold
      padding 10px 0px
    .el-form-item
      margin-bottom 0
      .el-form-item__label
        border-right borderStyle
      .el-input__inner
        border 0
    .kalix-form-table-td
      border-left borderStyle
      &:first-child
        border-left none
</style>
