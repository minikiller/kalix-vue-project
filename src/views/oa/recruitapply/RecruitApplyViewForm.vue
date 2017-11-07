<!--
描述：办公自动化-用人申请-查看组件
开发人：hqj
开发日期：2017年10月23日
-->

<template lang="pug">
  div.el-form.kalix-form-table(slot="dialogFormSlot")
    div.table-title 吉林动画学院用人申请表
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="名称" v-bind:label-width="labelWidth" prop="title")
        el-input(v-model="formModel.title" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label=" 创建时间" prop="creationDate" v-bind:label-width="labelWidth")
        kalix-date-time-picker(v-model="formModel.creationDate" style="width:100%" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请部门" prop="orgName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.orgName" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="申请事由" prop="reason" v-bind:label-width="labelWidth")
        el-input(v-bind:value="formModel.reason|getDictName('OA','招聘需求原因')" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="职位名称" prop="positionName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.positionName" readonly)
    div.s-flex
      el-form-item.kalix-form-table-td(label="拟聘人数" prop="recruitCount" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.recruitCount" readonly)
      el-form-item.kalix-form-table-td(label="定编人数" prop="allocationCount" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.allocationCount" readonly)
      el-form-item.kalix-form-table-td(label="现有人数" prop="existCount" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.existCount" readonly)
    el-form-item(label="核心职责" prop="coreRecruit" v-bind:label-width="labelWidth")
      el-input(type="textarea" v-model="formModel.coreRecruit" readonly)
    el-form-item(label="常规职责" prop="commonRecruit" v-bind:label-width="labelWidth")
      el-input(type="textarea" v-model="formModel.commonRecruit" readonly)
    el-form-item(label="任职基本条件" prop="baseCondition" v-bind:label-width="labelWidth")
      el-input(type="textarea" v-model="formModel.baseCondition" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="待遇标准" prop="treatmentLevel" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.treatmentLevel" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="建议招聘方式" prop="recruitType" v-bind:label-width="labelWidth")
        el-input(v-bind:value="formModel.recruitType|getDictName('OA','招聘方式')" readonly)
    div.s-flex
      el-form-item.s-flex_item.kalix-form-table-td(label="申请人" prop="createBy" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.createBy" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="部门负责人" prop="depUser" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.depUser" readonly)
      el-form-item.s-flex_item.kalix-form-table-td(label="人力资源处长" prop="manpower" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.manpower" readonly)
</template>

<script type="text/ecmascript-6">
  import DateTimePicker from '@/components/biz/date/datetimepicker.vue'

  export default {
    props: ['formModel'],
    data() {
      return {
        labelWidth: '110px'
      }
    },
    components: {
      KalixDateTimePicker: DateTimePicker
    }
  }
</script>
